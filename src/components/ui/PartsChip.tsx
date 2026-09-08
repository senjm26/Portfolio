export default function PartsChip({ count }: { count: number }) {
  if (count <= 1) return null;

  return (
    <span className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1 rounded-sm border border-sky/50 text-sky">
      {count} Parts
    </span>
  );
}
