'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export function GlobalNavbar() {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/concepts', label: 'Library', icon: '📖', color: '#fbbf24' },
    { href: '/wisdom', label: 'Wisdom', icon: '💬', color: '#c4b5fd' },
    { href: '/ayurveda', label: 'Ayurveda', icon: '🌿', color: '#5eead4' },
    { href: '/graph', label: 'Graph', icon: '🕸️', color: '#fde047' },
    { href: '/quizzes', label: 'Quizzes', icon: '🎯', color: '#fdba74' },
    { href: '/gamification', label: 'Games', icon: '🏆', color: '#fbbf24' },
    { href: '/languages', label: 'Translate', icon: '🪶', color: '#38bdf8' },
    { href: '/documents', label: 'RAG', icon: '📜', color: '#a78bfa' },
  ];

  return (
    <header
      style={{
        borderBottom: '1px solid rgba(212, 175, 55, 0.22)',
        background: 'rgba(13, 11, 8, 0.94)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 4px 28px rgba(0, 0, 0, 0.75), 0 1px 0 rgba(212, 175, 55, 0.15)',
      }}
    >
      {/* Top Sacred Gold Accent Beam */}
      <div
        style={{
          height: '2px',
          width: '100%',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212, 175, 55, 0.3) 15%, #F2D675 50%, rgba(212, 175, 55, 0.3) 85%, transparent 100%)',
          opacity: 0.85,
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: '3.6rem',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 1.25rem',
          gap: '0.75rem',
          width: '100%',
        }}
      >
        {/* Brand Logo (Left) */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'transform 0.2s ease',
          }}
          aria-label="AI Gurukul 2.0 Home"
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <span
            style={{
              fontSize: '1.65rem',
              filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.5))',
              display: 'inline-block',
              transition: 'transform 0.3s ease',
            }}
          >
            🪷
          </span>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.18rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                lineHeight: 1.1,
              }}
              className="gold-gradient-text"
            >
              AI GURUKUL
            </span>
            <span
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.14em',
                color: '#b8ae96',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Vedic Intelligence 2.0
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links (Centered) */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            flex: '1 1 auto',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            padding: '0.2rem 0',
          }}
          className="desktop-nav"
          aria-label="Primary Navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--gold-radiance)' : '#EDE8D5',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.18) 0%, rgba(212, 175, 55, 0.08) 100%)'
                    : 'transparent',
                  border: isActive
                    ? '1px solid rgba(242, 214, 117, 0.45)'
                    : '1px solid transparent',
                  boxShadow: isActive ? '0 2px 10px rgba(212, 175, 55, 0.2)' : 'none',
                  padding: '0.35rem 0.65rem',
                  borderRadius: '7px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  position: 'relative',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.color = 'var(--gold-radiance)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.25)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#EDE8D5';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{link.icon}</span>
                <span>{link.label}</span>
                {isActive && (
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--gold-radiance)',
                      boxShadow: '0 0 6px var(--gold-radiance)',
                      marginLeft: '0.1rem',
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Side User / Auth Profile Widget (Right-aligned) */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.6rem', flexShrink: 0 }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.25rem 0.55rem',
                  borderRadius: '7px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background:
                      'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(13, 11, 8, 0.9) 100%)',
                    border: '1px solid var(--gold-sacred)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                  }}
                >
                  🪷
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span
                    title={user.displayName || user.email}
                    style={{
                      fontWeight: 600,
                      fontSize: '0.8rem',
                      color: 'var(--text-vellum)',
                      maxWidth: '120px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {user.displayName || user.email?.split('@')[0] || 'Seeker'}
                  </span>
                  <span
                    style={{
                      fontSize: '0.62rem',
                      color: 'var(--gold-radiance)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      fontWeight: 600,
                    }}
                  >
                    {user.role || 'learner'}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                className="btn-outline-sacred"
                style={{
                  padding: '0.32rem 0.7rem',
                  fontSize: '0.78rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link
                href="/login"
                className="btn-outline-sacred"
                style={{
                  padding: '0.35rem 0.8rem',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn-sacred"
                style={{
                  padding: '0.35rem 0.85rem',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Enroll
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            style={{
              background: mobileMenuOpen ? 'rgba(212, 175, 55, 0.2)' : 'rgba(212, 175, 55, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.4)',
              color: 'var(--gold-radiance)',
              padding: '0.35rem 0.7rem',
              borderRadius: '7px',
              cursor: 'pointer',
              display: 'none',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.88rem',
              fontWeight: 700,
              minHeight: '34px',
              transition: 'all 0.2s ease',
            }}
            className="mobile-menu-toggle"
          >
            <span>{mobileMenuOpen ? '✕' : '☰'}</span>
            <span style={{ fontSize: '0.78rem' }}>Menu</span>
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Drawer Overlay with Backdrop Blur */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          style={{
            position: 'fixed',
            inset: 0,
            top: '3.6rem',
            background: 'rgba(10, 8, 6, 0.95)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '1.25rem 1.5rem 3.5rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid rgba(212, 175, 55, 0.18)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem' }}>☸</span>
              <span
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.95rem',
                  color: 'var(--gold-radiance)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Sacred Sanctum Navigation
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              style={{
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '6px',
                color: 'var(--gold-radiance)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                padding: '0.35rem 0.65rem',
                fontWeight: 600,
              }}
            >
              ✕ Close
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.6rem' }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.95rem',
                    padding: '0.85rem 1.15rem',
                    borderRadius: '10px',
                    color: isActive ? 'var(--gold-radiance)' : '#EDE8D5',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(212, 175, 55, 0.08) 100%)'
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isActive
                      ? '1px solid rgba(242, 214, 117, 0.5)'
                      : '1px solid rgba(212, 175, 55, 0.12)',
                    textDecoration: 'none',
                    fontSize: '1.02rem',
                    fontWeight: isActive ? 700 : 500,
                    minHeight: '52px',
                    boxShadow: isActive ? '0 4px 16px rgba(212, 175, 55, 0.2)' : 'none',
                  }}
                >
                  <span style={{ fontSize: '1.35rem' }}>{link.icon}</span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span>{link.label}</span>
                  </div>
                  {isActive && (
                    <span
                      style={{
                        marginLeft: 'auto',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--gold-radiance)',
                        background: 'rgba(212, 175, 55, 0.2)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '9999px',
                      }}
                    >
                      Active
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div
            style={{
              marginTop: '1.75rem',
              paddingTop: '1.25rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.18)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
            }}
          >
            <div
              style={{
                fontSize: '0.75rem',
                color: '#b8ae96',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}
            >
              Seeker Identity
            </div>

            {user ? (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.2)',
                      border: '1px solid var(--gold-sacred)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    🪷
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-vellum)' }}>
                      {user.displayName || user.email?.split('@')[0] || 'Seeker'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--gold-radiance)', textTransform: 'uppercase' }}>
                      {user.role || 'learner'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-outline-sacred"
                  style={{
                    padding: '0.4rem 0.85rem',
                    fontSize: '0.82rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-outline-sacred"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-sacred"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '0.65rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Enroll
                </Link>
              </div>
            )}

            <div
              style={{
                fontSize: '0.75rem',
                color: '#b8ae96',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 600,
                marginTop: '0.5rem',
              }}
            >
              Sanctum Shortcuts
            </div>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#EDE8D5',
                fontSize: '0.95rem',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                padding: '0.65rem 1rem',
                borderRadius: '8px',
                background: 'rgba(212, 175, 55, 0.05)',
                border: '1px solid rgba(212, 175, 55, 0.15)',
              }}
            >
              <span>🏛️</span>
              <span>Sanctum Home Overview</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

