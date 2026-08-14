import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import DashboardLayout from "./layouts/DashboardLayout";

import Alerts from "./pages/dashboard/Alerts";
import Reports from "./pages/dashboard/Reports";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import Profile from "./pages/dashboard/Profile";
import Sources from "./pages/dashboard/Sources";
import Copilot from "./pages/dashboard/Copilot";
import Threats from "./pages/dashboard/Threats";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="sources" element={<Sources />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="threats" element={<Threats />} />
      </Route>
    </Routes>
  );
}

export default App;