"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", backgroundColor: "#F0EBE0", color: "#1A1A1A", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <nav style={{ backgroundColor: "#F0EBE0", borderBottom: "1.5px solid #1A1A1A", padding: "0 7vw", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: "18px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#1A1A1A", textDecoration: "none" }}>Junior</Link>
        <span style={{ fontSize: "14px", color: "#1A1A1A" }}>
          Already have an account?{" "}
          <Link href="/sign-in" style={{ fontWeight: 900, color: "#E8392A", textDecoration: "none" }}>Sign in</Link>
        </span>
      </nav>

      <section style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 7vw", textAlign: "center" }}>
        <p style={{ fontWeight: 900, fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#E8392A", marginBottom: "20px" }}>
          Junior is your Second Brain
        </p>
        <h1 style={{ fontWeight: 900, fontSize: "clamp(28px, 4vw, 52px)", textTransform: "uppercase", letterSpacing: "0.04em", lineHeight: 1.06, color: "#1A1A1A", marginBottom: "16px", maxWidth: "640px" }}>
          What can Junior take off your plate today?
        </h1>
        <p style={{ fontWeight: 400, fontSize: "17px", lineHeight: 1.65, color: "#1A1A1A", opacity: 0.6, marginBottom: "40px", maxWidth: "420px" }}>
          Junior is free to try. No credit card required.
        </p>
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <SignUp />
        </div>
      </section>

      <footer style={{ backgroundColor: "#1A1A1A", padding: "24px 7vw", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontWeight: 900, fontSize: "15px", textTransform: "uppercase", letterSpacing: "0.08em", color: "#F0EBE0", opacity: 0.7 }}>Junior</span>
        <span style={{ fontWeight: 400, fontSize: "13px", color: "#F0EBE0", opacity: 0.3 }}>© 2026 Intersectionnel Films Inc.</span>
      </footer>

    </div>
  );
}
