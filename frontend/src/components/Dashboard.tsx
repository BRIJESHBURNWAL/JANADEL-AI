import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState([
    { label: "Total Threats", value: 1248, change: "+12%", color: "text-red-400" },
    { label: "Critical Alerts", value: 37, change: "-4%", color: "text-orange-400" },
    { label: "Systems Monitored", value: 512, change: "+8%", color: "text-blue-400" },
    { label: "Risk Score", value: 72, change: "-6%", color: "text-green-400", suffix: "/100" },
  ]);

  const [threats, setThreats] = useState([
    { name: "Unauthorized Login Attempt", severity: "Critical", system: "Auth Server 01", time: "2 min ago" },
    { name: "Malware Signature Detected", severity: "High", system: "Endpoint-224", time: "14 min ago" },
    { name: "Unusual Network Traffic", severity: "Medium", system: "Firewall-Core", time: "38 min ago" },
    { name: "Failed MFA Attempt", severity: "Low", system: "VPN Gateway", time: "1 hr ago" },
  ]);

  const [pulseIndex, setPulseIndex] = useState<number | null>(null);

  // Stats ke numbers thodi thodi der mein halka sa change honge (live feel)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) =>
        prev.map((s, i) => {
          const shouldChange = Math.random() > 0.5;
          if (!shouldChange) return s;
          const delta = Math.floor(Math.random() * 5) - 2;
          setPulseIndex(i);
          return { ...s, value: Math.max(0, s.value + delta) };
        })
      );
      setTimeout(() => setPulseIndex(null), 600);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Naya threat entry har kuch second mein upar add hoga (live feed)
  useEffect(() => {
    const pool = [
      { name: "Port Scan Detected", severity: "Medium", system: "Perimeter Firewall" },
      { name: "Suspicious File Upload", severity: "High", system: "Web Server 03" },
      { name: "Brute Force Attempt", severity: "Critical", system: "Auth Server 02" },
      { name: "Outdated SSL Certificate", severity: "Low", system: "Load Balancer" },
    ];

    const interval = setInterval(() => {
      const random = pool[Math.floor(Math.random() * pool.length)];
      setThreats((prev) => [
        { ...random, time: "Just now" },
        ...prev.slice(0, 3),
      ]);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const severityColor: Record<string, string> = {
    Critical: "bg-red-500/20 text-red-400 border-red-500/30",
    High: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  return (
    <section className="relative w-full px-6 md:px-16 py-20 text-white">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
            Live
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Live Security Dashboard</h2>
        <p className="text-gray-400">Real-time visibility across your entire infrastructure</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`bg-white/5 border rounded-2xl p-6 backdrop-blur-md transition-all duration-500 ${
              pulseIndex === i
                ? "border-blue-400/60 shadow-lg shadow-blue-500/20 scale-[1.02]"
                : "border-white/10"
            }`}
          >
            <p className="text-gray-400 text-sm mb-2">{s.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold tabular-nums transition-all duration-300">
                {s.value.toLocaleString()}
                {s.suffix ?? ""}
              </h3>
              <span className={`text-sm font-medium ${s.color}`}>{s.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Feed */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold">Recent Threat Activity</h3>
            <span className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Streaming
            </span>
          </div>
          <div className="space-y-3">
            {threats.map((t, i) => (
              <div
                key={t.name + i}
                className={`flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-500 ${
                  i === 0 && t.time === "Just now"
                    ? "animate-[fadeSlide_0.5s_ease-out]"
                    : ""
                }`}
              >
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.system} • {t.time}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full border ${severityColor[t.severity]}`}
                >
                  {t.severity}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Score Panel */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-semibold mb-4">Overall Risk Score</h3>
          <div className="relative w-36 h-36 rounded-full flex items-center justify-center border-8 border-blue-500/30">
            <span className="text-3xl font-bold text-blue-400 tabular-nums">
              {stats[3].value}
            </span>
            <div className="absolute inset-0 rounded-full border-8 border-blue-400/20 animate-ping" />
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Moderate risk — 3 systems need attention
          </p>
        </div>
      </div>
    </section>
  );
}