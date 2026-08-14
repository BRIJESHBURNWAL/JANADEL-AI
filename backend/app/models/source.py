from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base


class Source(Base):
    __tablename__ = "sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    source_type = Column(String(50), nullable=False)
    status = Column(String(30), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)