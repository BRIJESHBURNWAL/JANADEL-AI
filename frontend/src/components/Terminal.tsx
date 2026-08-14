import { useEffect, useState } from "react";

const LINES = [
  { text: "$ initiating security scan...", color: "text-gray-400" },
  { text: "$ scanning 512 endpoints...", color: "text-gray-400" },
  { text: "✔ firewall integrity: OK", color: "text-green-400" },
  { text: "✔ SSL certificates: valid", color: "text-green-400" },
  { text: "⚠ anomaly detected: Endpoint-224", color: "text-yellow-400" },
  { text: "$ running deep packet inspection...", color: "text-gray-400" },
  { text: "✖ threat identified: malware.signature.exe", color: "text-red-400" },
  { text: "$ isolating affected system...", color: "text-gray-400" },
  { text: "✔ threat neutralized successfully", color: "text-green-400" },
  { text: "$ system status: secure", color: "text-cyan-400" },
];

export default function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= LINES.length) {
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setLineIndex(0);
        setCharIndex(0);
        setCurrentText("");
      }, 2500);
      return () => clearTimeout(resetTimer);
    }

    const fullText = LINES[lineIndex].text;

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 25);
      return () => clearTimeout(timer);
    } else {
      const nextTimer = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, fullText]);
        setLineIndex(lineIndex + 1);
        setCharIndex(0);
        setCurrentText("");
      }, 400);
      return () => clearTimeout(nextTimer);
    }
  }, [charIndex, lineIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md overflow-hidden shadow-xl shadow-black/40">
      {/* Terminal top bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-gray-500">janadel-ai — security-scan</span>
      </div>

      {/* Terminal body */}
      <div className="p-5 font-mono text-sm h-64 overflow-hidden">
        {displayedLines.map((line, i) => {
          const color = LINES[i]?.color ?? "text-gray-400";
          return (
            <p key={i} className={`${color} mb-1.5`}>
              {line}
            </p>
          );
        })}
        {lineIndex < LINES.length && (
          <p className={`${LINES[lineIndex].color} mb-1.5`}>
            {currentText}
            <span className="animate-pulse">▋</span>
          </p>
        )}
      </div>
    </div>
  );
}