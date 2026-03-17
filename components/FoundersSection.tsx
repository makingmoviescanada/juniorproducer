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
            Junior started as our own in-house tool — built out of frustration with broken government portals, missed funding windows, and the sheer volume of admin that falls on independent filmmakers with no staff and no budgets to keep the lights on between productions.
          </p>
          <p
            className="text-center text-junior-white"
            style={{
              fontFamily: 'var(--font-barlow)',
              fontWeight: 400,
              fontSize: "1rem",
              lineHeight: "1.6",
            }}
          >
            Gavin Seal is a Writers Guild of Canada prize-winning writer and Golden Sheaf Award-winning director who has led in-house creative teams at Mattel and Shopify. Lisa Purisima is a Canadian Screen Award-nominated producer whose credits include John Wick 4 and The Morning Show (Apple TV+). Junior is built on this intersectional experience of art and technology.
          </p>
        </div>

        {/* Founder Photo Placeholders */}
        <div className="flex justify-center gap-6 mx-auto" style={{ maxWidth: "600px" }}>
          {[1, 2].map((index) => (
            <div
              key={index}
              className="flex-1"
              style={{
                aspectRatio: "3/4",
                backgroundColor: "#2A2A2A",
                border: "1px solid #333",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                className="text-center text-junior-white"
                style={{
                  fontFamily: 'var(--font-barlow)',
                  fontWeight: 400,
                  fontSize: "12px",
                }}
              >
                Founder photo — desaturated
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
