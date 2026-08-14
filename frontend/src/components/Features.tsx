import { motion } from "framer-motion";
import {
  ShieldCheck,
  BrainCircuit,
  Cloud,
  Lock,
  Activity,
  Database,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Threat Detection",
    description:
      "AI continuously monitors and detects cyber threats before they become attacks.",
  },
  {
    icon: BrainCircuit,
    title: "AI Intelligence",
    description:
      "Advanced machine learning models analyze millions of security events instantly.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    description:
      "Protect cloud infrastructure with intelligent monitoring and automated defense.",
  },
  {
    icon: Lock,
    title: "Zero Trust",
    description:
      "Secure every user and every device with a modern Zero Trust architecture.",
  },
  {
    icon: Activity,
    title: "24/7 Monitoring",
    description:
      "Real-time monitoring ensures your systems remain protected around the clock.",
  },
  {
    icon: Database,
    title: "Digital Twin",
    description:
      "Create digital replicas of your infrastructure for predictive security analysis.",
  },
];

export default function Features() {
  return (
    <section className="relative py-24 text-white">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <h2 className="text-5xl font-bold">
            Powerful Features
          </h2>

          <p className="mt-5 text-gray-400 max-w-2xl mx-auto text-lg">
            Enterprise-grade cybersecurity powered by Artificial Intelligence,
            automation and predictive analytics.
          </p>

        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/10 transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">

                  <Icon className="text-cyan-400 w-8 h-8" />

                </div>

                <h3 className="text-2xl font-bold mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {feature.description}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}