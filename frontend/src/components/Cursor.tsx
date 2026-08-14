import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed z-40 w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/30 blur-xl"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-50 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400"
      />
    </>
  );
}