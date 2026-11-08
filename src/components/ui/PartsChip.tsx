export default function PartsChip({ count }: { count: number }) {
  if (count <= 1) return null;

  return (
    <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-sm border border-accent/50 text-accent">
      {count} Parts
    </span>
  );
}
