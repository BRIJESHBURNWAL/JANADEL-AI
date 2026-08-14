import { useEffect, useState } from "react";
import axios from "axios";

interface Threat {
  id: number;
  input_data: string;
  risk_level: string;
  reason: string;
  created_at: string;
}

export default function Alerts() {
  const [alerts, setAlerts] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/threats")
      .then((res) => {
        const risky = res.data.filter(
          (t: Threat) => t.risk_level === "Dangerous" || t.risk_level === "Suspicious"
        );
        setAlerts(risky);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading alerts...</p>;

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Alerts</h1>

      {alerts.length === 0 ? (
        <p style={{ color: "#666" }}>No active alerts. All scans are clean.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                display: "flex",
                gap: "15px",
                padding: "16px 20px",
                background: "white",
                borderLeft: `5px solid ${
                  alert.risk_level === "Dangerous" ? "#dc2626" : "#f59e0b"
                }`,
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  minWidth: "100px",
                  height: "fit-content",
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "13px",
                  textAlign: "center",
                  color: "white",
                  background: alert.risk_level === "Dangerous" ? "#dc2626" : "#f59e0b",
                }}
              >
                {alert.risk_level}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: "bold", marginBottom: "4px", wordBreak: "break-word" }}>
                  {alert.input_data}
                </p>
                <p style={{ color: "#555", fontSize: "14px", marginBottom: "4px" }}>
                  {alert.reason}
                </p>
                <p style={{ color: "#999", fontSize: "12px" }}>
                  {new Date(alert.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}