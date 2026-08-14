import os
import json
import hashlib

from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from dotenv import load_dotenv
import google.generativeai as genai

from app.database import Base, engine, SessionLocal
from app.models.source import Source
from app.models.threat import Threat


# ============================================================
# ENVIRONMENT
# ============================================================

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-flash-latest")


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="Janadel AI Backend",
    description="AI-powered Cybersecurity Platform API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE DEPENDENCY
# ============================================================

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


# ============================================================
# BASIC APIs
# ============================================================

@app.get("/")
def root():
    return {
        "message": "Janadel AI Backend is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Janadel AI Backend"
    }


# ============================================================
# SOURCE APIs
# ============================================================

@app.get("/sources")
def get_sources(db: Session = Depends(get_db)):
    return db.query(Source).all()


class SourceCreate(BaseModel):
    name: str
    source_type: str
    status: str = "active"


@app.post("/sources")
def create_source(
    source: SourceCreate,
    db: Session = Depends(get_db)
):
    new_source = Source(
        name=source.name,
        source_type=source.source_type,
        status=source.status,
    )

    db.add(new_source)
    db.commit()
    db.refresh(new_source)

    return new_source


class SourceUpdate(BaseModel):
    name: str
    source_type: str
    status: str


@app.put("/sources/{source_id}")
def update_source(
    source_id: int,
    source: SourceUpdate,
    db: Session = Depends(get_db),
):
    db_source = (
        db.query(Source)
        .filter(Source.id == source_id)
        .first()
    )

    if not db_source:
        return {
            "error": "Source not found"
        }

    db_source.name = source.name
    db_source.source_type = source.source_type
    db_source.status = source.status

    db.commit()
    db.refresh(db_source)

    return db_source


@app.delete("/sources/{source_id}")
def delete_source(
    source_id: int,
    db: Session = Depends(get_db),
):
    db_source = (
        db.query(Source)
        .filter(Source.id == source_id)
        .first()
    )

    if not db_source:
        return {
            "error": "Source not found"
        }

    db.delete(db_source)
    db.commit()

    return {
        "message": "Source deleted successfully"
    }


# ============================================================
# COPILOT API
# ============================================================

class ChatMessage(BaseModel):
    message: str


@app.post("/copilot/chat")
def copilot_chat(chat: ChatMessage):
    try:
        prompt = f"""
You are Janadel AI Copilot, a cybersecurity assistant.

Help the user with:
- Security-related questions
- Threat analysis
- Cybersecurity best practices

Be concise and professional.

User:
{chat.message}
"""

        response = model.generate_content(prompt)

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "error": str(e)
        }


# ============================================================
# THREAT ANALYSIS
# ============================================================

class ThreatAnalyzeRequest(BaseModel):
    input_data: str


def parse_ai_response(text: str):
    text = text.strip()

    if text.startswith("```"):
        text = text.split("```")[1]

        if text.startswith("json"):
            text = text[4:]

    return json.loads(text.strip())


@app.post("/threats/analyze")
def analyze_threat(
    req: ThreatAnalyzeRequest,
    db: Session = Depends(get_db),
):
    try:
        prompt = f"""
You are a cybersecurity threat analysis engine.

Analyze the following input. It could be:
- A URL
- A file name
- Email content
- Text

Determine its risk level.

Input:
{req.input_data}

Respond ONLY in this exact JSON format:

{{
    "risk_level": "Safe" or "Suspicious" or "Dangerous",
    "reason": "brief explanation in 1-2 sentences"
}}
"""

        response = model.generate_content(prompt)

        result = parse_ai_response(response.text)

        new_threat = Threat(
            input_data=req.input_data,
            risk_level=result.get(
                "risk_level",
                "Unknown"
            ),
            reason=result.get(
                "reason",
                "No reason provided"
            ),
        )

        db.add(new_threat)
        db.commit()
        db.refresh(new_threat)

        return new_threat

    except Exception as e:
        return {
            "error": str(e)
        }


# ============================================================
# GET ALL THREATS
# ============================================================

@app.get("/threats")
def get_threats(
    db: Session = Depends(get_db),
):
    return (
        db.query(Threat)
        .order_by(Threat.id.desc())
        .all()
    )


# ============================================================
# FILE SCAN API
# ============================================================

@app.post("/threats/scan-file")
async def scan_file(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    try:
        contents = await file.read()

        file_size = len(contents)

        file_hash = hashlib.sha256(
            contents
        ).hexdigest()

        file_ext = os.path.splitext(
            file.filename
        )[1]

        prompt = f"""
You are a cybersecurity malware analysis engine.

Analyze this file's metadata and assess its risk level based on common malware patterns.

Consider:
- Suspicious extensions
- Double extensions
- Executable disguised as a document
- Unusually small or large file size
- Other suspicious filename patterns

Filename:
{file.filename}

Extension:
{file_ext}

Size:
{file_size} bytes

SHA256:
{file_hash}

Respond ONLY in this exact JSON format:

{{
    "risk_level": "Safe" or "Suspicious" or "Dangerous",
    "reason": "brief explanation in 1-2 sentences"
}}
"""

        response = model.generate_content(prompt)

        result = parse_ai_response(response.text)

        new_threat = Threat(
            input_data=(
                f"File: {file.filename} "
                f"({file_size} bytes)"
            ),
            risk_level=result.get(
                "risk_level",
                "Unknown"
            ),
            reason=result.get(
                "reason",
                "No reason provided"
            ),
        )

        db.add(new_threat)
        db.commit()
        db.refresh(new_threat)

        return new_threat

    except Exception as e:
        return {
            "error": str(e)
        }


# ============================================================
# DASHBOARD STATS API
# ============================================================

@app.get("/dashboard/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db),
):
    total_threats = (
        db.query(Threat)
        .count()
    )

    dangerous_threats = (
        db.query(Threat)
        .filter(
            func.lower(Threat.risk_level)
            == "dangerous"
        )
        .count()
    )

    suspicious_threats = (
        db.query(Threat)
        .filter(
            func.lower(Threat.risk_level)
            == "suspicious"
        )
        .count()
    )

    safe_threats = (
        db.query(Threat)
        .filter(
            func.lower(Threat.risk_level)
            == "safe"
        )
        .count()
    )

    total_sources = (
        db.query(Source)
        .count()
    )

    active_sources = (
        db.query(Source)
        .filter(
            func.lower(Source.status)
            == "active"
        )
        .count()
    )

    return {
        "total_threats": total_threats,
        "dangerous": dangerous_threats,
        "suspicious": suspicious_threats,
        "safe": safe_threats,
        "total_sources": total_sources,
        "active_sources": active_sources,
    }