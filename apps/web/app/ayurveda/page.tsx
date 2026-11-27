'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AYURVEDIC_PLANTS, AyurvedicPlant } from '../../lib/ayurvedic-plants';

export default function AyurvedaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDosha, setSelectedDosha] = useState<'all' | 'vata' | 'pitta' | 'kapha' | 'tridosha'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPlant, setActiveModalPlant] = useState<AyurvedicPlant | null>(null);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDosha('all');
    setSelectedCategory('all');
  };

  const filteredPlants = useMemo(() => {
    return AYURVEDIC_PLANTS.filter((plant) => {
      const query = searchQuery.trim().toLowerCase();
      if (query) {
        const matchesName = plant.name.toLowerCase().includes(query);
        const matchesSanskrit = plant.sanskritName.toLowerCase().includes(query);
        const matchesBotanical = plant.botanicalName.toLowerCase().includes(query);
        const matchesCategory = plant.category.toLowerCase().includes(query);
        const matchesBenefits = plant.benefits.some((b) => b.toLowerCase().includes(query));
        const matchesSymptoms = plant.whereAndWhen.symptomsAddressed.some((s) =>
          s.toLowerCase().includes(query)
        );
        const matchesHow =
          plant.howToUse.form.toLowerCase().includes(query) ||
          plant.howToUse.anupana.toLowerCase().includes(query);

        if (
          !matchesName &&
          !matchesSanskrit &&
          !matchesBotanical &&
          !matchesCategory &&
          !matchesBenefits &&
          !matchesSymptoms &&
          !matchesHow
        ) {
          return false;
        }
      }

      if (selectedDosha === 'vata') {
        if (plant.doshaMatrix.vata !== 'reduces') return false;
      } else if (selectedDosha === 'pitta') {
        if (plant.doshaMatrix.pitta !== 'reduces') return false;
      } else if (selectedDosha === 'kapha') {
        if (plant.doshaMatrix.kapha !== 'reduces') return false;
      } else if (selectedDosha === 'tridosha') {
        const isTridoshic =
          (plant.doshaMatrix.vata === 'reduces' || plant.doshaMatrix.vata === 'neutral') &&
          (plant.doshaMatrix.pitta === 'reduces' || plant.doshaMatrix.pitta === 'neutral') &&
          (plant.doshaMatrix.kapha === 'reduces' || plant.doshaMatrix.kapha === 'neutral');
        if (!isTridoshic) return false;
      }

      if (selectedCategory !== 'all') {
        if (plant.categoryKey !== selectedCategory) return false;
      }

      return true;
    });
  }, [searchQuery, selectedDosha, selectedCategory]);

  return (
    <div
      className="ayurveda-page-root"
      style={{
        minHeight: '100vh',
        background: '#0D0B08',
        color: '#EDE8D5',
        paddingBottom: '4rem',
      }}
    >
      {/* ── 1. SUBNAV BAR ─────────────────────────────────────── */}
      <div
        className="ayurveda-subnav-bar"
        style={{
          borderBottom: '1px solid rgba(212, 175, 55, 0.12)',
          background: 'rgba(13, 11, 8, 0.98)',
          padding: '0.65rem 1.25rem',
          position: 'relative',
          zIndex: 50,
        }}
      >
        <div
          className="ayurveda-subnav-container"
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            gap: '0.75rem',
          }}
        >
          {/* Breadcrumb Back Option */}
          <nav
            aria-label="Breadcrumb"
            className="ayurveda-subnav-breadcrumb"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.85rem',
              color: '#b8ae96',
              whiteSpace: 'nowrap',
            }}
          >
            <Link
              href="/"
              className="ayurveda-back-link"
              style={{
                color: '#b8ae96',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'color 0.15s ease',
              }}
            >
              <span>←</span>
              <span>Sanctum Home</span>
            </Link>
            <span style={{ color: 'rgba(212, 175, 55, 0.35)', userSelect: 'none' }}>›</span>
            <span style={{ color: 'var(--gold-radiance)', fontWeight: 500 }}>Ayurveda</span>
            <span className="ayurveda-breadcrumb-leaf" style={{ color: 'rgba(212, 175, 55, 0.35)', userSelect: 'none' }}>›</span>
            <span className="ayurveda-breadcrumb-leaf" style={{ color: '#EDE8D5', fontWeight: 500 }}>Medicinal Plants</span>
          </nav>

          {/* Badge */}
          <span
            className="ayurveda-subnav-badge"
            style={{
              fontSize: '0.82rem',
              color: '#b8ae96',
              fontWeight: 400,
              whiteSpace: 'nowrap',
            }}
          >
            <span>{AYURVEDIC_PLANTS.length} Classical Herbs</span>
            <span className="ayurveda-badge-verbose"> · Dravyaguna Materia Medica</span>
          </span>
        </div>
      </div>

      {/* ── 2. PAGE HEADER ────────────────────────────────────── */}
      <main className="ayurveda-main-container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '1.75rem 1.25rem 3.5rem', position: 'relative', zIndex: 10 }}>
        <section
          className="ayurveda-hero-card"
          style={{
            textAlign: 'center',
            padding: '1.75rem 2rem 1.6rem',
            background: 'rgba(16, 13, 9, 0.96)',
            border: '1px solid rgba(212, 175, 55, 0.2)',
            borderRadius: '12px',
            marginBottom: '1.75rem',
            marginTop: 0,
            boxSizing: 'border-box',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.6rem, 3.2vw, 2.2rem)',
              letterSpacing: '0.03em',
              lineHeight: 1.25,
              color: 'var(--gold-radiance)',
              margin: '0 0 0.65rem',
              fontWeight: 600,
            }}
          >
            Ayurveda &amp; Sacred Plant Matrix
          </h1>

          <p
            style={{
              color: '#b8ae96',
              maxWidth: '720px',
              margin: '0 auto',
              fontSize: '0.92rem',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Authentic medicinal plants grounded in the <em>Charaka Samhita</em>, <em>Sushruta Samhita</em>, and{' '}
            <em>Bhavaprakasha Nighantu</em>. Exact preparation methods, circadian timings, and doshic dynamics.
          </p>
        </section>

        {/* ── 3. SEARCH & FILTER CONTROLS ───────────────────── */}
        <section
          className="ayurveda-filter-section"
          style={{
            marginBottom: '2rem',
            padding: '1.25rem 1.25rem 1rem',
            background: 'rgba(18, 15, 10, 0.9)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: '10px',
          }}
        >
          {/* Search Input */}
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(13, 11, 8, 0.8)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '6px',
                padding: '0.5rem 0.85rem',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: 'rgba(212, 175, 55, 0.6)', flexShrink: 0 }}>⌕</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by plant name, Sanskrit, symptom, benefit..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#EDE8D5',
                  fontSize: '0.86rem',
                  fontFamily: 'inherit',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#b8ae96',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    padding: '0.1rem',
                    flexShrink: 0,
                  }}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Dosha Filter Row */}
          <div className="ayurveda-filter-row" style={{ marginBottom: '1rem' }}>
            <span className="ayurveda-filter-label">Dosha Action</span>
            <div className="ayurveda-filter-chips">
              {[
                { id: 'all', label: 'All Plants' },
                { id: 'vata', label: 'Vata' },
                { id: 'pitta', label: 'Pitta' },
                { id: 'kapha', label: 'Kapha' },
                { id: 'tridosha', label: 'Tridoshic' },
              ].map((tab) => {
                const isActive = selectedDosha === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDosha(tab.id as any)}
                    className={`ayurveda-chip ${isActive ? 'active dosha-active' : ''}`}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: isActive
                        ? '2px solid var(--gold-radiance)'
                        : '2px solid transparent',
                      color: isActive ? 'var(--gold-radiance)' : '#b8ae96',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 0,
                      fontSize: '0.78rem',
                      fontWeight: isActive ? 500 : 400,
                      cursor: 'pointer',
                      transition: 'color 0.15s ease, border-color 0.15s ease',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      outline: 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target System Dropdown Row */}
          <div
            className="ayurveda-filter-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
            }}
          >
            <label
              htmlFor="target-system-select"
              className="ayurveda-filter-label"
              style={{
                fontSize: '0.68rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#b8ae96',
                fontWeight: 500,
                minWidth: '80px',
                flexShrink: 0,
              }}
            >
              Target System
            </label>
            <div style={{ position: 'relative', display: 'inline-block', minWidth: '200px', maxWidth: '320px', flex: '1 1 auto' }}>
              <select
                id="target-system-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="input-sacred"
                style={{
                  width: '100%',
                  padding: '0.38rem 2rem 0.38rem 0.75rem',
                  fontSize: '0.82rem',
                  borderRadius: '6px',
                  background: 'rgba(20, 17, 11, 0.95)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  color: selectedCategory === 'all' ? '#EDE8D5' : 'var(--gold-radiance)',
                  cursor: 'pointer',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              >
                <option value="all" style={{ background: '#14110b', color: '#EDE8D5' }}>All Target Systems</option>
                <option value="vitality" style={{ background: '#14110b', color: '#EDE8D5' }}>Vitality</option>
                <option value="brain" style={{ background: '#14110b', color: '#EDE8D5' }}>Mind &amp; Focus</option>
                <option value="immunity" style={{ background: '#14110b', color: '#EDE8D5' }}>Immunity</option>
                <option value="digestion" style={{ background: '#14110b', color: '#EDE8D5' }}>Digestion</option>
                <option value="skin" style={{ background: '#14110b', color: '#EDE8D5' }}>Skin Detox</option>
                <option value="joints" style={{ background: '#14110b', color: '#EDE8D5' }}>Joints</option>
                <option value="heart" style={{ background: '#14110b', color: '#EDE8D5' }}>Heart</option>
              </select>
              <span
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'rgba(212, 175, 55, 0.6)',
                  fontSize: '0.68rem',
                }}
              >
                ▼
              </span>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#b8ae96',
                  fontSize: '0.74rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  padding: '0.2rem 0.4rem',
                  flexShrink: 0,
                }}
              >
                Reset System
              </button>
            )}
          </div>

          {/* Results count + Reset */}
          <div
            style={{
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.78rem',
            }}
          >
            <span style={{ color: '#b8ae96' }}>
              Showing <strong style={{ color: '#EDE8D5', fontWeight: 500 }}>{filteredPlants.length}</strong> of{' '}
              {AYURVEDIC_PLANTS.length} medicinal plants
            </span>
            {(searchQuery || selectedDosha !== 'all' || selectedCategory !== 'all') && (
              <button
                onClick={resetFilters}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--gold-radiance)',
                  cursor: 'pointer',
                  fontSize: '0.76rem',
                  textDecoration: 'underline',
                  padding: 0,
                }}
              >
                Reset filters
              </button>
            )}
          </div>
        </section>

        {/* ── 4. PLANT CARDS GRID ───────────────────────────── */}
        {filteredPlants.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '3.5rem 2rem',
              color: '#b8ae96',
              border: '1px solid rgba(212, 175, 55, 0.12)',
              borderRadius: '10px',
              background: 'rgba(18, 15, 10, 0.6)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '1rem', opacity: 0.6 }}>⌕</div>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: '#EDE8D5', marginBottom: '0.5rem', fontWeight: 500 }}>
              No Plants Found
            </h3>
            <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              No herbs matched &ldquo;{searchQuery}&rdquo; with the current filters.
            </p>
            <button
              onClick={resetFilters}
              style={{
                padding: '0.55rem 1.25rem',
                background: 'rgba(79, 209, 197, 0.12)',
                border: '1px solid rgba(79, 209, 197, 0.35)',
                color: '#81e6d9',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              Show all {AYURVEDIC_PLANTS.length} plants
            </button>
          </div>
        ) : (
          <div className="ayurveda-plant-grid">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="ayurveda-plant-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  background: 'rgba(18, 15, 10, 0.95)',
                  border: '1px solid rgba(212, 175, 55, 0.12)',
                  borderTop: '2px solid rgba(79, 209, 197, 0.35)',
                  borderRadius: '10px',
                  position: 'relative',
                }}
              >
                <div>
                  {/* Card Top: Icon, Sanskrit & Category */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div
                        style={{
                          fontSize: '1.5rem',
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        {plant.icon}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            color: '#81e6d9',
                            fontWeight: 500,
                            letterSpacing: '0.03em',
                          }}
                        >
                          {plant.sanskritName}
                        </div>
                        <div
                          style={{
                            fontSize: '0.74rem',
                            fontStyle: 'italic',
                            color: '#b8ae96',
                          }}
                        >
                          {plant.botanicalName}
                        </div>
                      </div>
                    </div>

                    <span
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(79, 209, 197, 0.3)',
                        color: '#81e6d9',
                        background: 'rgba(79, 209, 197, 0.07)',
                        fontWeight: 400,
                        maxWidth: '130px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        flexShrink: 0,
                      }}
                      title={plant.category}
                    >
                      {plant.category.split('(')[0].trim()}
                    </span>
                  </div>

                  {/* Plant Common Name */}
                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.3rem',
                      color: 'var(--gold-radiance)',
                      marginBottom: '0.85rem',
                      lineHeight: 1.3,
                      fontWeight: 600,
                    }}
                  >
                    {plant.name}
                  </h3>

                  {/* Dosha Matrix */}
                  <div
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: '7px',
                      border: '1px solid rgba(212, 175, 55, 0.12)',
                      background: 'rgba(13, 11, 8, 0.5)',
                      marginBottom: '1rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.65rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'rgba(212, 175, 55, 0.65)',
                          fontWeight: 600,
                        }}
                      >
                        Tri-Dosha Action
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#b8ae96' }}>
                        {plant.doshaMatrix.summary}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {/* Vata */}
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.18rem 0.5rem',
                          borderRadius: '4px',
                          background:
                            plant.doshaMatrix.vata === 'reduces'
                              ? 'rgba(79, 209, 197, 0.12)'
                              : 'rgba(13, 11, 8, 0.4)',
                          border:
                            plant.doshaMatrix.vata === 'reduces'
                              ? '1px solid rgba(79, 209, 197, 0.35)'
                              : '1px solid rgba(212, 175, 55, 0.12)',
                          color:
                            plant.doshaMatrix.vata === 'reduces' ? '#81e6d9' : '#b8ae96',
                        }}
                      >
                        Vata: {plant.doshaMatrix.vata === 'reduces' ? '↓ Pacifies' : '= Neutral'}
                      </span>
                      {/* Pitta */}
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.18rem 0.5rem',
                          borderRadius: '4px',
                          background:
                            plant.doshaMatrix.pitta === 'reduces'
                              ? 'rgba(248, 113, 113, 0.12)'
                              : 'rgba(13, 11, 8, 0.4)',
                          border:
                            plant.doshaMatrix.pitta === 'reduces'
                              ? '1px solid rgba(248, 113, 113, 0.35)'
                              : '1px solid rgba(212, 175, 55, 0.12)',
                          color:
                            plant.doshaMatrix.pitta === 'reduces' ? '#fca5a5' : '#b8ae96',
                        }}
                      >
                        Pitta:{' '}
                        {plant.doshaMatrix.pitta === 'reduces'
                          ? '↓ Cools'
                          : plant.doshaMatrix.pitta === 'neutral'
                          ? '= Neutral'
                          : '↑ Warms'}
                      </span>
                      {/* Kapha */}
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '0.18rem 0.5rem',
                          borderRadius: '4px',
                          background:
                            plant.doshaMatrix.kapha === 'reduces'
                              ? 'rgba(251, 191, 36, 0.12)'
                              : 'rgba(13, 11, 8, 0.4)',
                          border:
                            plant.doshaMatrix.kapha === 'reduces'
                              ? '1px solid rgba(251, 191, 36, 0.35)'
                              : '1px solid rgba(212, 175, 55, 0.12)',
                          color:
                            plant.doshaMatrix.kapha === 'reduces' ? '#fde68a' : '#b8ae96',
                        }}
                      >
                        Kapha: {plant.doshaMatrix.kapha === 'reduces' ? '↓ Reduces' : '= Neutral'}
                      </span>
                    </div>
                  </div>

                  {/* Benefits */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h4
                      style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(212, 175, 55, 0.65)',
                        fontWeight: 600,
                        margin: '0 0 0.5rem',
                      }}
                    >
                      Health Benefits
                    </h4>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.35rem',
                      }}
                    >
                      {plant.benefits.map((b, idx) => (
                        <li
                          key={idx}
                          style={{
                            fontSize: '0.84rem',
                            color: '#EDE8D5',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.5rem',
                            lineHeight: 1.45,
                            fontWeight: 400,
                          }}
                        >
                          <span style={{ color: '#81e6d9', flexShrink: 0, fontSize: '0.78rem', marginTop: '0.1em' }}>✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* How to Use */}
                  <div
                    style={{
                      background: 'rgba(79, 209, 197, 0.06)',
                      border: '1px solid rgba(79, 209, 197, 0.18)',
                      padding: '0.75rem',
                      borderRadius: '7px',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#81e6d9',
                        fontWeight: 600,
                        margin: '0 0 0.4rem',
                      }}
                    >
                      Preparation &amp; Dosage
                    </h4>
                    <div style={{ fontSize: '0.83rem', color: '#EDE8D5', lineHeight: 1.5, fontWeight: 400 }}>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong style={{ color: 'var(--gold-radiance)', fontWeight: 500 }}>Form &amp; Dosage:</strong>{' '}
                        {plant.howToUse.dosage} in {plant.howToUse.form}.
                      </div>
                      <div>
                        <strong style={{ color: 'var(--gold-radiance)', fontWeight: 500 }}>Anupana (Vehicle):</strong>{' '}
                        {plant.howToUse.anupana}
                      </div>
                    </div>
                  </div>

                  {/* When & Where */}
                  <div
                    style={{
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.15)',
                      padding: '0.75rem',
                      borderRadius: '7px',
                      marginBottom: '1.25rem',
                    }}
                  >
                    <h4
                      style={{
                        fontSize: '0.7rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(212, 175, 55, 0.7)',
                        fontWeight: 600,
                        margin: '0 0 0.4rem',
                      }}
                    >
                      Timing &amp; Application
                    </h4>
                    <div style={{ fontSize: '0.83rem', color: '#EDE8D5', lineHeight: 1.5, fontWeight: 400 }}>
                      <div style={{ marginBottom: '0.25rem' }}>
                        <strong style={{ color: '#b8ae96', fontWeight: 500 }}>When:</strong>{' '}
                        {plant.whereAndWhen.whenToUse} ({plant.whereAndWhen.seasonalRitucharya}).
                      </div>
                      <div>
                        <strong style={{ color: '#b8ae96', fontWeight: 500 }}>Target:</strong>{' '}
                        {plant.whereAndWhen.whereToUse}.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: '#b8ae96',
                      fontStyle: 'italic',
                      marginBottom: '0.85rem',
                      paddingTop: '0.65rem',
                      borderTop: '1px solid rgba(212, 175, 55, 0.1)',
                      fontWeight: 400,
                    }}
                  >
                    {plant.classicalCitation.source}
                  </div>

                  <button
                    onClick={() => setActiveModalPlant(plant)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.65rem 1rem',
                      background: 'rgba(79, 209, 197, 0.1)',
                      border: '1px solid rgba(79, 209, 197, 0.3)',
                      color: '#81e6d9',
                      fontWeight: 500,
                      fontSize: '0.84rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      fontFamily: 'inherit',
                    }}
                  >
                    <span>View Classical Recipe &amp; Precautions</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── 5. EDUCATIONAL PRIMER ─────────────────────────── */}
        <section
          style={{
            marginTop: '3.5rem',
            padding: '2.25rem 1.75rem',
            background: 'rgba(18, 15, 10, 0.9)',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            borderRadius: '10px',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <div
              style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'rgba(212, 175, 55, 0.65)',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              द्रव्यगुण रहस्य · The Classical Science of Ayurvedic Herbs
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)',
                color: 'var(--gold-radiance)',
                fontWeight: 600,
                marginBottom: '0.5rem',
              }}
            >
              Why Formulations, Anupanas &amp; Timings Matter
            </h2>
            <p
              style={{
                color: '#b8ae96',
                maxWidth: '680px',
                margin: '0 auto',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              In the Charaka Samhita, a plant acts dynamically through four classical energetic dimensions:
            </p>
          </div>

          <div className="ayurveda-pillars-grid">
            {[
              {
                label: 'Rasa',
                subtitle: 'Taste on Tongue',
                body: 'The 6 tastes (Sweet, Sour, Salty, Pungent, Bitter, Astringent) signal the nervous system immediately upon contact, triggering specific enzymatic cascades.',
              },
              {
                label: 'Virya',
                subtitle: 'Thermal Potency',
                body: 'Whether an herb is Ushna (heating) or Sheeta (cooling) determines whether it kindles digestive fire or calms inflammatory burning within the channels.',
              },
              {
                label: 'Vipaka',
                subtitle: 'Post-Digestive Effect',
                body: 'The transformation the herb undergoes after absorption — determining its long-term tissue-building (Madhura) or tissue-clearing (Katu) impact.',
              },
              {
                label: 'Anupana',
                subtitle: 'Sacred Carrier',
                body: 'Milk, ghee, warm water, and raw honey act as Yogavahi vehicles that transport active botanicals across tissue barriers directly into target organs.',
              },
            ].map((pillar) => (
              <div
                key={pillar.label}
                style={{
                  background: 'rgba(13, 11, 8, 0.6)',
                  padding: '1.1rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(212, 175, 55, 0.12)',
                }}
              >
                <div
                  style={{
                    fontSize: '0.65rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'rgba(212, 175, 55, 0.6)',
                    fontWeight: 600,
                    marginBottom: '0.2rem',
                  }}
                >
                  {pillar.subtitle}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--gold-radiance)',
                    marginBottom: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  {pillar.label}
                </h4>
                <p style={{ color: '#b8ae96', fontSize: '0.84rem', lineHeight: 1.55, margin: 0, fontWeight: 400 }}>
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ── 6. DETAIL MODAL ───────────────────────────────────── */}
      {activeModalPlant && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(5, 4, 3, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
          }}
          onClick={() => setActiveModalPlant(null)}
        >
          <div
            className="ayurveda-modal"
            style={{
              maxWidth: '680px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'linear-gradient(160deg, rgba(22, 18, 12, 0.98) 0%, rgba(14, 11, 8, 0.99) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '12px',
              padding: '2rem 1.5rem',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalPlant(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(13, 11, 8, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                color: '#EDE8D5',
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  fontSize: '2rem',
                  background: 'rgba(79, 209, 197, 0.1)',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(79, 209, 197, 0.25)',
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                {activeModalPlant.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.76rem', color: '#81e6d9', fontWeight: 500, marginBottom: '0.2rem' }}>
                  {activeModalPlant.sanskritName} · <em>{activeModalPlant.botanicalName}</em>
                </div>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(1.3rem, 3vw, 1.65rem)',
                    color: 'var(--gold-radiance)',
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {activeModalPlant.name} — Classical Preparation
                </h2>
              </div>
            </div>

            {/* Shastra Verse */}
            <div
              style={{
                background: 'rgba(13, 11, 8, 0.7)',
                padding: '1rem 1.1rem',
                borderRadius: '8px',
                border: '1px solid rgba(212, 175, 55, 0.18)',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.65rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'rgba(212, 175, 55, 0.65)',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}
              >
                Shastra Verse · {activeModalPlant.classicalCitation.source}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1rem',
                  color: 'var(--gold-radiance)',
                  lineHeight: 1.6,
                  marginBottom: '0.5rem',
                  fontWeight: 500,
                }}
              >
                &ldquo;{activeModalPlant.classicalCitation.verse}&rdquo;
              </div>
              <div style={{ fontSize: '0.86rem', color: '#b8ae96', fontStyle: 'italic', lineHeight: 1.5, fontWeight: 400 }}>
                {activeModalPlant.classicalCitation.translation}
              </div>
            </div>

            {/* Step-by-Step Recipe */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.1rem',
                  color: '#81e6d9',
                  marginBottom: '0.65rem',
                  fontWeight: 500,
                }}
              >
                {activeModalPlant.preparationRecipe.title}
              </h3>
              <ol
                style={{
                  margin: '0 0 0 1.25rem',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                  fontSize: '0.88rem',
                  color: '#EDE8D5',
                  lineHeight: 1.5,
                  fontWeight: 400,
                }}
              >
                {activeModalPlant.preparationRecipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Energetics Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '0.65rem',
                background: 'rgba(13, 11, 8, 0.5)',
                padding: '0.85rem',
                borderRadius: '8px',
                border: '1px solid rgba(79, 209, 197, 0.15)',
                marginBottom: '1.25rem',
                fontSize: '0.82rem',
              }}
            >
              <div>
                <div style={{ color: 'rgba(212, 175, 55, 0.65)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Rasa (Taste)</div>
                <div style={{ color: '#EDE8D5', fontWeight: 400 }}>{activeModalPlant.rasaGuna.rasa}</div>
              </div>
              <div>
                <div style={{ color: 'rgba(212, 175, 55, 0.65)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Virya (Thermal)</div>
                <div style={{ color: '#EDE8D5', fontWeight: 400 }}>{activeModalPlant.rasaGuna.virya}</div>
              </div>
              <div>
                <div style={{ color: 'rgba(212, 175, 55, 0.65)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>Vipaka (Post-Digestive)</div>
                <div style={{ color: '#EDE8D5', fontWeight: 400 }}>{activeModalPlant.rasaGuna.vipaka}</div>
              </div>
            </div>

            {/* Precautions */}
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                padding: '0.85rem 1rem',
                borderRadius: '8px',
                marginBottom: '1.25rem',
              }}
            >
              <div
                style={{
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#fca5a5',
                  fontWeight: 600,
                  marginBottom: '0.35rem',
                }}
              >
                Precautions &amp; Contraindications
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#fed7d7', lineHeight: 1.5, fontWeight: 400 }}>
                {activeModalPlant.preparationRecipe.precautions}
              </p>
            </div>

            {/* Modal Close */}
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setActiveModalPlant(null)}
                style={{
                  padding: '0.6rem 1.35rem',
                  background: 'rgba(79, 209, 197, 0.12)',
                  border: '1px solid rgba(79, 209, 197, 0.35)',
                  color: '#81e6d9',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '0.86rem',
                  fontFamily: 'inherit',
                }}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
