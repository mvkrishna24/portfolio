"use client";

import { useAppStore, type ViewMode } from "@/lib/store";

const modes: { value: ViewMode; label: string }[] = [
  { value: "creative", label: "Creative" },
  { value: "recruiter", label: "Recruiter" },
];

/** Switches between the cinematic experience and a fast-scanning layout. */
export default function ModeToggle() {
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);

  return (
    <div
      role="group"
      aria-label="View mode"
      className="glass flex rounded-full p-1 font-mono text-[11px] tracking-wider uppercase"
    >
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          aria-pressed={mode === m.value}
          className={`rounded-full px-3 py-1.5 transition-colors duration-300 ${
            mode === m.value
              ? "bg-white text-black"
              : "text-mist hover:text-white"
          }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}
