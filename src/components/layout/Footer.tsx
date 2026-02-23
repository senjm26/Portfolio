export default function Footer() {
  return (
    <footer className="relative border-t border-black/20 overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Optional subtle overlay for readability */}
      <div className="absolute inset-0 bg-white/70 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 py-14 text-center text-black">
        <p className="text-lg font-semibold tracking-tight">
          JS
        </p>

        <p className="text-sm text-black/60 mt-3">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>

    </footer>
  );
}