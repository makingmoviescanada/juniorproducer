'use client';

import { useState } from 'react';

export default function ClosingCTA() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log('Email submitted:', email);
  };

  return (
    <div style={{ backgroundColor: '#E8392A', width: '100%', padding: '120px 24px' }}>
      <div className="flex flex-col items-center justify-center">
        {/* Headline */}
        <h2
          className="text-center text-white uppercase text-balance"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 900,
            fontSize: '3.5rem',
            lineHeight: '1.2',
          }}
        >
          The Cavalry's Not Coming. But Junior Is.
        </h2>

        {/* Subline */}
        <p
          className="text-center text-white"
          style={{
            fontFamily: 'var(--font-barlow)',
            fontWeight: 400,
            fontSize: '1.5rem',
            marginTop: '24px',
          }}
        >
          Early access. Limited spots.
        </p>

        {/* Email Input + Button */}
        <form onSubmit={handleSubmit} className="flex" style={{ marginTop: '32px' }}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #1A1A1A',
              borderRadius: '4px',
              padding: '14px 20px',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 400,
              fontSize: '16px',
              outline: 'none',
              color: '#1A1A1A',
            }}
            className="placeholder-gray-400"
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#1A1A1A',
              border: '2px solid #1A1A1A',
              borderRadius: '4px',
              padding: '14px 24px',
              color: '#FFFFFF',
              fontFamily: 'var(--font-barlow)',
              fontWeight: 900,
              fontSize: '16px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              marginLeft: '0',
            }}
          >
            Get Early Access
          </button>
        </form>
      </div>
    </div>
  );
}
