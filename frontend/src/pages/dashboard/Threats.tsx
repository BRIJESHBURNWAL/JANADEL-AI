import { useEffect, useState } from "react";
import axios from "axios";

interface ThreatResult {
  id: number;
  input_data: string;
  risk_level: string;
  reason: string;
  created_at: string;
}

export default function Threats() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [history, setHistory] = useState<ThreatResult[]>([]);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchHistory = () => {
    axios
      .get("http://127.0.0.1:8000/threats")
      .then((res) => setHistory(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleAnalyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");

    axios
      .post("http://127.0.0.1:8000/threats/analyze", { input_data: input })
      .then(() => {
        setInput("");
        fetchHistory();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to analyze");
      })
      .finally(() => setLoading(false));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileScan = () => {
    if (!selectedFile) return;
    setFileLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    axios
      .post("http://127.0.0.1:8000/threats/scan-file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setSelectedFile(null);
        fetchHistory();
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to scan file");
      })
      .finally(() => setFileLoading(false));
  };

  const getRiskColor = (risk: string) => {
    if (risk === "Dangerous") return "#dc2626";
    if (risk === "Suspicious") return "#f59e0b";
    return "#16a34a";
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Threat Detection</h1>

      {/* Text/URL Analyze */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Paste a URL, filename, or suspicious text..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading}
          style={{
            padding: "12px 24px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {/* File Upload */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          alignItems: "center",
          marginBottom: "30px",
          padding: "15px",
          background: "#fff",
          border: "1px dashed #ccc",
          borderRadius: "8px",
        }}
      >
        <input type="file" onChange={handleFileChange} />
        <button
          onClick={handleFileScan}
          disabled={fileLoading || !selectedFile}
          style={{
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {fileLoading ? "Scanning..." : "Scan File"}
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2 style={{ marginBottom: "10px" }}>History</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: "10px" }}>Input</th>
            <th style={{ padding: "10px" }}>Risk Level</th>
            <th style={{ padding: "10px" }}>Reason</th>
            <th style={{ padding: "10px" }}>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item) => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px", maxWidth: "200px", wordBreak: "break-word" }}>
                {item.input_data}
              </td>
              <td style={{ padding: "10px" }}>
                <span
                  style={{
                    color: "white",
                    background: getRiskColor(item.risk_level),
                    padding: "4px 10px",
                    borderRadius: "12px",
                    fontSize: "13px",
                  }}
                >
                  {item.risk_level}
                </span>
              </td>
              <td style={{ padding: "10px", maxWidth: "300px" }}>{item.reason}</td>
              <td style={{ padding: "10px" }}>
                {new Date(item.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}