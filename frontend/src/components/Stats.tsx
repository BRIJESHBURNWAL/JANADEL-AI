import {
  ShieldCheck,
  Activity,
  Globe,
  Cpu,
} from "lucide-react";

const stats = [
  {
    icon: ShieldCheck,
    value: "500+",
    title: "Organizations Protected",
  },
  {
    icon: Activity,
    value: "99.9%",
    title: "Threat Detection",
  },
  {
    icon: Globe,
    value: "24/7",
    title: "AI Monitoring",
  },
  {
    icon: Cpu,
    value: "10M+",
    title: "Threats Blocked",
  },
];

export default function Stats() {
  return (
    <section className="relative py-24 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Trusted Worldwide
          </h2>

          <p className="text-gray-400 text-lg mt-5 max-w-2xl mx-auto">
            Our AI-powered cybersecurity platform protects organizations around the world with intelligent monitoring and advanced threat detection.
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 text-center hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/10 transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mx-auto mb-6">

                  <Icon className="w-8 h-8 text-cyan-400" />

                </div>

                <h3 className="text-5xl font-extrabold text-cyan-400">
                  {item.value}
                </h3>

                <p className="mt-4 text-gray-400 text-lg">
                  {item.title}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
}