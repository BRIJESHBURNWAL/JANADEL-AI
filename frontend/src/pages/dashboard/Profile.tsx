import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [totalScans, setTotalScans] = useState(0);
  const [totalSources, setTotalSources] = useState(0);

  useEffect(() => {
    Promise.all([
      axios.get("http://127.0.0.1:8000/sources"),
      axios.get("http://127.0.0.1:8000/threats"),
    ])
      .then(([sourcesRes, threatsRes]) => {
        setTotalSources(sourcesRes.data.length);
        setTotalScans(threatsRes.data.length);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Profile</h1>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "25px",
          maxWidth: "500px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "25px" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "#111827",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            B
          </div>
          <div>
            <p style={{ fontWeight: "bold", fontSize: "18px" }}>Brijesh</p>
            <p style={{ color: "#888", fontSize: "14px" }}>Administrator</p>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <p style={{ fontSize: "13px", color: "#888" }}>Role</p>
          <p style={{ fontSize: "15px" }}>Founder & Developer, Janadel AI</p>
        </div>

        <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
          <div>
            <p style={{ fontSize: "13px", color: "#888" }}>Total Sources</p>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>{totalSources}</p>
          </div>
          <div>
            <p style={{ fontSize: "13px", color: "#888" }}>Total Scans</p>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>{totalScans}</p>
          </div>
        </div>
      </div>
    </div>
  );
}