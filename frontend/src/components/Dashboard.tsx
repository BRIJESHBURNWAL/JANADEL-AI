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

interface Threat {
  id: number;
  input_data: string;
  risk_level: string;
  reason: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FETCH REAL BACKEND DATA
  // ============================================================

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, threatsResponse] = await Promise.all([
          axios.get<DashboardStats>(
            "http://127.0.0.1:8000/dashboard/stats"
          ),
          axios.get<Threat[]>(
            "http://127.0.0.1:8000/threats"
          ),
        ]);

        setStats(statsResponse.data);
        setThreats(threatsResponse.data);

        setLoading(false);
      } catch (err) {
        console.error("Dashboard API error:", err);
        setError("Unable to load dashboard data.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <section className="relative w-full px-6 md:px-16 py-20 text-white">
        <div className="text-center">
          <p className="text-gray-400">
            Loading security dashboard...
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // ERROR
  // ============================================================

  if (error || !stats) {
    return (
      <section className="relative w-full px-6 md:px-16 py-20 text-white">
        <div className="text-center">
          <p className="text-red-400">
            {error || "No dashboard data available."}
          </p>
        </div>
      </section>
    );
  }

  // ============================================================
  // CALCULATE RISK SCORE
  // ============================================================

  const riskScore =
    stats.total_threats > 0
      ? Math.round(
          ((stats.dangerous * 100) +
            (stats.suspicious * 50)) /
            stats.total_threats
        )
      : 0;

  // ============================================================
  // DASHBOARD CARDS
  // ============================================================

  const cards = [
    {
      label: "Total Threats",
      value: stats.total_threats,
      change: "Live",
      color: "text-red-400",
    },
    {
      label: "Critical Alerts",
      value: stats.dangerous,
      change: "Live",
      color: "text-orange-400",
    },
    {
      label: "Systems Monitored",
      value: stats.total_sources,
      change: "Live",
      color: "text-blue-400",
    },
    {
      label: "Risk Score",
      value: riskScore,
      change: "Live",
      color: "text-green-400",
      suffix: "/100",
    },
  ];

  // ============================================================
  // THREAT SEVERITY
  // ============================================================

  const getSeverity = (risk: string) => {
    if (risk === "Dangerous") return "Critical";
    if (risk === "Suspicious") return "High";
    return "Low";
  };

  const severityColor: Record<string, string> = {
    Critical:
      "bg-red-500/20 text-red-400 border-red-500/30",

    High:
      "bg-orange-500/20 text-orange-400 border-orange-500/30",

    Medium:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",

    Low:
      "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <section className="relative w-full px-6 md:px-16 py-20 text-white">

      {/* Header */}

      <div className="text-center mb-12">

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">

          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
            Live
          </span>

        </div>

        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Live Security Dashboard
        </h2>

        <p className="text-gray-400">
          Real-time visibility across your entire infrastructure
        </p>

      </div>


      {/* ======================================================
          STAT CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        {cards.map((s) => (

          <div
            key={s.label}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md transition-all duration-500 hover:bg-white/10"
          >

            <p className="text-gray-400 text-sm mb-2">
              {s.label}
            </p>

            <div className="flex items-end justify-between">

              <h3 className="text-2xl font-bold tabular-nums">

                {s.value.toLocaleString()}

                {s.suffix ?? ""}

              </h3>

              <span
                className={`text-sm font-medium ${s.color}`}
              >
                {s.change}
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* ======================================================
          THREAT FEED + RISK SCORE
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* Threat Feed */}

        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">

          <div className="flex items-center justify-between mb-5">

            <h3 className="text-lg font-semibold">
              Recent Threat Activity
            </h3>

            <span className="flex items-center gap-1.5 text-xs text-gray-500">

              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />

              Live Data

            </span>

          </div>


          <div className="space-y-3">

            {threats.length === 0 ? (

              <div className="text-center py-10 text-gray-500">
                No threats detected yet.
              </div>

            ) : (

              threats.slice(0, 4).map((threat) => {

                const severity = getSeverity(
                  threat.risk_level
                );

                return (

                  <div
                    key={threat.id}
                    className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-4 py-3 hover:bg-white/10 transition-all duration-500"
                  >

                    <div>

                      <p className="font-medium">
                        {threat.input_data}
                      </p>

                      <p className="text-xs text-gray-400">
                        {threat.reason}
                      </p>

                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${severityColor[severity]}`}
                    >
                      {severity}
                    </span>

                  </div>

                );

              })

            )}

          </div>

        </div>


        {/* Risk Score */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col items-center justify-center text-center">

          <h3 className="text-lg font-semibold mb-4">
            Overall Risk Score
          </h3>


          <div className="relative w-36 h-36 rounded-full flex items-center justify-center border-8 border-blue-500/30">

            <span className="text-3xl font-bold text-blue-400 tabular-nums">
              {riskScore}
            </span>

            <div className="absolute inset-0 rounded-full border-8 border-blue-400/20 animate-ping" />

          </div>


          <p className="text-gray-400 text-sm mt-4">

            {stats.dangerous > 0
              ? `${stats.dangerous} dangerous threat${
                  stats.dangerous > 1 ? "s" : ""
                } detected`
              : "No dangerous threats detected"}

          </p>

        </div>

      </div>

    </section>
  );
}