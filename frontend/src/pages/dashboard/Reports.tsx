import { useEffect, useState } from "react";
import axios from "axios";

interface Source {
  id: number;
  name: string;
  source_type: string;
  status: string;
}

interface Threat {
  id: number;
  input_data: string;
  risk_level: string;
  created_at: string;
}

export default function Reports() {
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

  if (loading) return <p>Loading report...</p>;

  const totalSources = sources.length;
  const activeSources = sources.filter((s) => s.status === "active").length;
  const inactiveSources = sources.filter((s) => s.status === "inactive").length;

  const totalScans = threats.length;
  const dangerous = threats.filter((t) => t.risk_level === "Dangerous").length;
  const suspicious = threats.filter((t) => t.risk_level === "Suspicious").length;
  const safe = threats.filter((t) => t.risk_level === "Safe").length;

  const sourceTypeCounts: Record<string, number> = {};
  sources.forEach((s) => {
    sourceTypeCounts[s.source_type] = (sourceTypeCounts[s.source_type] || 0) + 1;
  });

  const recentThreats = [...threats]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div>
      <h1 style={{ marginBottom: "25px" }}>Security Report</h1>

      {/* Summary Section */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>Overview</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "15px" }}>
          <div>
            <p style={{ color: "#666", fontSize: "13px" }}>Total Sources</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalSources}</p>
          </div>
          <div>
            <p style={{ color: "#666", fontSize: "13px" }}>Active / Inactive</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              {activeSources} / {inactiveSources}
            </p>
          </div>
          <div>
            <p style={{ color: "#666", fontSize: "13px" }}>Total Scans</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalScans}</p>
          </div>
          <div>
            <p style={{ color: "#666", fontSize: "13px" }}>Dangerous Findings</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#dc2626" }}>{dangerous}</p>
          </div>
        </div>
      </div>

      {/* Risk Breakdown */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>Risk Breakdown</h2>
        <div style={{ display: "flex", gap: "10px", height: "24px", borderRadius: "6px", overflow: "hidden" }}>
          {totalScans === 0 ? (
            <div style={{ flex: 1, background: "#eee" }} />
          ) : (
            <>
              {dangerous > 0 && (
                <div style={{ flex: dangerous, background: "#dc2626" }} title={`Dangerous: ${dangerous}`} />
              )}
              {suspicious > 0 && (
                <div style={{ flex: suspicious, background: "#f59e0b" }} title={`Suspicious: ${suspicious}`} />
              )}
              {safe > 0 && (
                <div style={{ flex: safe, background: "#16a34a" }} title={`Safe: ${safe}`} />
              )}
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: "20px", marginTop: "12px", fontSize: "13px" }}>
          <span><span style={{ color: "#dc2626" }}>●</span> Dangerous: {dangerous}</span>
          <span><span style={{ color: "#f59e0b" }}>●</span> Suspicious: {suspicious}</span>
          <span><span style={{ color: "#16a34a" }}>●</span> Safe: {safe}</span>
        </div>
      </div>

      {/* Source Types */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "25px",
          marginBottom: "25px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>Sources by Type</h2>
        {Object.keys(sourceTypeCounts).length === 0 ? (
          <p style={{ color: "#666" }}>No sources added yet.</p>
        ) : (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {Object.entries(sourceTypeCounts).map(([type, count]) => (
              <div
                key={type}
                style={{
                  padding: "8px 16px",
                  background: "#f3f4f6",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {type}: <strong>{count}</strong>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "25px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <h2 style={{ marginBottom: "15px", fontSize: "18px" }}>Recent Scans</h2>
        {recentThreats.length === 0 ? (
          <p style={{ color: "#666" }}>No scans performed yet.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
                <th style={{ padding: "8px" }}>Input</th>
                <th style={{ padding: "8px" }}>Risk</th>
                <th style={{ padding: "8px" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentThreats.map((t) => (
                <tr key={t.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px", maxWidth: "300px", wordBreak: "break-word" }}>
                    {t.input_data}
                  </td>
                  <td style={{ padding: "8px" }}>{t.risk_level}</td>
                  <td style={{ padding: "8px" }}>
                    {new Date(t.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}