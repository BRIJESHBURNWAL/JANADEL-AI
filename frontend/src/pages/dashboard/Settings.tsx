import { useState } from "react";

export default function Settings() {
  const [orgName, setOrgName] = useState("Janadel AI");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [autoScan, setAutoScan] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Settings</h1>

      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "25px",
          maxWidth: "500px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "6px", fontSize: "14px", color: "#555" }}>
            Organization Name
          </label>
          <input
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>Email Alerts</p>
            <p style={{ fontSize: "13px", color: "#888" }}>
              Get notified when a dangerous threat is found
            </p>
          </div>
          <input
            type="checkbox"
            checked={emailAlerts}
            onChange={(e) => setEmailAlerts(e.target.checked)}
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >
          <div>
            <p style={{ fontWeight: "bold", fontSize: "14px" }}>Auto Scan New Sources</p>
            <p style={{ fontSize: "13px", color: "#888" }}>
              Automatically scan sources when added
            </p>
          </div>
          <input
            type="checkbox"
            checked={autoScan}
            onChange={(e) => setAutoScan(e.target.checked)}
            style={{ width: "20px", height: "20px" }}
          />
        </div>

        <button
          onClick={handleSave}
          style={{
            padding: "10px 24px",
            background: "#111827",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Save Changes
        </button>

        {saved && (
          <p style={{ color: "#16a34a", marginTop: "10px", fontSize: "14px" }}>
            ✓ Settings saved
          </p>
        )}
      </div>
    </div>
  );
}