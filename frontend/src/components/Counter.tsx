import { useEffect, useRef, useState } from "react";

export default function Counter({
  value,
  duration = 1500,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const numMatch = value.match(/[\d.]+/);
    const numTarget = numMatch ? parseFloat(numMatch[0]) : 0;
    const prefix = value.split(numMatch?.[0] ?? "")[0] ?? "";
    const suffix = value.split(numMatch?.[0] ?? "")[1] ?? "";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const start = performance.now();
          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const current = (numTarget * progress).toFixed(
              value.includes(".") ? 1 : 0
            );
            setDisplay(`${prefix}${current}${suffix}`);
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}