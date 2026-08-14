import { useEffect, useState } from "react";
import axios from "axios";

interface DashboardStats {
  total_threats: number;
  dangerous: number;
  suspicious: number;
  safe: number;
  total_sources: number;
  active_sources: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<DashboardStats>("http://127.0.0.1:8000/dashboard/stats")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard stats error:", err);
        setError("Unable to load dashboard data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error || !stats) {
    return <p>{error || "No dashboard data available."}</p>;
  }

  const cards = [
    {
      label: "Total Sources",
      value: stats.total_sources,
      color: "#2563eb",
    },
    {
      label: "Active Sources",
      value: stats.active_sources,
      color: "#16a34a",
    },
    {
      label: "Total Scans",
      value: stats.total_threats,
      color: "#7c3aed",
    },
    {
      label: "Dangerous",
      value: stats.dangerous,
      color: "#dc2626",
    },
    {
      label: "Suspicious",
      value: stats.suspicious,
      color: "#f59e0b",
    },
    {
      label: "Safe",
      value: stats.safe,
      color: "#16a34a",
    },
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>
        Dashboard Overview
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
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
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                color: "#666",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              {card.label}
            </p>

            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                color: card.color,
              }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}