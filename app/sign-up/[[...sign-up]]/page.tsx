"use client";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div style={{
      fontFamily: "'Barlow', sans-serif",
      color: "#1A1230",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: `
        radial-gradient(ellipse 85% 45% at 50% 2%, rgba(99,82,220,0.22) 0%, transparent 62%),
        radial-gradient(ellipse 55% 35% at 8% 20%, rgba(139,92,246,0.15) 0%, transparent 55%),
        radial-gradient(ellipse 45% 30% at 93% 16%, rgba(79,60,220,0.13) 0%, transparent 52%),
        radial-gradient(ellipse 60% 40% at 70% 52%, rgba(99,82,220,0.11) 0%, transparent 56%),
        radial-gradient(ellipse 50% 35% at 20% 76%, rgba(139,92,246,0.10) 0%, transparent 55%),
        #FAFAFE
      `,
    }}>

      {/* NAV */}
      <nav style={{
        background: "rgba(250,250,254,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(75,59,196,0.14)",
        padding: "0 7vw",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <Link href="/" style={{
          fontWeight: 900,
          fontSize: "20px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#2E1F6B",
          textDecoration: "none",
        }}>
          Junior
        </Link>
        <span style={{ fontSize: "15px", color: "#1A1230", opacity: 0.6 }}>
          Already have an account?{" "}
          <Link href="/sign-in" style={{
            fontWeight: 900,
            color: "#4B3BC4",
            textDecoration: "none",
          }}>
            Sign in
          </Link>
        </span>
      </nav>

      {/* MAIN */}
      <section style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 7vw 80px",
        textAlign: "center",
      }}>

        {/* Eyebrow */}
        <p style={{
          fontWeight: 900,
          fontSize: "11px",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "#4B3BC4",
          marginBottom: "24px",
          display: "inline-block",
          border: "1.5px solid rgba(75,59,196,0.25)",
          padding: "6px 16px",
          background: "rgba(75,59,196,0.06)",
        }}>
          Open Beta — Free to Start
        </p>

        {/* Headline */}
        <h1 style={{
          fontWeight: 900,
          fontSize: "clamp(28px, 2.8vw, 42px)",
          textTransform: "uppercase",
          letterSpacing: "0.03em",
          lineHeight: 1.08,
          color: "#1A1230",
          marginBottom: "16px",
          maxWidth: "680px",
        }}>
          Your dream development producer,<br />
          available right now.
        </h1>

        {/* Sub */}
        <p style={{
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: 1.7,
          color: "rgba(26,18,48,0.6)",
          marginBottom: "40px",
          maxWidth: "440px",
        }}>
          Junior is free to try. No credit card required.
        </p>

        {/* Clerk SignUp component */}
        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <SignUp />
        </div>

      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "24px 7vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderTop: "1px solid rgba(75,59,196,0.1)",
        background: "rgba(250,250,254,0.6)",
      }}>
        <span style={{
          fontWeight: 900,
          fontSize: "15px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "rgba(26,18,48,0.38)",
        }}>
          Junior
        </span>
        <span style={{ fontWeight: 400, fontSize: "13px", color: "rgba(26,18,48,0.28)" }}>
          © 2026 Intersectionnel Films Inc.
        </span>
      </footer>

    </div>
  );
}
