import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          background: "#111827",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Janadel AI</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/dashboard" style={{ color: "white" }}>
            Home
          </Link>
          <Link to="/dashboard/sources" style={{ color: "white" }}>
            Sources
          </Link>
          <Link to="/dashboard/threats" style={{ color: "white" }}>
            Threats
          </Link>
          <Link to="/dashboard/copilot" style={{ color: "white" }}>
            Copilot
          </Link>
          <Link to="/dashboard/alerts" style={{ color: "white" }}>
            Alerts
          </Link>
          <Link to="/dashboard/reports" style={{ color: "white" }}>
            Reports
          </Link>
          <Link to="/dashboard/settings" style={{ color: "white" }}>
            Settings
          </Link>
          <Link to="/dashboard/profile" style={{ color: "white" }}>
            Profile
          </Link>
        </nav>
      </div>

      {/* Main content area - yahan sub-pages dikhenge */}
      <div style={{ flex: 1, padding: "30px", background: "#f9fafb" }}>
        <Outlet />
      </div>
    </div>
  );
}