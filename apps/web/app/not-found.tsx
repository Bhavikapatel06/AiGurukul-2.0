import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3rem 1.5rem',
      }}
    >
      <div
        style={{
          fontSize: '4.5rem',
          marginBottom: '1rem',
          filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.4))',
        }}
      >
        🕉️
      </div>
      <div
        className="badge"
        style={{
          borderColor: 'var(--gold-sacred)',
          color: 'var(--gold-radiance)',
          marginBottom: '1.25rem',
          padding: '0.4rem 1rem',
        }}
      >
        ४०४ • अप्रतिष्ठित • 404 NOT FOUND
      </div>
      <h1
        className="gold-gradient-text"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          marginBottom: '1rem',
        }}
      >
        Path Not Discovered in the Shastras
      </h1>
      <p
        style={{
          color: 'var(--text-dust)',
          maxWidth: '540px',
          lineHeight: 1.6,
          marginBottom: '2rem',
          fontSize: '1.05rem',
        }}
      >
        The sacred manuscript or sanctum you seek does not exist or has dissolved into the unmanifest.
        Return to the Gurukul threshold to resume your contemplation.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/" className="btn-sacred" style={{ padding: '0.75rem 2rem' }}>
          🏛️ Return to Gurukul Sanctuary
        </Link>
        <Link href="/wisdom" className="btn-outline-sacred" style={{ padding: '0.75rem 1.75rem' }}>
          💬 Consult Personas
        </Link>
      </div>
    </div>
  );
}
