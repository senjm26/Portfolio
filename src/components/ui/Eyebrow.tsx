// Section label. It's the section's heading as far as screen readers and search
// engines are concerned, so it renders as an h2 under the page's h1.
export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-6 h-[3px] bg-accent shrink-0" />
      <h2 className="font-mono text-[11px] font-medium tracking-[0.4em] uppercase text-ink/60">
        {children}
      </h2>
    </div>
  );
}
