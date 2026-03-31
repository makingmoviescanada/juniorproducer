"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";

const FLIP_WORDS = ["boring", "annoying", "painful", "frustrating", "overwhelming"];

function FlipWord() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % FLIP_WORDS.length);
        setVisible(true);
      }, 300);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      color: "#E8392A",
      display: "inline-block",
      minWidth: "clamp(160px, 22vw, 280px)",
      transition: "opacity 0.28s ease, transform 0.28s ease",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(-8px)",
    }}>
      {FLIP_WORDS[index]}.
    </span>
  );
}

export default function SignInPage() {
  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", backgroundColor: "#F0EBE0", color: "#1A1A1A", overflowX: "hidden" }}>

      <nav style={{ backgroundColor: "#F0EBE0", borderBottom: "1.5px solid #1A1A1A", padding: "0 7vw", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: "18px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1A1A", textDecoration: "none" }}>Junior</Link>
        <span style={{ fontSize: "14px", color: "#1A1A1A" }}>
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" style={{ fontWeight: 900, color: "#E8392A", textDecoration: "none" }}>Sign up</Link>
        </span>
      </nav>

      <section style={{ backgroundColor: "#F0EBE0", padding: "80px 7vw 100px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <p style={{ fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#E8392A", marginBottom: "24px" }}>Open Beta — Free to Try</p>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(32px, 5vw, 72px)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.06, color: "#1A1A1A", marginBottom: "20px", maxWidth: "860px" }}>
          Let Junior handle the <FlipWord /><br />parts of producing.
        </h1>
        <p style={{ fontWeight: 400, fontSize: "18px", lineHeight: 1.65, color: "#1A1A1A", opacity: 0.7, marginBottom: "16px", maxWidth: "540px" }}>
          So you can get back to what really matters — making your film.
        </p>
        <p style={{ fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.16em", color: "#1A1A1A", opacity: 0.5, marginBottom: "40px" }}>
          Welcome back. Pick up where you left off.
        </p>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <SignIn />
        </div>
      </section>

      <section style={{ backgroundColor: "#E8392A", padding: "80px 7vw 60px" }}>
        <span style={{ fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(255,255,255,0.5)", marginBottom: "16px", display: "block" }}>How Junior Helps</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", marginTop: "52px" }}>
          {[
            { icon: "$", title: "Get Funding", body: "Junior navigates complicated program guidelines for you and gets you answers instantly." },
            { icon: "📅", title: "Track Deadlines", body: "Junior syncs program deadlines to your calendar and sends you reminders to apply." },
            { icon: "⚙️", title: "Automate Admin", body: "Junior automates admin to increase your profit margins on fixed line items." },
          ].map((card) => (
            <div key={card.title} style={{ backgroundColor: "#F0EBE0", border: "2.5px solid #1A1A1A", padding: "44px 36px", boxShadow: "4px 4px 0px #1A1A1A", display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ fontSize: "28px", color: "#E8392A" }}>{card.icon}</div>
              <h3 style={{ fontWeight: 900, fontSize: "clamp(19px, 1.8vw, 24px)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.12, color: "#1A1A1A" }}>{card.title}</h3>
              <p style={{ fontWeight: 400, fontSize: "15px", lineHeight: 1.7, color: "#1A1A1A", opacity: 0.68 }}>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#1A1A1A", padding: "80px 7vw" }}>
        <div style={{ maxWidth: "700px", marginBottom: "64px" }}>
          <span style={{ fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(240,235,224,0.4)", marginBottom: "16px", display: "block" }}>The Founders</span>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 3.5vw, 50px)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.1, color: "#F0EBE0", marginBottom: "24px" }}>
            Built by Canadian Filmmakers, for Canadian Filmmakers.
          </h2>
          <p style={{ fontWeight: 400, fontSize: "17px", lineHeight: 1.7, color: "#F0EBE0", opacity: 0.58 }}>
            Junior started as an in-house tool for automating admin to keep the lights on with no staff and no budgets between productions.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
          {[
            { name: "Gavin Seal", role: "Co-Founder", bio: "Writers Guild of Canada prize-winning filmmaker who has led in-house creative teams at Mattel and Shopify.", img: "/images/gavin.png" },
            { name: "Lisa Purisima", role: "Co-Founder", bio: "Canadian Screen Award-nominated producer whose credits include John Wick 4 (Lionsgate) and The Morning Show (Apple TV+).", img: "/images/lisa.png" },
          ].map((f) => (
            <div key={f.name} style={{ display: "flex", gap: "28px", alignItems: "center", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", padding: "44px 40px" }}>
              <div style={{ width: "130px", flexShrink: 0, aspectRatio: "3/4", overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.12)", backgroundColor: "#333" }}>
                <img src={f.img} alt={f.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <span style={{ fontWeight: 900, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.16em", color: "#E8392A" }}>{f.role}</span>
                <div style={{ fontWeight: 900, fontSize: "22px", textTransform: "uppercase", letterSpacing: "0.04em", color: "#F0EBE0", lineHeight: 1.1 }}>{f.name}</div>
                <p style={{ fontWeight: 400, fontSize: "14px", lineHeight: 1.65, color: "#F0EBE0", opacity: 0.52, marginTop: "4px" }}>{f.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: "#E8392A", padding: "90px 7vw", textAlign: "center" }}>
        <h2 style={{ fontWeight: 900, fontSize: "clamp(28px, 3.8vw, 58px)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.1, color: "#FFFFFF", marginBottom: "16px", maxWidth: "800px", marginLeft: "auto", marginRight: "auto" }}>
          The Cavalry&rsquo;s Not Coming. But Junior Is.
        </h2>
        <p style={{ fontWeight: 600, fontSize: "17px", color: "rgba(255,255,255,0.6)", marginBottom: "48px" }}>Early access. Limited spots.</p>
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ fontFamily: "'Barlow', sans-serif", fontWeight: 900, fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.06em", textDecoration: "none", display: "inline-block", cursor: "pointer", border: "2px solid #1A1A1A", backgroundColor: "#FFFFFF", color: "#1A1A1A", padding: "15px 36px", boxShadow: "4px 4px 0px #1A1A1A" }}>
          Try the Beta — It&rsquo;s Free ↑
        </a>
      </section>

      <footer style={{ backgroundColor: "#1A1A1A", padding: "32px 7vw", display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontWeight: 900, fontSize: "15px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#F0EBE0", opacity: 0.7 }}>Junior</span>
        <span style={{ fontWeight: 400, fontSize: "13px", color: "#F0EBE0", opacity: 0.3 }}>© 2026 Intersectionnel Films Inc.</span>
      </footer>

    </div>
  );
}
