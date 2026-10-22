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
      desc: 'Engage in real-time streaming philosophical dialogues with 5 revered Vedic personas. Receive nuanced life guidance grounded in verbatim Sanskrit citations.',
      href: '/wisdom',
      actionLabel: 'Enter Wisdom Sanctum',
      features: [
        'Real-time SSE token stream with smooth cursor',
        'Verbatim Sanskrit shloka citation popups',
        'Persistent seeker dialogue history & context',
      ],
    },
    {
      id: 'ayurveda',
      category: 'health',
      title: 'Ayurveda & Dosha Matrix',
      sanskrit: 'आयुर्वेद • द्रव्यगुण संहिता (Medicinal Plants)',
      badge: 'Sacred Herbal Guide',
      badgeColor: '#3A9B8C',
      icon: '🌿',
      desc: 'Classical Dravyaguna Materia Medica of sacred Ayurvedic plants. Discover exact preparation methods, optimal circadian timings, dosha balancing actions, and proven healing benefits.',
      href: '/ayurveda',
      actionLabel: 'Explore Ayurvedic Plants & Herbs',
      features: [
        '🌿 Classical Plants: Ashwagandha, Tulsi, Brahmi, Shatavari, Neem & Triphala',
        '🥣 How to Use: Exact preparations (Churna, Kwatha, Taila) & Anupanas (Milk, Ghee, Honey)',
        '⏰ Where & When to Use: Circadian times, seasonal cycles & targeted dosha imbalances',
        '✨ Proven Benefits: Ojas vitality, immune defense, cognitive focus & digestive fire',
      ],
    },
    {
      id: 'graph',
      category: 'learning',
      title: 'Vedic Knowledge Graph',
      sanskrit: 'ज्ञानजाल • Jnana Jala',
      badge: 'BFS Graph Traversal',
      badgeColor: '#D4AF37',
      icon: '🕸️',
      desc: 'Interactive radial ontology spanning orthodox Darshanas, shastric texts, sages, and core doctrines connected by 56 semantic relationship edges.',
      href: '/graph',
      actionLabel: 'Traverse Ontology',
      features: [
        '32 Ontology Nodes & 56 Semantic edges',
        'Multi-hop BFS shortest pathfinder algorithm',
        'Interactive SVG canvas & Sanctum detail drawer',
      ],
    },
    {
      id: 'documents',
      category: 'learning',
      title: 'Sacred Ingestion & RAG',
      sanskrit: 'शास्त्र संचय • Shastra Sanchaya',
      badge: 'Hybrid Vector Search',
      badgeColor: '#A78BFA',
      icon: '📜',
      desc: 'Enterprise document ingestion pipeline for classical texts. Chunks scriptures, extracts Sanskrit terms, and retrieves synthesized context with verbatim scriptural citations.',
      href: '/documents',
      actionLabel: 'Open RAG Studio',
      features: [
        'Automated text chunking & embedding index',
        'Multi-domain shastric classification filters',
        'Synthesized context with chapter & verse grounding',
      ],
    },
    {
      id: 'quizzes',
      category: 'learning',
      title: 'Vedic Quizzes & Discernment',
      sanskrit: 'विवेक परीक्षा • Viveka Pariksha',
      badge: 'AI Dynamic Synthesis',
      badgeColor: '#F59E0B',
      icon: '🎯',
      desc: 'Deepen your scriptural discernment through curated multiple-choice exams with live timers, or summon an AI Sage to synthesize interactive quizzes on any Vedic topic.',
      href: '/quizzes',
      actionLabel: 'Test Your Discernment',
      features: [
        'Curated scriptural assessments across Gita & Darshana',
        'On-demand AI quiz synthesis for custom inquiries',
        'Instant domain scoring analytics & explanations',
      ],
    },
    {
      id: 'gamification',
      category: 'learning',
      title: 'Gamification, Quests & Bazaar',
      sanskrit: 'साधना सिद्धि • Sadhana & Bazaar',
      badge: '3x4 Jigsaw Engine',
      badgeColor: '#EAB308',
      icon: '🏆',
      desc: 'Level up across 5 Seeker tiers from Jijñāsu to Ācārya. Complete sacred daily quests, earn Sacred Coins, acquire relics in the Vedic Bazaar, and solve the 3x4 Jigsaw puzzle.',
      href: '/gamification',
      actionLabel: 'Enter Gamification Arena',
      features: [
        '5 Seeker Tiers: Seeker ➔ Learner ➔ Thinker ➔ Philosopher ➔ Acharya',
        'Sacred Coins Economy & Vedic Relic Bazaar inventory',
        'Interactive 3x4 Jigsaw puzzle with hint penalties & lore',
      ],
    },
    {
      id: 'languages',
      category: 'wisdom',
      title: 'Languages & Translation Studio',
      sanskrit: 'भाषा मञ्जरी • Bhasha & Translation',
      badge: 'Virtual Keyboards',
      badgeColor: '#38BDF8',
      icon: '🪶',
      desc: 'Cross-lingual classical translation across 6 sacred tongues. Type using Devanagari and Gujarati virtual keyboards with Shift & Matra combining, and explore Paninian Dhatu roots.',
      href: '/languages',
      actionLabel: 'Launch Multilingual Studio',
      features: [
        '6 Supported Tongues: Sanskrit, Hindi, Gujarati, Tamil, Pali, English',
        'On-screen Devanagari & Gujarati keyboards with automatic Matra combining',
        'Word-by-word grammatical breakdown & Paninian Dhatu root inspector',
      ],
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
    <div className="temple-container" style={{ padding: '2.5rem 1.5rem 6rem', maxWidth: '1360px' }}>
      {/* =========================================================================
          1. HERO SECTION
          ========================================================================= */}
      <section style={{ textAlign: 'center', marginBottom: '4.5rem', paddingTop: '1.5rem' }}>
        {/* Sacred Badges Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.5rem',
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
            margin: '0 auto 3.5rem',
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
            gap: '1.75rem',
            maxWidth: '1180px',
            margin: '0 auto 4.5rem',
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
          marginBottom: '5.5rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
            gap: '1.25rem',
            textAlign: 'center',
          }}
        >
          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--gold-radiance)', lineHeight: 1.1 }}>
              7 Pillars
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dust)',
                marginTop: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              Unified Shastric System
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#eab308', lineHeight: 1.1 }}>
              5 Seeker Tiers
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dust)',
                marginTop: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              Jijñāsu ➔ Ācārya Levels
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#38bdf8', lineHeight: 1.1 }}>
              6 Languages
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dust)',
                marginTop: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              Keyboards &amp; Etymology
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#5eead4', lineHeight: 1.1 }}>
              14+ Sacred Plants
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dust)',
                marginTop: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              Herbal Dravyaguna Guide
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#c4b5fd', lineHeight: 1.1 }}>
              32 Nodes · 56 Edges
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dust)',
                marginTop: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              Ontology Knowledge Graph
            </div>
          </div>

          <div
            className="temple-card temple-card-interactive"
            style={{
              padding: '1.5rem 1rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#a78bfa', lineHeight: 1.1 }}>
              Dual JWT + RBAC
            </div>
            <div
              style={{
                fontSize: '0.78rem',
                color: 'var(--text-dust)',
                marginTop: '0.4rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                fontWeight: 600,
              }}
            >
              HttpOnly Cookie Security
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. THE 7 SACRED PILLARS SECTION (With Filter Tabs)
          ========================================================================= */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--gold-sacred)',
              fontWeight: 700,
            }}
          >
            सप्त स्तम्भाः • Core Shastric Capabilities
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              marginTop: '0.5rem',
              marginBottom: '0.75rem',
            }}
            className="gold-gradient-text"
          >
            The Seven Pillars of AI Gurukul
          </h2>
          <p
            style={{
              color: 'var(--text-dust)',
              maxWidth: '680px',
              margin: '0 auto 2rem',
              fontSize: '1.05rem',
            }}
          >
            A modular, unified system combining scriptural authenticity with state-of-the-art
            computational intelligence.
          </p>

          {/* Card Navigation Segmented Tabs */}
          <div className="card-nav-tabs" role="tablist" aria-label="Pillar Categories">
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
                >
                  <span>{tab.label}</span>
                  <span className="card-nav-badge">{tab.count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredPillars.map((pillar) => (
            <div
              key={pillar.title}
              className="temple-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: `3px solid ${pillar.badgeColor}`,
                padding: '2.25rem 2rem',
                boxShadow: `0 10px 32px -4px rgba(0, 0, 0, 0.65), 0 0 20px ${pillar.badgeColor}15`,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    className="card-icon-bubble"
                    style={{
                      background: `${pillar.badgeColor}18`,
                      borderColor: `${pillar.badgeColor}45`,
                      fontSize: '1.85rem',
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
                      fontSize: '0.72rem',
                      fontWeight: 700,
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.8rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-dust)',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem',
                    fontWeight: 600,
                  }}
                >
                  {pillar.sanskrit}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: 'var(--text-vellum)',
                    marginBottom: '0.85rem',
                    lineHeight: 1.3,
                  }}
                >
                  {pillar.title}
                </h3>

                <p
                  style={{
                    color: 'var(--text-dust)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    marginBottom: '1.5rem',
                  }}
                >
                  {pillar.desc}
                </p>

                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: '0 0 1.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.55rem',
                  }}
                >
                  {pillar.features.map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '0.86rem',
                        color: 'var(--text-vellum)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        lineHeight: 1.4,
                      }}
                    >
                      <span
                        style={{
                          color: pillar.badgeColor,
                          fontWeight: 700,
                          fontSize: '1rem',
                        }}
                      >
                        ✓
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {pillar.id === 'ayurveda' && (
                  <div
                    style={{
                      marginBottom: '1.25rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      background: 'rgba(58, 155, 140, 0.1)',
                      border: '1px solid rgba(58, 155, 140, 0.28)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.72rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: '#4fd1c5',
                          fontWeight: 700,
                        }}
                      >
                        🌿 Plant Materia Medica Highlights
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#4fd1c5', fontWeight: 600 }}>
                        Direct Botanical Guide
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                      <span
                        style={{
                          fontSize: '0.76rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          background: 'rgba(13, 11, 8, 0.65)',
                          border: '1px solid rgba(79, 209, 197, 0.3)',
                          color: 'var(--text-vellum)',
                        }}
                      >
                        🌿 Ashwagandha: Night w/ Warm Milk (Stress &amp; Ojas)
                      </span>
                      <span
                        style={{
                          fontSize: '0.76rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          background: 'rgba(13, 11, 8, 0.65)',
                          border: '1px solid rgba(79, 209, 197, 0.3)',
                          color: 'var(--text-vellum)',
                        }}
                      >
                        🍃 Tulsi: Morning Herbal Tea (Lungs &amp; Prana)
                      </span>
                      <span
                        style={{
                          fontSize: '0.76rem',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          background: 'rgba(13, 11, 8, 0.65)',
                          border: '1px solid rgba(79, 209, 197, 0.3)',
                          color: 'var(--text-vellum)',
                        }}
                      >
                        🧠 Brahmi: Empty Stomach w/ Ghee (Memory &amp; Focus)
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Link
                  href={pillar.href}
                  className="btn-outline-sacred card-action-link"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.75rem 1.4rem',
                    borderColor: `${pillar.badgeColor}65`,
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
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--gold-sacred)',
              fontWeight: 700,
            }}
          >
            आचार्याः • Canonical Vedic Guides
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              marginTop: '0.5rem',
              marginBottom: '0.75rem',
            }}
            className="gold-gradient-text"
          >
            Consult Living Philosophical Lineages
          </h2>
          <p
            style={{
              color: 'var(--text-dust)',
              maxWidth: '680px',
              margin: '0 auto',
              fontSize: '1.05rem',
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
          padding: '3rem 2rem',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <span
          className="badge"
          style={{
            borderColor: 'var(--gold-sacred)',
            color: 'var(--gold-radiance)',
            marginBottom: '1rem',
          }}
        >
          Zero Hallucination Architecture
        </span>
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '2.2rem',
            marginBottom: '1rem',
          }}
          className="gold-gradient-text"
        >
          Grounded Epistemology: Shastra Pramana
        </h2>
        <p
          style={{
            maxWidth: '750px',
            margin: '0 auto 2.5rem',
            color: 'var(--text-dust)',
            fontSize: '1.05rem',
            lineHeight: 1.65,
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
