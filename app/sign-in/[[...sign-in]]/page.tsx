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
    <span
      style={{
        color: "var(--red)",
        display: "inline-block",
        minWidth: "clamp(160px, 22vw, 280px)",
        transition: "opacity 0.28s ease, transform 0.28s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-8px)",
      }}
    >
      {FLIP_WORDS[index]}.
    </span>
  );
}

export default function SignInPage() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --parchment: #F0EBE0;
          --red: #E8392A;
          --red-hover: #C9301E;
          --ink: #1A1A1A;
          --white: #FFFFFF;
          --shadow: 4px 4px 0px #1A1A1A;
          --shadow-hover: 6px 6px 0px #1A1A1A;
        }
        .auth-page {
          font-family: 'Barlow', sans-serif;
          background: var(--parchment);
          color: var(--ink);
          overflow-x: hidden;
        }
        .auth-nav {
          background: var(--parchment);
          border-bottom: 1.5px solid var(--ink);
          padding: 0 7vw;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .nav-wordmark {
          font-weight: 900;
          font-size: 18px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ink);
          text-decoration: none;
        }
        .nav-action {
          font-family: 'Barlow', sans-serif;
          font-size: 14px;
          color: var(--ink);
        }
        .nav-action a {
          font-weight: 900;
          color: var(--red);
          text-decoration: none;
          margin-left: 4px;
        }
        .nav-action a:hover { text-decoration: underline; }
        .auth-hero {
          background: var(--parchment);
          padding: 80px 7vw 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .hero-eyebrow {
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: var(--red);
          margin-bottom: 24px;
        }
        .hero-headline {
          font-weight: 900;
          font-size: clamp(32px, 5vw, 72px);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.06;
          color: var(--ink);
          margin-bottom: 20px;
          max-width: 860px;
        }
        .hero-sub {
          font-weight: 400;
          font-size: 18px;
          line-height: 1.65;
          color: var(--ink);
          opacity: 0.7;
          margin-bottom: 16px;
          max-width: 540px;
        }
        .hero-cta-label {
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--ink);
          opacity: 0.5;
          margin-bottom: 40px;
        }
        .clerk-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .auth-features {
          background: var(--red);
          padding: 80px 7vw 60px;
        }
        .section-label {
          font-weight: 900;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin-bottom: 16px;
          display: block;
        }
        .label-on-red { color: rgba(255,255,255,0.5); }
        .label-on-dark { color: rgba(240,235,224,0.4); }
        .section-title {
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.1;
        }
        .title-on-dark { color: var(--parchment); }
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 52px;
        }
        .feature-card {
          background: var(--parchment);
          border: 2.5px solid var(--ink);
          padding: 44px 36px;
          box-shadow: var(--shadow);
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: box-shadow 150ms ease, transform 150ms ease;
        }
        .feature-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
        }
        .card-icon { font-size: 28px; color: var(--red); }
        .card-headline {
          font-weight: 900;
          font-size: clamp(19px, 1.8vw, 24px);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          line-height: 1.12;
          color: var(--ink);
        }
        .card-body {
          font-weight: 400;
          font-size: 15px;
          line-height: 1.7;
          color: var(--ink);
          opacity: 0.68;
          flex: 1;
        }
        .auth-founders {
          background: var(--ink);
          padding: 80px 7vw;
        }
        .founders-intro {
          max-width: 700px;
          margin-bottom: 64px;
        }
        .founders-section-headline {
          font-size: clamp(28px, 3.5vw, 50px);
          margin-bottom: 24px;
        }
        .founders-body-text {
          font-weight: 400;
          font-size: 17px;
          line-height: 1.7;
          color: var(--parchment);
          opacity: 0.58;
        }
        .founders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
        }
        .founder-card {
          display: flex;
          gap: 28px;
          align-items: center;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          padding: 44px 40px;
          transition: background 150ms ease;
        }
        .founder-card:hover { background: rgba(255,255,255,0.07); }
        .founder-photo {
          width: 130px;
          flex-shrink: 0;
          aspect-ratio: 3/4;
          overflow: hidden;
          border: 1.5px solid rgba(255,255,255,0.12);
          background: #333;
        }
        .founder-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%);
          display: block;
        }
        .founder-info { display: flex; flex-direction: column; gap: 8px; }
        .founder-role {
          font-weight: 900;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: var(--red);
        }
        .founder-name-display {
          font-weight: 900;
          font-size: 22px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--parchment);
          line-height: 1.1;
        }
        .founder-bio {
          font-weight: 400;
          font-size: 14px;
          line-height: 1.65;
          color: var(--parchment);
          opacity: 0.52;
          margin-top: 4px;
        }
        .auth-closing {
          background: var(--red);
          padding: 90px 7vw;
          text-align: center;
        }
        .closing-headline {
          font-size: clamp(28px, 3.8vw, 58px);
          color: var(--white);
          margin-bottom: 16px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .closing-sub {
          font-weight: 600;
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          margin-bottom: 48px;
        }
        .btn-white {
          font-family: 'Barlow', sans-serif;
          font-weight: 900;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          text-decoration: none;
          display: inline-block;
          cursor: pointer;
          border: 2px solid var(--ink);
          background: var(--white);
          color: var(--ink);
          padding: 15px 36px;
          box-shadow: var(--shadow);
          transition: all 150ms ease;
        }
        .btn-white:hover {
          background: var(--parchment);
          box-shadow: var(--shadow-hover);
          transform: translateY(-2px);
        }
        .auth-footer {
          background: var(--ink);
          padding: 32px 7vw;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .footer-copy {
          font-weight: 400;
          font-size: 13px;
          color: var(--parchment);
          opacity: 0.3;
        }
        .footer-wordmark {
          font-weight: 900;
          font-size: 15px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--parchment);
          opacity: 0.7;
        }
        @media (max-width: 1024px) {
          .cards-grid { grid-template-columns: 1fr; }
          .founders-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 768px) {
          .auth-nav, .auth-hero, .auth-features, .auth-founders, .auth-closing { padding-left: 5vw; padding-right: 5vw; }
          .auth-footer { padding: 28px 5vw; flex-direction: column; align-items: flex-start; gap: 16px; }
          .founder-card { flex-direction: column; }
        }
      `}</style>

      <div className="auth-page">

        <nav className="auth-nav">
          <Link href="/" className="nav-wordmark">Junior</Link>
          <span className="nav-action">
            Don&apos;t have an account?
            <Link href="/sign-up">Sign up</Link>
          </span>
        </nav>

        <section className="auth-hero">
          <p className="hero-eyebrow">Open Beta — Free to Try</p>
          <h1 className="hero-headline">
            Let Junior handle the <FlipWord /><br />
            parts of producing.
          </h1>
          <p className="hero-sub">
            So you can get back to what really matters — making your film.
          </p>
          <p className="hero-cta-label">Welcome back. Pick up where you left off.</p>
          <div className="clerk-wrap">
            <SignIn />
          </div>
        </section>

        <section className="auth-features">
          <span className="section-label label-on-red">How Junior Helps</span>
          <div className="cards-grid">
            <div className="feature-card">
              <div className="card-icon">$</div>
              <h3 className="card-headline">Get Funding</h3>
              <p className="card-body">Junior navigates complicated program guidelines for you and gets you answers instantly.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">📅</div>
              <h3 className="card-headline">Track Deadlines</h3>
              <p className="card-body">Junior syncs program deadlines to your calendar and sends you reminders to apply.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">⚙️</div>
              <h3 className="card-headline">Automate Admin</h3>
              <p className="card-body">Junior automates admin to increase your profit margins on fixed line items.</p>
            </div>
          </div>
        </section>

        <section className="auth-founders">
          <div className="founders-intro">
            <span className="section-label label-on-dark">The Founders</span>
            <h2 className="section-title title-on-dark founders-section-headline">
              Built by Canadian Filmmakers, for Canadian Filmmakers.
            </h2>
            <p className="founders-body-text">
              Junior started as an in-house tool for automating admin to keep the lights on with no staff and no budgets between productions.
            </p>
          </div>
          <div className="founders-grid">
            <div className="founder-card">
              <div className="founder-photo">
                <img src="/images/gavin.png" alt="Gavin Seal" />
              </div>
              <div className="founder-info">
                <span className="founder-role">Co-Founder</span>
                <div className="founder-name-display">Gavin Seal</div>
                <p className="founder-bio">Writers Guild of Canada prize-winning filmmaker who has led in-house creative teams at Mattel and Shopify.</p>
              </div>
            </div>
            <div className="founder-card">
              <div className="founder-photo">
                <img src="/images/lisa.png" alt="Lisa Purisima" />
              </div>
              <div className="founder-info">
                <span className="founder-role">Co-Founder</span>
                <div className="founder-name-display">Lisa Purisima</div>
                <p className="founder-bio">Canadian Screen Award-nominated producer whose credits include John Wick 4 (Lionsgate) and The Morning Show (Apple TV+).</p>
              </div>
            </div>
          </div>
        </section>

        <section className="auth-closing">
          <h2 className="section-title closing-headline">
            The Cavalry&rsquo;s Not Coming. But Junior Is.
          </h2>
          <p className="closing-sub">Early access. Limited spots.</p>
          
            href="#"
            className="btn-white"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            Try the Beta — It&rsquo;s Free ↑
          </a>
        </section>

        <footer className="auth-footer">
          <span className="footer-wordmark">Junior</span>
          <span className="footer-copy">© 2026 Intersectionnel Films Inc.</span>
        </footer>

      </div>
    </>
  );
}
