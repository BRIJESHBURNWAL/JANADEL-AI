import { useEffect, useState } from "react";
import axios from "axios";

interface Source {
  id: number;
  status: string;
}

interface Threat {
  id: number;
  risk_level: string;
}

export default function Dashboard() {
  const [sources, setSources] = useState<Source[]>([]);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get("http://127.0.0.1:8000/sources"),
      axios.get("http://127.0.0.1:8000/threats"),
    ])
      .then(([sourcesRes, threatsRes]) => {
        setSources(sourcesRes.data);
        setThreats(threatsRes.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const totalSources = sources.length;
  const activeSources = sources.filter((s) => s.status === "active").length;
  const totalThreats = threats.length;
  const dangerousThreats = threats.filter((t) => t.risk_level === "Dangerous").length;
  const suspiciousThreats = threats.filter((t) => t.risk_level === "Suspicious").length;
  const safeThreats = threats.filter((t) => t.risk_level === "Safe").length;

  const cards = [
    { label: "Total Sources", value: totalSources, color: "#2563eb" },
    { label: "Active Sources", value: activeSources, color: "#16a34a" },
    { label: "Total Scans", value: totalThreats, color: "#7c3aed" },
    { label: "Dangerous", value: dangerousThreats, color: "#dc2626" },
    { label: "Suspicious", value: suspiciousThreats, color: "#f59e0b" },
    { label: "Safe", value: safeThreats, color: "#16a34a" },
  ];

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>Dashboard Overview</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: "white",
              border: "1px solid #eee",
              borderRadius: "10px",
              padding: "20px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "8px" }}>
              {card.label}
            </p>
            <p style={{ fontSize: "32px", fontWeight: "bold", color: card.color }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}