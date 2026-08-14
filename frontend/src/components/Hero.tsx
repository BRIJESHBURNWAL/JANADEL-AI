import GlobeBackground from "./GlobeBackground";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen pt-32 pb-20 flex flex-col items-center justify-center overflow-hidden text-white text-center px-4">
      {/* Globe background */}
      <GlobeBackground />

      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] z-0" />

      {/* Badge */}
      <div className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-sm text-gray-300 font-medium">
          AI Powered Cybersecurity Platform
        </span>
      </div>

      {/* Heading */}
      <h1 className="relative z-10 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl">
        Janadel{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI
        </span>
      </h1>

      <p className="relative z-10 text-lg md:text-xl text-gray-400 mt-4 max-w-2xl">
        Enterprise Cybersecurity Platform
      </p>

      <p className="relative z-10 text-sm md:text-base text-gray-500 mt-3 max-w-xl">
        Threat Detection • Risk Intelligence • Digital Twin • Explainable AI
      </p>

      {/* Buttons */}
      <div className="relative z-10 flex flex-col sm:flex-row gap-4 mt-10">
        <button className="px-7 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 transition-all duration-300 hover:scale-105">
          Get Started
        </button>
        <button className="px-7 py-3 rounded-full text-sm font-semibold border border-white/15 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all duration-300">
          Watch Demo
        </button>
      </div>

      {/* Bottom fade line */}
      <div className="absolute bottom-10 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent z-0" />
    </section>
  );
}