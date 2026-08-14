from app.database import SessionLocal
from app.models.source import Source

db = SessionLocal()

sample_sources = [
    Source(name="Main Firewall", source_type="Firewall", status="active"),
    Source(name="Office Endpoint 01", source_type="Endpoint", status="active"),
    Source(name="Web Server", source_type="Server", status="active"),
    Source(name="Backup Server", source_type="Server", status="inactive"),
]

db.add_all(sample_sources)
db.commit()

print("✅ Sample data inserted successfully!")

db.close()