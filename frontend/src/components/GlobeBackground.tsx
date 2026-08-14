import { useEffect, useRef, useState } from "react";
import GlobeGL from "react-globe.gl";

export default function GlobeBackground() {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  const points = [
    { lat: 37.77, lng: -122.41, city: "San Francisco", size: 0.5, color: "#22d3ee" },
    { lat: 51.5, lng: -0.12, city: "London", size: 0.4, color: "#3b82f6" },
    { lat: 35.68, lng: 139.69, city: "Tokyo", size: 0.4, color: "#22d3ee" },
    { lat: 28.61, lng: 77.2, city: "New Delhi", size: 0.5, color: "#f87171" },
    { lat: -33.86, lng: 151.2, city: "Sydney", size: 0.3, color: "#3b82f6" },
    { lat: 1.35, lng: 103.8, city: "Singapore", size: 0.4, color: "#22d3ee" },
    { lat: 40.71, lng: -74.0, city: "New York", size: 0.5, color: "#f87171" },
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
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.8;
      setDimensions({ width: size, height: size });
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = false;
      globeRef.current.pointOfView({ altitude: 3 });
    }
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-60">
      <div
        className="animate-[float_4s_ease-in-out_infinite]"
        style={{ filter: "brightness(1.5) contrast(1.1) saturate(1.1)" }}
      >
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
          arcsData={arcs}
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcStroke={0.5}
          atmosphereColor="#3b82f6"
          atmosphereAltitude={0.25}
          showGraticules={false}
        />
      </div>
    </div>
  );
}