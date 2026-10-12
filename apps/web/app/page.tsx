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
      sanskrit: 'आयुर्वेद • Prakriti & Vikriti',
      badge: 'Charaka Diagnostic',
      badgeColor: '#3A9B8C',
      icon: '🌿',
      desc: '18-matrix constitutional assessment formulated from the Charaka Samhita. Computes normalized Tri-Dosha percentages, acute Vikriti tracking, and personalized herbal regimens.',
      href: '/ayurveda',
      actionLabel: 'Analyze Your Constitution',
      features: [
        'Tri-Dosha (Vata, Pitta, Kapha) % normalization',
        'Acute symptom Vikriti imbalance tracker',
        'Ahara (Diet), Dinacharya (Rituals) & Herb prescriptions',
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

        {/* Main Title */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5vw, 3.9rem)',
            marginBottom: '1.25rem',
            letterSpacing: '0.03em',
            lineHeight: 1.15,
          }}
          className="gold-gradient-text"
        >
          Ancient Shastras • Modern Intelligence
        </h1>

        {/* Subtitle */}
        <p
          style={{
            maxWidth: '820px',
            margin: '0 auto 2.5rem',
            color: 'var(--text-vellum)',
            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
            lineHeight: 1.65,
            opacity: 0.92,
          }}
        >
          An authentic, verifiable Vedic platform bridging classical scriptures (*Bhagavad Gita,
          Upanishads, Charaka Samhita, Thirukkural, Dhammapada, Arthashastra*) with modern AI.
          Consult legendary sages, track your Ayurvedic Prakriti constitution, explore the
          Knowledge Graph, solve 3x4 shloka jigsaws, and master ancient languages with vernacular
          virtual keyboards.
        </p>

        {/* Quick Launch Action Cluster */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/wisdom"
            className="btn-sacred"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '1rem',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
            }}
          >
            💬 Consult Wisdom Sages
          </Link>

          <Link
            href="/gamification"
            className="btn-outline-sacred"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '1rem',
              borderColor: '#EAB308',
              color: '#fde047',
            }}
          >
            🏆 Gamification &amp; Jigsaw
          </Link>

          <Link
            href="/languages"
            className="btn-outline-sacred"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '1rem',
              borderColor: '#38BDF8',
              color: '#7dd3fc',
            }}
          >
            🪶 Multilingual Studio
          </Link>

          <Link
            href="/ayurveda"
            className="btn-outline-sacred"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '1rem',
              borderColor: '#3A9B8C',
              color: '#5eead4',
            }}
          >
            🌿 Ayurvedic Dosha Matrix
          </Link>

          <Link
            href="/graph"
            className="btn-outline-sacred"
            style={{
              padding: '0.85rem 1.75rem',
              fontSize: '1rem',
              borderColor: 'var(--gold-sacred)',
              color: 'var(--gold-radiance)',
            }}
          >
            🕸️ Knowledge Graph
          </Link>
        </div>
      </section>

      {/* =========================================================================
          2. METRICS & CAPABILITIES SUMMARY STRIP
          ========================================================================= */}
      <section
        style={{
          background:
            'linear-gradient(180deg, rgba(33, 29, 18, 0.85) 0%, rgba(20, 17, 11, 0.95) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '12px',
          padding: '2rem 1.5rem',
          marginBottom: '5rem',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          <div
            style={{ borderRight: '1px solid rgba(212, 175, 55, 0.12)', padding: '0.5rem 1rem' }}
          >
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--gold-radiance)' }}>
              7 Pillars
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Unified Shastric System
            </div>
          </div>

          <div
            style={{ borderRight: '1px solid rgba(212, 175, 55, 0.12)', padding: '0.5rem 1rem' }}
          >
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#eab308' }}>
              5 Seeker Tiers
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Jijñāsu ➔ Ācārya Levels
            </div>
          </div>

          <div
            style={{ borderRight: '1px solid rgba(212, 175, 55, 0.12)', padding: '0.5rem 1rem' }}
          >
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#38bdf8' }}>
              6 Languages
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Keyboards &amp; Etymology
            </div>
          </div>

          <div
            style={{ borderRight: '1px solid rgba(212, 175, 55, 0.12)', padding: '0.5rem 1rem' }}
          >
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#5eead4' }}>
              18 Indicators
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Charaka Dosha Assessment
            </div>
          </div>

          <div
            style={{ borderRight: '1px solid rgba(212, 175, 55, 0.12)', padding: '0.5rem 1rem' }}
          >
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#c4b5fd' }}>
              32 Nodes • 56 Edges
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Ontology Knowledge Graph
            </div>
          </div>

          <div style={{ padding: '0.5rem 1rem' }}>
            <div style={{ fontSize: '1.85rem', fontWeight: 700, color: '#a78bfa' }}>
              Dual JWT + RBAC
            </div>
            <div
              style={{
                fontSize: '0.82rem',
                color: 'var(--text-dust)',
                marginTop: '0.3rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
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
      <section style={{ marginBottom: '5.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--gold-sacred)',
              fontWeight: 600,
            }}
          >
            सप्त स्तम्भाः • Core Shastric Capabilities
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
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
              margin: '0 auto 1.5rem',
              fontSize: '1.05rem',
            }}
          >
            A modular, unified system combining scriptural authenticity with state-of-the-art
            computational intelligence.
          </p>

          {/* Filter Chips */}
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(20, 17, 11, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '30px',
              padding: '0.3rem',
              gap: '0.3rem',
            }}
          >
            {(
              [
                { id: 'all', label: 'All 7 Pillars' },
                { id: 'wisdom', label: '💬 Wisdom & Languages' },
                { id: 'health', label: '🌿 Ayurveda Health' },
                { id: 'learning', label: '🏆 Gamification & RAG' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: activeTab === tab.id ? 'var(--gold-sacred)' : 'transparent',
                  color: activeTab === tab.id ? '#0D0B08' : 'var(--text-dust)',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  fontSize: '0.88rem',
                  padding: '0.45rem 1.15rem',
                  borderRadius: '24px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                padding: '2rem',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem',
                  }}
                >
                  <span style={{ fontSize: '2rem' }}>{pillar.icon}</span>
                  <span
                    className="badge"
                    style={{
                      borderColor: pillar.badgeColor,
                      color: pillar.badgeColor,
                      background: 'rgba(212, 175, 55, 0.05)',
                    }}
                  >
                    {pillar.badge}
                  </span>
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-dust)',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
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
                    margin: '0 0 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  {pillar.features.map((feat, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--text-vellum)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span style={{ color: pillar.badgeColor }}>✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <Link
                  href={pillar.href}
                  className="btn-outline-sacred"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    width: '100%',
                    justifyContent: 'center',
                    padding: '0.65rem 1.25rem',
                    borderColor: pillar.badgeColor,
                    color: pillar.badgeColor,
                  }}
                >
                  <span>{pillar.actionLabel}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. CANONICAL SAGES & PHILOSOPHERS
          ========================================================================= */}
      <section style={{ marginBottom: '5.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--gold-sacred)',
              fontWeight: 600,
            }}
          >
            आचार्याः • Canonical Vedic Guides
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.4rem',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
          }}
        >
          {personas.map((p) => (
            <div
              key={p.name}
              className="temple-card"
              style={{
                borderLeft: `4px solid ${p.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      color: p.color,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {p.domain}
                  </span>
                  <span
                    style={{ fontSize: '0.8rem', color: 'var(--text-dust)', fontStyle: 'italic' }}
                  >
                    {p.sanskritTitle}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    margin: '0.4rem 0 0.6rem',
                    color: 'var(--text-vellum)',
                  }}
                >
                  {p.name}
                </h3>

                <p style={{ color: 'var(--text-dust)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {p.desc}
                </p>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  href={p.href}
                  className="btn-outline-sacred"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.45rem 1rem',
                    fontSize: '0.85rem',
                    borderColor: p.color,
                    color: p.color,
                  }}
                >
                  <span>Seek Guidance</span>
                  <span>→</span>
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
