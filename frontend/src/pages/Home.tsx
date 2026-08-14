import Background from "../components/Background";
import Cursor from "../components/Cursor";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import About from "../components/About";
import Footer from "../components/Footer";
import Trusted from "../components/Trusted";
import DashboardSection from "../components/Dashboard";
import Loader from "../components/Loader";
import ScrollReveal from "../components/ScrollReveal";
import Terminal from "../components/Terminal";
import Globe from "../components/GlobeBackground";

export default function Home() {
  return (
    <>
      <Loader />
      <Background />
      <Cursor />
      <Navbar />
      <Hero />

      <ScrollReveal>
        <Trusted />
      </ScrollReveal>

      <ScrollReveal>
        <Features />
      </ScrollReveal>

      <ScrollReveal>
        <DashboardSection />
      </ScrollReveal>

      <Globe />

      <ScrollReveal>
        <div className="py-16 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Live Threat Response
          </h2>
          <p className="text-gray-400 mb-10">
            Watch our AI engine detect and neutralize threats in real time
          </p>
          <Terminal />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <About />
      </ScrollReveal>

      <Footer />
    </>
  );
}