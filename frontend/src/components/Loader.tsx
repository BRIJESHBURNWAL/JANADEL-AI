import { useEffect, useState } from "react";

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1200);
    const remove = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(timer);
      clearTimeout(remove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950 transition-opacity duration-500 ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-14 h-14 rounded-full border-4 border-white/10 border-t-cyan-400 animate-spin mb-6" />
      <h1 className="text-white text-xl font-bold tracking-wide">
        Janadel <span className="text-cyan-400">AI</span>
      </h1>
    </div>
  );
}