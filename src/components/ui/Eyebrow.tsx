export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-10 h-px bg-sky shrink-0" />
      <span className="font-mono text-[11px] font-medium tracking-[0.4em] uppercase text-ink/60">
        {children}
      </span>
    </div>
  );
}
