export default function SpecRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-2 border-b border-ink/10 font-mono text-xs">
      <span className="uppercase tracking-[0.2em] text-ink/40">
        {label}
      </span>
      <span className="text-ink/80 text-right">{value}</span>
    </div>
  );
}
