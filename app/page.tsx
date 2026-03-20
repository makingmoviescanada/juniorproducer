export default function Home() {
  return (
    <div className="w-full min-h-screen bg-white">
      <nav
        className="w-full flex items-center justify-between px-8 py-4"
        style={{ backgroundColor: "#F0EBE0" }}
      >
        {/* Wordmark */}
        <span
          className="text-2xl tracking-widest select-none"
          style={{
          fontFamily: "var(--font-barlow), sans-serif",
          fontWeight: 900,
          textTransform: "uppercase",
          color: "#1A1A1A",
          letterSpacing: "0.15em",
          }}
        >
          JUNIOR
        </span>

        {/* CTA Button */}
        <button
          className="px-5 py-2.5 text-white text-sm rounded-[6px]"
          style={{
          fontFamily: "var(--font-barlow), sans-serif",
          fontWeight: 900,
          textTransform: "uppercase",
          backgroundColor: "#E8392A",
            boxShadow: "4px 4px 0px #1A1A1A",
            letterSpacing: "0.08em",
            transition: "background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#C9301E";
            btn.style.boxShadow = "6px 6px 0px #1A1A1A";
            btn.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.backgroundColor = "#E8392A";
            btn.style.boxShadow = "4px 4px 0px #1A1A1A";
            btn.style.transform = "translateY(0)";
          }}
        >
          GET EARLY ACCESS
        </button>
      </nav>
    </div>
  );
}
