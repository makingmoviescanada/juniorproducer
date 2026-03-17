export default function FoundersSection() {
  return (
    <section style={{ backgroundColor: "#1A1A1A", paddingTop: "100px", paddingBottom: "100px" }}>
      <div className="mx-auto px-4">
        {/* Headline */}
        <h2
          className="text-center text-junior-white uppercase mb-8 leading-snug text-balance"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: "2.5rem",
            lineHeight: "1.2",
          }}
        >
          Built by Canadian Filmmakers, for Canadian Filmmakers.
        </h2>

        {/* Body Copy */}
        <div className="mx-auto mb-12" style={{ maxWidth: "720px" }}>
          <p
            className="text-center text-junior-white mb-6"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            Junior started as our own in-house tool — built out of frustration with broken government portals and the sheer volume of admin that falls on producers with no staff and no budgets to keep the lights on between productions.
          </p>

        </div>

        {/* Founder Cards */}
        <div className="flex justify-center mx-auto" style={{ maxWidth: "800px", gap: "32px" }}>
          {/* Card 1 — Gavin */}
          <div className="flex-1 flex flex-col">
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                backgroundColor: "#2A2A2A",
                border: "1px solid #333",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "grayscale(100%)",
              }}
            >
              <p
                className="text-center text-junior-white"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: "12px" }}
              >
                Founder photo — desaturated
              </p>
            </div>
            <p
              className="text-junior-white"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "1.6",
                marginTop: "16px",
              }}
            >
              Gavin Seal is a Writers Guild of Canada prize-winning writer and Golden Sheaf Award-winning director who has led in-house creative teams at Mattel and Shopify.
            </p>
          </div>

          {/* Card 2 — Lisa */}
          <div className="flex-1 flex flex-col">
            <div
              style={{
                width: "100%",
                aspectRatio: "3/4",
                backgroundColor: "#2A2A2A",
                border: "1px solid #333",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                filter: "grayscale(100%)",
              }}
            >
              <p
                className="text-center text-junior-white"
                style={{ fontFamily: 'var(--font-barlow)', fontWeight: 400, fontSize: "12px" }}
              >
                Founder photo — desaturated
              </p>
            </div>
            <p
              className="text-junior-white"
              style={{
                fontFamily: 'var(--font-barlow)',
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "1.6",
                marginTop: "16px",
              }}
            >
              Lisa Purisima is a Canadian Screen Award-nominated producer whose credits include John Wick 4 and The Morning Show (Apple TV+).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
