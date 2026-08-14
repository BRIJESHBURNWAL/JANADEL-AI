import { motion } from "framer-motion";
import {
  ShieldCheck,
  BrainCircuit,
  Cloud,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "AI Protection",
    desc: "Advanced AI continuously protects your organization against cyber threats.",
  },
  {
    icon: BrainCircuit,
    title: "Smart Intelligence",
    desc: "Machine learning analyzes millions of events in real time.",
  },
  {
    icon: Cloud,
    title: "Cloud Security",
    desc: "Protect your cloud infrastructure with enterprise-grade monitoring.",
  },
  {
    icon: Lock,
    title: "Zero Trust",
    desc: "Secure access for every user, every device and every application.",
  },
];

export default function About() {
  return (
    <section className="relative py-28 text-white">

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >

          <span className="text-cyan-400 font-semibold uppercase tracking-[5px]">
            ABOUT JANADEL AI
          </span>

          <h2 className="text-5xl md:text-6xl font-extrabold mt-5 leading-tight">
            Building the Future of
            <span className="text-cyan-400"> AI Cybersecurity</span>
          </h2>

          <p className="text-gray-400 text-lg mt-8 leading-8">
            Janadel AI is an enterprise cybersecurity platform designed to
            protect organizations using Artificial Intelligence, Digital Twin
            technology, cloud security and real-time threat monitoring.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">

            <button className="px-8 py-4 bg-cyan-400 text-black rounded-xl font-bold hover:scale-105 transition">
              Learn More
            </button>

            <button className="px-8 py-4 border border-cyan-400 rounded-xl text-cyan-300 hover:bg-cyan-400 hover:text-black transition">
              Contact Us
            </button>

          </div>

        </motion.div>

        {/* Right */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-3xl border border-slate-700 bg-white/5 backdrop-blur-xl p-8 hover:border-cyan-400 hover:shadow-cyan-500/10 hover:shadow-xl transition duration-300"
              >

                <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">

                  <Icon className="w-8 h-8 text-cyan-400" />

                </div>

                <h3 className="text-2xl font-bold mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-400 leading-7">
                  {item.desc}
                </p>

              </div>
            );
          })}

        </motion.div>

      </div>

    </section>
  );
}