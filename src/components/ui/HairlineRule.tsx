export default function HairlineRule({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-ink/10 ${className}`} />;
}
