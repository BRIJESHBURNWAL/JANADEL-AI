import { useEffect, useRef, useState } from "react";
import GlobeGL from "react-globe.gl";

export default function GlobeSection() {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  const points = [
    { lat: 37.77, lng: -122.41, city: "San Francisco", size: 0.6, color: "#22d3ee" },
    { lat: 51.5, lng: -0.12, city: "London", size: 0.5, color: "#3b82f6" },
    { lat: 35.68, lng: 139.69, city: "Tokyo", size: 0.5, color: "#22d3ee" },
    { lat: 28.61, lng: 77.2, city: "New Delhi", size: 0.7, color: "#f87171" },
    { lat: -33.86, lng: 151.2, city: "Sydney", size: 0.4, color: "#3b82f6" },
    { lat: 1.35, lng: 103.8, city: "Singapore", size: 0.5, color: "#22d3ee" },
    { lat: 52.52, lng: 13.4, city: "Berlin", size: 0.4, color: "#3b82f6" },
    { lat: 40.71, lng: -74.0, city: "New York", size: 0.6, color: "#f87171" },
  ];

  const arcs = points.slice(0, 5).map((p, i) => ({
    startLat: p.lat,
    startLng: p.lng,
    endLat: points[(i + 2) % points.length].lat,
    endLng: points[(i + 2) % points.length].lng,
    color: ["#22d3ee", "#3b82f6"],
  }));

  useEffect(() => {
    function updateSize() {
      const width = Math.min(window.innerWidth - 40, 500);
      setDimensions({ width, height: width });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.6;
      globeRef.current.controls().enableZoom = false;
    }
  }, []);

  return (
    <section className="relative w-full py-24 px-6 text-white overflow-hidden">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-medium text-gray-300 tracking-wide uppercase">
            Global Coverage
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Protecting organizations{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            worldwide
          </span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg">
          Real-time threat monitoring across every continent, every second.
        </p>
      </div>

      <div className="flex justify-center">
        <GlobeGL
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.02}
          pointRadius="size"
          pointLabel={(d: any) => d.city}
          arcsData={arcs}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcStroke={0.5}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.2}
        />
      </div>
    </section>
  );
}