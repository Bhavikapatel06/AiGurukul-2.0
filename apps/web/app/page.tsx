'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'wisdom' | 'health' | 'learning'>('all');

  const pillars = [
    {
      id: 'wisdom',
      category: 'wisdom',
      title: 'Wisdom Dialogue',
      sanskrit: 'संवाद • Samvada',
      badge: 'SSE Streaming',
      badgeColor: '#7B68EE',
      icon: '💬',
      desc: 'Real-time philosophical dialogues with 5 revered Vedic personas grounded in Sanskrit citations.',
      href: '/wisdom',
      actionLabel: 'Enter Sanctum',
    },
    {
      id: 'ayurveda',
      category: 'health',
      title: 'Ayurveda & Dosha Matrix',
      sanskrit: 'द्रव्यगुण • Dravyaguna',
      badge: 'Herbal Guide',
      badgeColor: '#3A9B8C',
      icon: '🌿',
      desc: 'Classical Materia Medica of sacred plants, preparation methods, circadian timings, and dosha balance.',
      href: '/ayurveda',
      actionLabel: 'Explore Herbs',
    },
    {
      id: 'graph',
      category: 'learning',
      title: 'Vedic Knowledge Graph',
      sanskrit: 'ज्ञानजाल • Jnana Jala',
      badge: 'BFS Traversal',
      badgeColor: '#D4AF37',
      icon: '🕸️',
      desc: 'Radial ontology spanning orthodox Darshanas, shastric texts, and sages connected by 56 semantic edges.',
      href: '/graph',
      actionLabel: 'Traverse Graph',
    },
    {
      id: 'documents',
      category: 'learning',
      title: 'Sacred Ingestion & RAG',
      sanskrit: 'शास्त्र संचय • Shastra Sanchaya',
      badge: 'Hybrid Vector Search',
      badgeColor: '#A78BFA',
      icon: '📜',
      desc: 'Classical text ingestion pipeline extracting Sanskrit terms and retrieving context with chapter grounding.',
      href: '/documents',
      actionLabel: 'Open Studio',
    },
    {
      id: 'quizzes',
      category: 'learning',
      title: 'Vedic Quizzes & Discernment',
      sanskrit: 'विवेक परीक्षा • Viveka Pariksha',
      badge: 'Dynamic AI',
      badgeColor: '#F59E0B',
      icon: '🎯',
      desc: 'Multiple-choice scripture assessments with live timers, or AI-synthesized quizzes on any topic.',
      href: '/quizzes',
      actionLabel: 'Take Quiz',
    },
    {
      id: 'gamification',
      category: 'learning',
      title: 'Gamification, Quests & Bazaar',
      sanskrit: 'साधना सिद्धि • Sadhana',
      badge: '3x4 Jigsaw Engine',
      badgeColor: '#EAB308',
      icon: '🏆',
      desc: '5 Seeker tiers from Jijñāsu to Ācārya, daily quests, Sacred Coins, relic bazaar, and 3x4 jigsaw puzzle.',
      href: '/gamification',
      actionLabel: 'Enter Arena',
    },
    {
      id: 'languages',
      category: 'wisdom',
      title: 'Languages & Translation Studio',
      sanskrit: 'भाषा मञ्जरी • Bhasha',
      badge: 'Virtual Keyboards',
      badgeColor: '#38BDF8',
      icon: '🪶',
      desc: 'Cross-lingual translation across 6 sacred tongues with Devanagari & Gujarati virtual keyboards and Dhatu roots.',
      href: '/languages',
      actionLabel: 'Launch Studio',
    },
  ];

  const filteredPillars = pillars.filter((p) => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  const personas = [
    {
      name: 'Lord Krishna',
      sanskritTitle: 'योगेश्वर कृष्ण',
      domain: 'Bhagavad Gita & Dharma',
      color: '#7B68EE',
      desc: 'Transcendental guidance, selfless duty (Nishkama Karma), equanimity (Sthitaprajna), and overcoming existential doubt.',
      href: '/wisdom',
    },
    {
      name: 'Chanakya Pandit',
      sanskritTitle: 'कौटिल्य चाणक्य',
      domain: 'Arthashastra & Neeti',
      color: '#C46B3A',
      desc: 'Strategic leadership, practical ethics (Vinaya), realpolitik, and navigating complex worldly challenges with discipline.',
      href: '/wisdom',
    },
    {
      name: 'Vaidya Charaka',
      sanskritTitle: 'वैद्य चरक',
      domain: 'Ayurveda & Vitality',
      color: '#3A9B8C',
      desc: 'Doshic balance, Dinacharya daily rhythms, Ahara dietetics, and holistic harmony between body, mind, and spirit.',
      href: '/ayurveda',
    },
    {
      name: 'Sage Vyasa',
      sanskritTitle: 'महर्षि वेदव्यास',
      domain: 'Mahabharata & Vedanta',
      color: '#B8860B',
      desc: 'Cosmic karmic causality, moral nuance, multi-generational epic perspective, and synthesis of spiritual paths.',
      href: '/wisdom',
    },
    {
      name: 'Sage Patanjali',
      sanskritTitle: 'महर्षि पतञ्जलि',
      domain: 'Yoga Sutras & Mind',
      color: '#4682B4',
      desc: 'Stilling mental whirlpools (Chitta Vritti Nirodha), eightfold Ashtanga Yoga, and radical discriminative discernment.',
      href: '/wisdom',
    },
  ];

  return (
    <div className="temple-container" style={{ padding: '1.5rem 1rem 3.5rem', maxWidth: '1360px' }}>
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section style={{ textAlign: 'center', marginBottom: '2.5rem', paddingTop: '0.5rem' }}>
        {/* Sacred Badges Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.25rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            className="badge"
            style={{
              borderColor: 'var(--gold-sacred)',
              color: 'var(--gold-radiance)',
              background: 'rgba(212, 175, 55, 0.12)',
              padding: '0.35rem 0.95rem',
              fontWeight: 600,
            }}
          >
            🪷 AI GURUKUL 2.0 • ALL PHASES COMPLETE
          </span>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(94, 234, 212, 0.4)',
              color: '#5eead4',
              background: 'rgba(94, 234, 212, 0.08)',
              padding: '0.35rem 0.85rem',
            }}
          >
            ✓ 204 Unit &amp; Integration Tests
          </span>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              background: 'rgba(56, 189, 248, 0.08)',
              padding: '0.35rem 0.85rem',
            }}
          >
            🪶 6 Languages &amp; Virtual Keyboards
          </span>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(234, 179, 8, 0.4)',
              color: '#eab308',
              background: 'rgba(234, 179, 8, 0.08)',
              padding: '0.35rem 0.85rem',
            }}
          >
            🏆 5 Seeker Tiers &amp; 3x4 Jigsaw
          </span>
        </div>

        {/* Main Title (Matching User Reference Image 2) */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
            fontWeight: 800,
            marginBottom: '1rem',
            letterSpacing: '0.04em',
            lineHeight: 1.15,
            textTransform: 'uppercase',
          }}
          className="gold-gradient-text"
        >
          STUCK IN LIFE?<br />
          ASK 5000 YEARS<br />
          OF WISDOM.
        </h1>

        {/* Subtitle */}
        <div
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.88rem',
            letterSpacing: '0.18em',
            color: 'var(--gold-sacred)',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            fontWeight: 600,
          }}
        >
          ANCIENT KNOWLEDGE · MODERN SOLUTIONS
        </div>

        <p
          style={{
            maxWidth: '720px',
            margin: '0 auto 2rem',
            color: 'var(--text-vellum)',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            opacity: 0.92,
          }}
        >
          Not just learning — <strong style={{ color: 'var(--gold-radiance)' }}>solving real-life problems</strong> using the timeless wisdom of India.
        </p>

        {/* ===================================================================
            CORE NAVIGATION BLOCKS (Matching User Reference Image 2 Bento Grid)
            =================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.25rem',
            maxWidth: '1180px',
            margin: '0 auto 2.5rem',
            textAlign: 'left',
          }}
        >
          {/* Block 1: Learn Concepts */}
          <Link
            href="/concepts"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
            className="temple-card temple-card-interactive"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  className="card-icon-bubble"
                  style={{
                    background: 'rgba(234, 179, 8, 0.12)',
                    borderColor: 'rgba(234, 179, 8, 0.35)',
                  }}
                >
                  📖
                </div>
                <span
                  className="badge"
                  style={{
                    borderColor: 'rgba(234, 179, 8, 0.35)',
                    color: '#eab308',
                    background: 'rgba(234, 179, 8, 0.08)',
                    fontSize: '0.7rem',
                  }}
                >
                  18 Chapters
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-radiance)',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                LEARN CONCEPTS
              </h3>
              <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Explore Gita, Panchatantra, and Ayurveda with stories, shlokas, and practical modern meaning.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="card-action-link" style={{ color: '#eab308' }}>
                <span>Read All 18 Chapters</span>
                <span className="action-arrow">→</span>
              </span>
            </div>
          </Link>

          {/* Block 2: Solve My Problem (CORE FEATURE) */}
          <Link
            href="/wisdom"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
            className="temple-card temple-card-featured temple-card-interactive"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  className="card-icon-bubble"
                  style={{
                    background: 'rgba(196, 181, 253, 0.15)',
                    borderColor: 'rgba(196, 181, 253, 0.45)',
                  }}
                >
                  🧠
                </div>
                <span
                  style={{
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '0.25rem 0.7rem',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.25) 0%, rgba(212, 175, 55, 0.1) 100%)',
                    color: 'var(--gold-radiance)',
                    border: '1px solid rgba(242, 214, 117, 0.5)',
                    boxShadow: '0 2px 10px rgba(212, 175, 55, 0.25)',
                  }}
                >
                  ★ CORE FEATURE
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-radiance)',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                SOLVE MY PROBLEM
              </h3>
              <p style={{ color: 'var(--text-vellum)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Tell us what’s bothering you. Get ancient wisdom + modern action steps from Krishna &amp; Chanakya.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="card-action-link" style={{ color: '#c4b5fd', fontWeight: 700 }}>
                <span>Open Wisdom Sanctum</span>
                <span className="action-arrow">→</span>
              </span>
            </div>
          </Link>

          {/* Block 3: Knowledge Graph */}
          <Link
            href="/graph"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
            className="temple-card temple-card-interactive"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  className="card-icon-bubble"
                  style={{
                    background: 'rgba(253, 224, 71, 0.12)',
                    borderColor: 'rgba(253, 224, 71, 0.35)',
                  }}
                >
                  🌌
                </div>
                <span
                  className="badge"
                  style={{
                    borderColor: 'rgba(253, 224, 71, 0.35)',
                    color: '#fde047',
                    background: 'rgba(253, 224, 71, 0.08)',
                    fontSize: '0.7rem',
                  }}
                >
                  32 Nodes · 56 Edges
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-radiance)',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                KNOWLEDGE GRAPH
              </h3>
              <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Explore an interactive map of India’s knowledge traditions, darshanas, and sages.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="card-action-link" style={{ color: '#fde047' }}>
                <span>Traverse Ontology</span>
                <span className="action-arrow">→</span>
              </span>
            </div>
          </Link>

          {/* Block 4: Manuscript Translator */}
          <Link
            href="/languages"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
            className="temple-card temple-card-interactive"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  className="card-icon-bubble"
                  style={{
                    background: 'rgba(56, 189, 248, 0.12)',
                    borderColor: 'rgba(56, 189, 248, 0.35)',
                  }}
                >
                  📜
                </div>
                <span
                  className="badge"
                  style={{
                    borderColor: 'rgba(56, 189, 248, 0.35)',
                    color: '#38bdf8',
                    background: 'rgba(56, 189, 248, 0.08)',
                    fontSize: '0.7rem',
                  }}
                >
                  6 Languages
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-radiance)',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                MANUSCRIPT TRANSLATOR
              </h3>
              <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Translate and analyze ancient manuscripts into modern understandable language with on-screen keyboards.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="card-action-link" style={{ color: '#38bdf8' }}>
                <span>Launch Translation Studio</span>
                <span className="action-arrow">→</span>
              </span>
            </div>
          </Link>

          {/* Block 5: Quiz Generator */}
          <Link
            href="/quizzes"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
            className="temple-card temple-card-interactive"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  className="card-icon-bubble"
                  style={{
                    background: 'rgba(253, 186, 116, 0.12)',
                    borderColor: 'rgba(253, 186, 116, 0.35)',
                  }}
                >
                  📝
                </div>
                <span
                  className="badge"
                  style={{
                    borderColor: 'rgba(253, 186, 116, 0.35)',
                    color: '#fdba74',
                    background: 'rgba(253, 186, 116, 0.08)',
                    fontSize: '0.7rem',
                  }}
                >
                  AI Dynamic
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-radiance)',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                QUIZ GENERATOR
              </h3>
              <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Upload a file or enter a topic to generate an interactive MCQ quiz powered by AI &amp; RAG.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="card-action-link" style={{ color: '#fdba74' }}>
                <span>Test Your Discernment</span>
                <span className="action-arrow">→</span>
              </span>
            </div>
          </Link>

          {/* Block 6: Play Game */}
          <Link
            href="/gamification"
            style={{
              textDecoration: 'none',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '260px',
            }}
            className="temple-card temple-card-interactive"
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1.25rem',
                }}
              >
                <div
                  className="card-icon-bubble"
                  style={{
                    background: 'rgba(251, 191, 36, 0.12)',
                    borderColor: 'rgba(251, 191, 36, 0.35)',
                  }}
                >
                  🎮
                </div>
                <span
                  className="badge"
                  style={{
                    borderColor: 'rgba(251, 191, 36, 0.35)',
                    color: '#fbbf24',
                    background: 'rgba(251, 191, 36, 0.08)',
                    fontSize: '0.7rem',
                  }}
                >
                  3x4 Jigsaw
                </span>
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.25rem',
                  letterSpacing: '0.05em',
                  color: 'var(--gold-radiance)',
                  margin: '0 0 0.5rem',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                PLAY GAME
              </h3>
              <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
                Enter the gamified version of Gurukul. Test your knowledge, earn coins, and unlock sacred rewards.
              </p>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <span className="card-action-link" style={{ color: '#fbbf24' }}>
                <span>Play 3x4 Jigsaw &amp; Bazaar</span>
                <span className="action-arrow">→</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* =========================================================================
          2. METRICS & CAPABILITIES SUMMARY STRIP
          ========================================================================= */}
      <section
        style={{
          marginBottom: '2.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '0.75rem',
            textAlign: 'center',
          }}
        >
          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--gold-radiance)', lineHeight: 1.15 }}>
              7 Pillars
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Unified Shastric System
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#eab308', lineHeight: 1.15 }}>
              5 Seeker Tiers
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Jijñāsu ➔ Ācārya
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1.15 }}>
              6 Languages
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Keyboards &amp; Etymology
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#5eead4', lineHeight: 1.15 }}>
              14+ Plants
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Herbal Dravyaguna Guide
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#c4b5fd', lineHeight: 1.15 }}>
              32 Nodes
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Knowledge Graph
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '0.85rem 0.65rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#a78bfa', lineHeight: 1.15 }}>
              5 Personas
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}
            >
              Vedic Wisdom Sages
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. THE 7 SACRED PILLARS SECTION (With Filter Tabs)
          ========================================================================= */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--gold-sacred)',
              fontWeight: 700,
            }}
          >
            सप्त स्तम्भाः • Core Capabilities
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              marginTop: '0.35rem',
              marginBottom: '0.45rem',
            }}
            className="gold-gradient-text"
          >
            The Seven Pillars of AI Gurukul
          </h2>
          <p
            style={{
              color: 'var(--text-dust)',
              maxWidth: '640px',
              margin: '0 auto 1.25rem',
              fontSize: '0.9rem',
              lineHeight: 1.5,
            }}
          >
            A modular, unified system combining scriptural authenticity with computational intelligence.
          </p>

          {/* Card Navigation Segmented Tabs */}
          <div className="card-nav-tabs" role="tablist" aria-label="Pillar Categories" style={{ justifyContent: 'center' }}>
            {(
              [
                { id: 'all', label: 'All 7 Pillars', count: 7 },
                { id: 'wisdom', label: '💬 Wisdom & Languages', count: 2 },
                { id: 'health', label: '🌿 Ayurveda Health', count: 1 },
                { id: 'learning', label: '🏆 Gamification & RAG', count: 4 },
              ] as const
            ).map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`card-nav-tab ${isActive ? 'active' : ''}`}
                  role="tab"
                  aria-selected={isActive}
                  style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
                >
                  <span>{tab.label}</span>
                  <span className="card-nav-badge" style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}>{tab.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1rem',
          }}
        >
          {filteredPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="temple-card temple-card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `2px solid ${pillar.badgeColor}`,
                padding: '1.15rem 1.25rem',
                boxShadow: `0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 16px ${pillar.badgeColor}12`,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.65rem',
                  }}
                >
                  <div
                    className="card-icon-bubble"
                    style={{
                      background: `${pillar.badgeColor}18`,
                      borderColor: `${pillar.badgeColor}45`,
                      fontSize: '1.25rem',
                      width: '38px',
                      height: '38px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '10px',
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <span
                    className="badge"
                    style={{
                      borderColor: `${pillar.badgeColor}55`,
                      color: pillar.badgeColor,
                      background: `${pillar.badgeColor}12`,
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.55rem',
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.74rem',
                    letterSpacing: '0.06em',
                    color: 'var(--text-dust)',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem',
                    fontWeight: 600,
                  }}
                >
                  {pillar.sanskrit}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    color: 'var(--text-vellum)',
                    marginBottom: '0.45rem',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-dust)',
                    fontSize: '0.86rem',
                    lineHeight: 1.5,
                    margin: '0 0 1rem',
                  }}
                >
                  {pillar.desc}
                </p>
              </div>

              <div>
                <Link
                  href={pillar.href}
                  className="btn-outline-sacred card-action-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    fontSize: '0.84rem',
                    borderRadius: '8px',
                    borderColor: `${pillar.badgeColor}55`,
                    color: pillar.badgeColor,
                    background: `${pillar.badgeColor}08`,
                  }}
                >
                  <span>{pillar.actionLabel}</span>
                  <span className="action-arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. CANONICAL SAGES & PHILOSOPHERS
          ========================================================================= */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--gold-sacred)',
              fontWeight: 700,
            }}
          >
            आचार्याः • Canonical Vedic Guides
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
              marginTop: '0.35rem',
              marginBottom: '0.45rem',
            }}
            className="gold-gradient-text"
          >
            Consult Living Philosophical Lineages
          </h2>
          <p
            style={{
              color: 'var(--text-dust)',
              maxWidth: '640px',
              margin: '0 auto',
              fontSize: '0.9rem',
              lineHeight: 1.5,
            }}
          >
            Each persona embodies a distinct traditional Darshana, grounded strictly in foundational
            Sanskrit texts.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {personas.map((p) => (
            <div
              key={p.name}
              className="temple-card temple-card-interactive"
              style={{
                borderLeft: `4px solid ${p.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: `0 10px 32px -4px rgba(0, 0, 0, 0.65), 0 0 20px ${p.color}15`,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      color: p.color,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      background: `${p.color}15`,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '9999px',
                      border: `1px solid ${p.color}35`,
                    }}
                  >
                    {p.domain}
                  </span>
                  <span
                    style={{ fontSize: '0.82rem', color: 'var(--gold-sacred)', fontStyle: 'italic', fontWeight: 500 }}
                  >
                    {p.sanskritTitle}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    margin: '0.6rem 0 0.6rem',
                    color: 'var(--text-vellum)',
                    fontWeight: 700,
                  }}
                >
                  {p.name}
                </h3>

                <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <Link
                  href={p.href}
                  className="btn-outline-sacred card-action-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.55rem 1.15rem',
                    fontSize: '0.85rem',
                    borderColor: `${p.color}55`,
                    color: p.color,
                    background: `${p.color}08`,
                  }}
                >
                  <span>Seek Guidance</span>
                  <span className="action-arrow">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. PRODUCTION QUALITY & SHASTRIQUE ASSURANCE
          ========================================================================= */}
      <section
        className="temple-card"
        style={{
          background: 'linear-gradient(180deg, #18140D 0%, #100E0A 100%)',
          border: '1px solid rgba(212, 175, 55, 0.35)',
          padding: '2rem 1.5rem',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <span
          className="badge"
          style={{
            borderColor: 'var(--gold-sacred)',
            color: 'var(--gold-radiance)',
            marginBottom: '0.65rem',
          }}
        >
          Zero Hallucination Architecture
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            marginBottom: '0.65rem',
          }}
          className="gold-gradient-text"
        >
          Grounded Epistemology: Shastra Pramana
        </h2>
        <p
          style={{
            maxWidth: '720px',
            margin: '0 auto 1.5rem',
            color: 'var(--text-dust)',
            fontSize: '0.92rem',
            lineHeight: 1.6,
          }}
        >
          Unlike generic large language models that invent synthetic advice, AI Gurukul 2.0 enforces
          strict scriptural retrieval grounding (Shastra Pramana). When you seek wisdom on duty,
          ethical dilemmas, dosha imbalances, or philosophical concepts, the platform delivers
          verifiable citations from the Bhagavad Gita, Upanishads, Charaka Samhita, and Yoga Sutras.
        </p>

        <div
          style={{ display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}
        >
          <Link
            href="/wisdom"
            className="btn-sacred"
            style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}
          >
            💬 Consult Wisdom Sages
          </Link>
          <Link
            href="/gamification"
            className="btn-outline-sacred"
            style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderColor: '#EAB308', color: '#fde047' }}
          >
            🏆 Play 3x4 Shloka Jigsaw
          </Link>
          <Link
            href="/languages"
            className="btn-outline-sacred"
            style={{ padding: '0.8rem 2rem', fontSize: '1rem', borderColor: '#38BDF8', color: '#7dd3fc' }}
          >
            🪶 Open Multilingual Keyboards
          </Link>
        </div>
      </section>
    </div>
  );
}
