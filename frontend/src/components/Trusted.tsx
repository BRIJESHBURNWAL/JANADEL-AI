import { ShieldCheck, Activity, Globe, Cpu } from "lucide-react";
import Counter from "./Counter";

export default function Trusted() {
  const stats = [
    { icon: ShieldCheck, value: "500+", label: "Organizations Protected" },
    { icon: Activity, value: "99.9%", label: "Threat Detection Accuracy" },
    { icon: Globe, value: "24/7", label: "AI-Driven Monitoring" },
    { icon: Cpu, value: "10M+", label: "Threats Neutralized" },
  ];

  return (
    <section className="relative w-full py-24 px-6 md:px-16 text-white overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
            Trusted Worldwide
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
          Built for enterprise-grade{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            security
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Our AI-powered platform protects organizations around the world
          with intelligent monitoring and advanced threat detection.
        </p>
      </div>

      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="group relative bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-md hover:bg-white/[0.06] hover:border-blue-400/40 hover:-translate-y-1.5 transition-all duration-300"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-2/3 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full" />
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border border-blue-400/20 mb-6 group-hover:scale-110 group-hover:border-blue-400/50 transition-all duration-300">
              <Icon className="w-6 h-6 text-cyan-400" strokeWidth={1.8} />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              <Counter value={value} />
            </h3>
            <p className="text-gray-400 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}