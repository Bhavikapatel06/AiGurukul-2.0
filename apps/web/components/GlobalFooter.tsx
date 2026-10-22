'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

export function GlobalFooter() {
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim() && emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const closeModal = () => setActiveModal(null);

  return (
    <footer
      style={{
        borderTop: '1px solid rgba(212, 175, 55, 0.22)',
        background: 'linear-gradient(180deg, #13100B 0%, #0A0806 100%)',
        padding: '3.5rem 1.5rem 2rem',
        marginTop: 'auto',
        color: '#EDE8D5',
        fontFamily: 'var(--font-sans, system-ui, -apple-system, sans-serif)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Top Newsletter & Community Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.08) 0%, rgba(20, 16, 11, 0.95) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '14px',
            padding: '1.75rem 2rem',
            marginBottom: '3.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
          }}
        >
          <div style={{ maxWidth: '520px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span style={{ fontSize: '1.3rem' }}>✨</span>
              <h3
                style={{
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: '1.25rem',
                  color: '#F2D675',
                  margin: 0,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                }}
              >
                Join the AI Gurukul Community
              </h3>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: '#B5AC94', lineHeight: 1.5 }}>
              Get a weekly verse, practical meditation tips, and simple Ayurvedic wellness guidance delivered directly to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: '100%',
              maxWidth: '460px',
            }}
          >
            {subscribed ? (
              <div
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#86EFAC',
                  padding: '0.65rem 1.25rem',
                  borderRadius: '8px',
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                🙏 Welcome! You are now subscribed to weekly wisdom.
              </div>
            ) : (
              <>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  style={{
                    flex: '1 1 220px',
                    padding: '0.75rem 1rem',
                    background: 'rgba(10, 8, 6, 0.8)',
                    border: '1px solid rgba(212, 175, 55, 0.35)',
                    borderRadius: '8px',
                    color: '#EDE8D5',
                    fontSize: '0.88rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#F2D675')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 55, 0.35)')}
                />
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #F2D675 0%, #D4AF37 100%)',
                    color: '#0D0B08',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.25rem',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.25)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-1px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  Subscribe Free
                </button>
              </>
            )}
          </form>
        </div>

        {/* Quick Platform Numbers Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '3rem',
            padding: '1rem 0',
            borderTop: '1px solid rgba(212, 175, 55, 0.12)',
            borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F2D675' }}>4 Classical Texts</div>
            <div style={{ fontSize: '0.8rem', color: '#8F856F' }}>Gita, Yoga Sutras, Charaka, Chanakya</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F2D675' }}>3 Body Types (Doshas)</div>
            <div style={{ fontSize: '0.8rem', color: '#8F856F' }}>Personalized Vata, Pitta, Kapha Care</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F2D675' }}>20 Interactive Levels</div>
            <div style={{ fontSize: '0.8rem', color: '#8F856F' }}>Ramayana, Mahabharata &amp; Wisdom Sagas</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#F2D675' }}>100% Free &amp; Open</div>
            <div style={{ fontSize: '0.8rem', color: '#8F856F' }}>Preserving ancient heritage for all</div>
          </div>
        </div>

        {/* Main 5-Column Navigation Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Column 1: Brand & About */}
          <div style={{ minWidth: '220px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '1rem',
              }}
            >
              <span style={{ fontSize: '1.75rem' }}>🪷</span>
              <span
                style={{
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: '1.35rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: '#F2D675',
                }}
              >
                AI GURUKUL
              </span>
            </div>

            <p
              style={{
                color: '#9E947D',
                fontSize: '0.88rem',
                lineHeight: 1.6,
                marginBottom: '1.25rem',
              }}
            >
              An open digital platform connecting 5,000 years of classical Indian philosophy, holistic Ayurvedic wellness, and epic stories with everyday modern life.
            </p>

            <div
              style={{
                background: 'rgba(212, 175, 55, 0.05)',
                borderLeft: '3px solid #D4AF37',
                padding: '0.5rem 0.75rem',
                borderRadius: '0 6px 6px 0',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif, serif)',
                  fontSize: '0.85rem',
                  color: '#F2D675',
                  fontStyle: 'italic',
                }}
              >
                &ldquo;सत्यं वद • धर्मं चर&rdquo;
              </div>
              <div style={{ fontSize: '0.75rem', color: '#8F856F', marginTop: '0.2rem' }}>
                Speak the truth • Walk in virtue
              </div>
            </div>

            {/* Live Operational Status */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.35rem 0.65rem',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '999px',
                  fontSize: '0.74rem',
                  color: '#86EFAC',
                  fontWeight: 500,
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: '#22C55E',
                    boxShadow: '0 0 6px #22C55E',
                  }}
                />
                All Services Operational
              </div>
            </div>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                title="GitHub"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4AF37';
                  e.currentTarget.style.color = '#0D0B08';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                title="YouTube"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4AF37';
                  e.currentTarget.style.color = '#0D0B08';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                title="X / Twitter"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4AF37';
                  e.currentTarget.style.color = '#0D0B08';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                title="Discord Community"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D4AF37',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#D4AF37';
                  e.currentTarget.style.color = '#0D0B08';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                  e.currentTarget.style.color = '#D4AF37';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore Features */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1rem',
                color: '#F2D675',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '0.5rem',
              }}
            >
              Explore Features
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <li>
                <Link
                  href="/wisdom"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>💬</span> AI Wisdom Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/concepts"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>📖</span> Scripture Library
                </Link>
              </li>
              <li>
                <Link
                  href="/ayurveda"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>🌿</span> Ayurveda &amp; Body Types
                </Link>
              </li>
              <li>
                <Link
                  href="/graph"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>🕸️</span> Interactive Knowledge Map
                </Link>
              </li>
              <li>
                <Link
                  href="/gamification"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>🏆</span> Story Puzzles (20 Levels)
                </Link>
              </li>
              <li>
                <Link
                  href="/quizzes"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>🎯</span> Daily Wisdom Quizzes
                </Link>
              </li>
              <li>
                <Link
                  href="/languages"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>🪶</span> Sanskrit Translator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sacred Scriptures */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1rem',
                color: '#F2D675',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '0.5rem',
              }}
            >
              Sacred Scriptures
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <li>
                <Link
                  href="/concepts"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span style={{ fontWeight: 600, color: '#EDE8D5' }}>⚔️ Bhagavad Gita</span>
                  <span style={{ fontSize: '0.74rem', color: '#8F856F' }}>Duty, mind focus &amp; inner peace</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/concepts"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span style={{ fontWeight: 600, color: '#EDE8D5' }}>🧘 Patanjali Yoga Sutras</span>
                  <span style={{ fontSize: '0.74rem', color: '#8F856F' }}>Meditation &amp; calming thoughts</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/ayurveda"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span style={{ fontWeight: 600, color: '#EDE8D5' }}>🌿 Charaka Samhita</span>
                  <span style={{ fontSize: '0.74rem', color: '#8F856F' }}>Natural health, herbs &amp; nutrition</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/concepts"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span style={{ fontWeight: 600, color: '#EDE8D5' }}>📜 Chanakya Neeti</span>
                  <span style={{ fontSize: '0.74rem', color: '#8F856F' }}>Practical ethics &amp; leadership</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/gamification"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span style={{ fontWeight: 600, color: '#EDE8D5' }}>🏹 Ramayana &amp; Epics</span>
                  <span style={{ fontSize: '0.74rem', color: '#8F856F' }}>Right action &amp; virtuous character</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: About & Help */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1rem',
                color: '#F2D675',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '0.5rem',
              }}
            >
              About &amp; Help
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}
            >
              <li>
                <button
                  onClick={() => setActiveModal('about')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>📜</span> About AI Gurukul
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('howItWorks')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>💡</span> How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('faq')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>❓</span> Frequently Asked Questions
                </button>
              </li>
              <li>
                <Link
                  href="/documents"
                  style={{
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>📚</span> Verified Source Texts
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setActiveModal('contact')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    fontSize: '0.86rem',
                    color: '#B5AC94',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#F2D675')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#B5AC94')}
                >
                  <span>📬</span> Contact &amp; Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Account & Community */}
          <div style={{ minWidth: '220px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-serif, serif)',
                fontSize: '1rem',
                color: '#F2D675',
                letterSpacing: '0.04em',
                marginBottom: '1rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
                paddingBottom: '0.5rem',
              }}
            >
              Your Account
            </h4>

            {mounted && user ? (
              <div
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  borderRadius: '10px',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #F2D675 0%, #D4AF37 100%)',
                      color: '#0A0806',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                    }}
                  >
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F2D675', truncate: 'ellipsis' }}>
                      {user.displayName || user.email.split('@')[0]}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#8F856F' }}>Learner Account</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.76rem', color: '#B5AC94', wordBreak: 'break-all' }}>
                  {user.email}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginTop: '0.25rem' }}>
                  <Link
                    href="/gamification"
                    style={{
                      background: 'linear-gradient(135deg, #F2D675 0%, #D4AF37 100%)',
                      color: '#0D0B08',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      textAlign: 'center',
                      textDecoration: 'none',
                    }}
                  >
                    🏆 Continue Playing Sagas
                  </Link>
                  <button
                    onClick={() => logout()}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#F87171',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      padding: '0.45rem 0.75rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '10px',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                }}
              >
                <div style={{ fontSize: '0.85rem', color: '#B5AC94', lineHeight: 1.45 }}>
                  Create a free account to save your game level progress and track health results.
                </div>

                <Link
                  href="/register"
                  style={{
                    background: 'linear-gradient(135deg, #F2D675 0%, #D4AF37 100%)',
                    color: '#0D0B08',
                    padding: '0.65rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(212, 175, 55, 0.25)',
                  }}
                >
                  ✨ Create Free Account
                </Link>

                <Link
                  href="/login"
                  style={{
                    background: 'rgba(212, 175, 55, 0.08)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: '#F2D675',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                  }}
                >
                  🔑 Sign In
                </Link>

                <div style={{ fontSize: '0.74rem', color: '#736B59', textAlign: 'center' }}>
                  ✓ Always free • No payment required
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Shanti Bar & Legal Links */}
        <div
          style={{
            borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem',
            textAlign: 'center',
          }}
        >
          {/* Universal Peace Prayer */}
          <div
            style={{
              fontFamily: 'var(--font-serif, serif)',
              fontSize: '0.98rem',
              color: '#F2D675',
              letterSpacing: '0.04em',
            }}
          >
            ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्माऽमृतं गमय ॥ ॐ शान्तिः शान्तिः शान्तिः ॥
          </div>
          <div style={{ fontSize: '0.82rem', color: '#9E947D', maxWidth: '640px', fontStyle: 'italic' }}>
            &ldquo;Lead us from the unreal to the real, from darkness to light, from mortality to immortality.&rdquo;
          </div>

          {/* Real Website Copyright and Actionable Legal Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
              fontSize: '0.78rem',
              color: '#8F856F',
              marginTop: '0.5rem',
            }}
          >
            <span>© {new Date().getFullYear()} AI Gurukul Technologies. All rights reserved.</span>
            <span>•</span>
            <button
              onClick={() => setActiveModal('privacy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#B5AC94',
                cursor: 'pointer',
                fontSize: '0.78rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('terms')}
              style={{
                background: 'none',
                border: 'none',
                color: '#B5AC94',
                cursor: 'pointer',
                fontSize: '0.78rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => setActiveModal('contact')}
              style={{
                background: 'none',
                border: 'none',
                color: '#B5AC94',
                cursor: 'pointer',
                fontSize: '0.78rem',
                padding: 0,
                textDecoration: 'underline',
              }}
            >
              Support
            </button>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
              <span>Made with reverence in India</span>
              <svg width="18" height="12" viewBox="0 0 900 600" style={{ borderRadius: '2px', display: 'inline-block', verticalAlign: 'middle', border: '1px solid rgba(255,255,255,0.2)' }}>
                <rect width="900" height="600" fill="#138808" />
                <rect width="900" height="400" fill="#FFFFFF" />
                <rect width="900" height="200" fill="#FF9933" />
                <circle cx="450" cy="300" r="80" fill="none" stroke="#000080" strokeWidth="16" />
                <circle cx="450" cy="300" r="16" fill="#000080" />
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Information Modals */}
      {activeModal && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(5px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#14100B',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '2rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
              color: '#EDE8D5',
              maxHeight: '85vh',
              overflowY: 'auto',
            }}
          >
            {activeModal === 'about' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', color: '#F2D675', margin: '0 0 1rem 0' }}>
                  About AI Gurukul
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  AI Gurukul is a non-profit educational and wellness platform created to bring the profound wisdom of classical Indian scriptures into today’s fast-paced world.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  We combine verified Sanskrit scriptures—such as the Bhagavad Gita, Patanjali Yoga Sutras, and Charaka Samhita—with modern interactive tools like AI guides, personalized Ayurveda body evaluations, and story-driven saga puzzles.
                </p>
                <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '8px', fontSize: '0.84rem', color: '#D4AF37' }}>
                  🎯 <strong>Our Mission:</strong> To make authentic ancient wisdom simple, practical, and accessible to learners everywhere for free.
                </div>
              </div>
            )}

            {activeModal === 'howItWorks' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', color: '#F2D675', margin: '0 0 1rem 0' }}>
                  How AI Gurukul Works
                </h3>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: '#B5AC94', lineHeight: 1.7 }}>
                  <li><strong>💬 Wisdom Guide:</strong> Ask life or philosophical questions. The system references authentic verses to provide meaningful guidance.</li>
                  <li><strong>🌿 Ayurveda Wellness:</strong> Answer simple questions about your lifestyle to discover your primary Dosha (Vata, Pitta, or Kapha) and tailored dietary tips.</li>
                  <li><strong>🏆 Saga Puzzles:</strong> Solve authentic jigsaw scenes from the Ramayana, Mahabharata, and Vedic lore with isolated tracking per logged-in account.</li>
                  <li><strong>🕸️ Knowledge Map:</strong> Visually navigate connections between philosophy, teachers, and ancient teachings.</li>
                </ul>
              </div>
            )}

            {activeModal === 'faq' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', color: '#F2D675', margin: '0 0 1rem 0' }}>
                  Frequently Asked Questions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
                  <div>
                    <strong style={{ color: '#F2D675' }}>Q: Is AI Gurukul completely free to use?</strong>
                    <p style={{ margin: '0.25rem 0 0', color: '#B5AC94' }}>Yes! All features, games, and scripture libraries are 100% free with no hidden charges or subscriptions.</p>
                  </div>
                  <div>
                    <strong style={{ color: '#F2D675' }}>Q: Are the scriptures authentic?</strong>
                    <p style={{ margin: '0.25rem 0 0', color: '#B5AC94' }}>Yes. All verses and translations in our library are sourced directly from canonical Sanskrit works and verified classical commentaries.</p>
                  </div>
                  <div>
                    <strong style={{ color: '#F2D675' }}>Q: Do I need an account to play?</strong>
                    <p style={{ margin: '0.25rem 0 0', color: '#B5AC94' }}>You can explore features as a guest, but creating a quick account saves your solved game levels, quiz high scores, and personalized Ayurveda profile.</p>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', color: '#F2D675', margin: '0 0 1rem 0' }}>
                  Contact &amp; Feedback
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  We welcome suggestions, scripture corrections, and feedback from students, educators, and scholars.
                </p>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                  <div style={{ padding: '0.75rem', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '8px' }}>
                    <strong style={{ color: '#F2D675' }}>📧 Email:</strong>{' '}
                    <span style={{ color: '#EDE8D5' }}>contact@aigurukul.org</span>
                  </div>
                  <div style={{ padding: '0.75rem', background: 'rgba(212, 175, 55, 0.08)', borderRadius: '8px' }}>
                    <strong style={{ color: '#F2D675' }}>📍 Location:</strong>{' '}
                    <span style={{ color: '#EDE8D5' }}>Vedic Research &amp; Heritage Initiative, India</span>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', color: '#F2D675', margin: '0 0 1rem 0' }}>
                  Privacy Policy
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  AI Gurukul respects your personal privacy. We do not sell, rent, or share personal learner data with any third parties.
                </p>
                <p style={{ fontSize: '0.88rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  Account details (name and email) are solely used to save your puzzle level progression, quiz scores, and dosha evaluations securely.
                </p>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif, serif)', color: '#F2D675', margin: '0 0 1rem 0' }}>
                  Terms of Service
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  All scripture content and educational material provided on AI Gurukul is for personal spiritual, cultural, and educational enrichment.
                </p>
                <p style={{ fontSize: '0.88rem', color: '#B5AC94', lineHeight: 1.6 }}>
                  Ayurvedic recommendations and lifestyle advice are for general wellness only and are not a substitute for professional medical diagnosis or clinical healthcare.
                </p>
              </div>
            )}

            <button
              onClick={closeModal}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                background: 'linear-gradient(135deg, #F2D675 0%, #D4AF37 100%)',
                color: '#0D0B08',
                border: 'none',
                borderRadius: '8px',
                padding: '0.65rem',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
