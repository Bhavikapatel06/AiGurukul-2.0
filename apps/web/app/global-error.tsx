'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#0D0B08',
          color: '#F4E8D1',
          fontFamily: 'system-ui, sans-serif',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🕉️</div>
        <h1 style={{ color: '#D4AF37', margin: '0 0 1rem' }}>AI Gurukul Global Boundary</h1>
        <p style={{ color: '#A39987', maxWidth: '500px', lineHeight: 1.6, marginBottom: '2rem' }}>
          {error.message || 'An unhandled exception occurred in the root layout.'}
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
            color: '#0D0B08',
            fontWeight: 700,
            border: 'none',
            padding: '0.85rem 2rem',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Reset Application
        </button>
      </body>
    </html>
  );
}
