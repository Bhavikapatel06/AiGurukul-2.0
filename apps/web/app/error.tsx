'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('AI Gurukul Sanctum Error:', error);
  }, [error]);

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
          filter: 'drop-shadow(0 0 20px rgba(239, 68, 68, 0.4))',
        }}
      >
        ⚠️
      </div>
      <div
        className="badge"
        style={{
          borderColor: '#ef4444',
          color: '#f87171',
          marginBottom: '1.25rem',
          padding: '0.4rem 1rem',
        }}
      >
        विघ्न • AN UNEXPECTED DISTURBANCE OCCURRED
      </div>
      <h1
        className="gold-gradient-text"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          marginBottom: '1rem',
        }}
      >
        Inner Equanimity in the Face of Error
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
        {error.message ||
          'A computational fluctuation arose in the sacred thread. Recenter your awareness and reset the state.'}
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={() => reset()}
          className="btn-sacred"
          style={{ padding: '0.75rem 2rem', cursor: 'pointer' }}
        >
          🔄 Re-invoke Sanctum
        </button>
        <Link href="/" className="btn-outline-sacred" style={{ padding: '0.75rem 1.75rem' }}>
          🏛️ Return Home
        </Link>
      </div>
    </div>
  );
}
