'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AYURVEDIC_PLANTS, AyurvedicPlant } from '../../lib/ayurvedic-plants';

export default function AyurvedaPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDosha, setSelectedDosha] = useState<'all' | 'vata' | 'pitta' | 'kapha' | 'tridosha'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalPlant, setActiveModalPlant] = useState<AyurvedicPlant | null>(null);

  // Quick symptom solver filter
  const handleQuickPreset = (preset: 'sleep' | 'heat' | 'lungs' | 'digestion') => {
    if (preset === 'sleep') {
      setSearchQuery('');
      setSelectedDosha('vata');
      setSelectedCategory('vitality');
    } else if (preset === 'heat') {
      setSearchQuery('');
      setSelectedDosha('pitta');
      setSelectedCategory('all');
    } else if (preset === 'lungs') {
      setSearchQuery('');
      setSelectedDosha('kapha');
      setSelectedCategory('immunity');
    } else if (preset === 'digestion') {
      setSearchQuery('');
      setSelectedDosha('all');
      setSelectedCategory('digestion');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDosha('all');
    setSelectedCategory('all');
  };

  const filteredPlants = useMemo(() => {
    return AYURVEDIC_PLANTS.filter((plant) => {
      // Search text match
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

      // Dosha Filter
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

      // Category Filter
      if (selectedCategory !== 'all') {
        if (plant.categoryKey !== selectedCategory) return false;
      }

      return true;
    });
  }, [searchQuery, selectedDosha, selectedCategory]);

  return (
    <div className="temple-container" style={{ padding: '2rem 1.5rem 6rem', maxWidth: '1280px' }}>
      {/* Quick Navigation Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link
            href="/"
            style={{
              color: 'var(--text-dust)',
              fontSize: '0.9rem',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            ← Sanctum
          </Link>
          <span style={{ color: 'rgba(212, 175, 55, 0.3)' }}>/</span>
          <span style={{ color: '#4fd1c5', fontSize: '0.9rem', fontWeight: 600 }}>
            Ayurveda &amp; Sacred Plant Matrix
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(58, 155, 140, 0.4)',
              color: '#4fd1c5',
              fontSize: '0.75rem',
            }}
          >
            🌿 Dravyaguna Materia Medica
          </span>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(212, 175, 55, 0.3)',
              color: 'var(--gold-radiance)',
              fontSize: '0.75rem',
            }}
          >
            14 Classical Healing Herbs
          </span>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(123, 104, 238, 0.3)',
              color: '#c4b5fd',
              fontSize: '0.75rem',
            }}
          >
            Zero Quiz Required
          </span>
        </div>
      </div>

      {/* HEADER HERO */}
      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem',
          }}
        >
          <span style={{ fontSize: '1.75rem' }}>🌿</span>
          <span
            style={{
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: '#4fd1c5',
              fontWeight: 700,
            }}
          >
            द्रव्यगुण विज्ञान • Classical Ayurvedic Materia Medica
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.1rem, 4.2vw, 3.2rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            marginBottom: '1rem',
          }}
          className="gold-gradient-text"
        >
          Ayurveda &amp; Sacred Plant Matrix
        </h1>

        <p
          style={{
            color: 'var(--text-vellum)',
            maxWidth: '820px',
            margin: '0 auto 1.5rem',
            fontSize: '1.05rem',
            lineHeight: 1.65,
          }}
        >
          Discover authentic medicinal plants grounded in the <em>Charaka Samhita</em>, <em>Sushruta Samhita</em>, and <em>Bhavaprakasha Nighantu</em>. Master exact preparation methods, optimal circadian timings, doshic dynamics, and proven shastric healing benefits.
        </p>

        {/* Quick Problem Selector (Presets) */}
        <div
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            justifyContent: 'center',
            background: 'rgba(26, 22, 14, 0.75)',
            padding: '0.75rem 1.25rem',
            borderRadius: '30px',
            border: '1px solid rgba(212, 175, 55, 0.25)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dust)', alignSelf: 'center', marginRight: '0.25rem' }}>
            What balance do you seek today?
          </span>
          <button
            onClick={() => handleQuickPreset('sleep')}
            className="badge"
            style={{
              background: 'rgba(123, 104, 238, 0.15)',
              borderColor: '#7B68EE',
              color: '#c4b5fd',
              cursor: 'pointer',
              fontSize: '0.78rem',
              padding: '0.35rem 0.8rem',
            }}
          >
            🌙 Insomnia &amp; Stress (Ashwagandha / Shankhpushpi)
          </button>
          <button
            onClick={() => handleQuickPreset('heat')}
            className="badge"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              borderColor: '#ef4444',
              color: '#fca5a5',
              cursor: 'pointer',
              fontSize: '0.78rem',
              padding: '0.35rem 0.8rem',
            }}
          >
            🔥 Acid Reflux &amp; Skin Heat (Shatavari / Neem / Brahmi)
          </button>
          <button
            onClick={() => handleQuickPreset('lungs')}
            className="badge"
            style={{
              background: 'rgba(58, 155, 140, 0.15)',
              borderColor: '#3A9B8C',
              color: '#5eead4',
              cursor: 'pointer',
              fontSize: '0.78rem',
              padding: '0.35rem 0.8rem',
            }}
          >
            🍃 Cough &amp; Lungs (Tulsi &amp; Turmeric)
          </button>
          <button
            onClick={() => handleQuickPreset('digestion')}
            className="badge"
            style={{
              background: 'rgba(245, 158, 11, 0.15)',
              borderColor: '#f59e0b',
              color: '#fcd34d',
              cursor: 'pointer',
              fontSize: '0.78rem',
              padding: '0.35rem 0.8rem',
            }}
          >
            🥣 Digestion &amp; Detox (Triphala &amp; Yashtimadhu)
          </button>
        </div>
      </section>

      {/* SEARCH & FILTER CONTROLS */}
      <section
        className="temple-card"
        style={{
          marginBottom: '2.5rem',
          padding: '1.5rem 1.75rem',
          background: 'linear-gradient(160deg, rgba(33, 29, 18, 0.95) 0%, rgba(18, 15, 10, 0.98) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
        }}
      >
        {/* Search Input Bar */}
        <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(13, 11, 8, 0.85)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '8px',
              padding: '0.6rem 1rem',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.2rem', color: 'var(--gold-sacred)' }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plant by name, botanical name, Sanskrit, symptom (e.g. sleep, stress, skin, digestion, lungs)..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-vellum)',
                fontSize: '0.95rem',
                fontFamily: 'inherit',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-dust)',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  padding: '0.2rem',
                }}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Dosha & Category Filter Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Row 1: Dosha Filter Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-dust)',
                fontWeight: 700,
                minWidth: '100px',
              }}
            >
              Dosha Action:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Plants' },
                { id: 'vata', label: '🌬️ Vata Pacifiers (Calming/Nourishing)' },
                { id: 'pitta', label: '🔥 Pitta Pacifiers (Cooling/Soothing)' },
                { id: 'kapha', label: '💧 Kapha Pacifiers (Stimulating/Warming)' },
                { id: 'tridosha', label: '⚖️ Tridoshic (Harmonizes All 3)' },
              ].map((tab) => {
                const isActive = selectedDosha === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDosha(tab.id as any)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(58, 155, 140, 0.4) 0%, rgba(58, 155, 140, 0.2) 100%)'
                        : 'rgba(13, 11, 8, 0.6)',
                      border: isActive ? '1px solid #4fd1c5' : '1px solid rgba(212, 175, 55, 0.18)',
                      color: isActive ? '#81e6d9' : 'var(--text-dust)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Category Filter Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-dust)',
                fontWeight: 700,
                minWidth: '100px',
              }}
            >
              Target System:
            </span>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', label: 'All Categories' },
                { id: 'vitality', label: '🌿 Vitality & Longevity (Rasayana)' },
                { id: 'brain', label: '🧠 Brain & Memory (Medhya)' },
                { id: 'immunity', label: '🛡️ Immunity & Lungs (Pranavaha)' },
                { id: 'digestion', label: '🥣 Digestion & Detox (Deepana)' },
                { id: 'skin', label: '🌸 Skin & Blood Detox' },
                { id: 'joints', label: '🦴 Joints & Mobility' },
                { id: 'heart', label: '🫀 Heart & Circulation' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    style={{
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.15) 100%)'
                        : 'rgba(13, 11, 8, 0.6)',
                      border: isActive ? '1px solid var(--gold-sacred)' : '1px solid rgba(212, 175, 55, 0.18)',
                      color: isActive ? 'var(--gold-radiance)' : 'var(--text-dust)',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div
          style={{
            marginTop: '1.25rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid rgba(212, 175, 55, 0.12)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
          }}
        >
          <span style={{ color: 'var(--text-dust)' }}>
            Displaying <strong style={{ color: '#4fd1c5' }}>{filteredPlants.length}</strong> of{' '}
            {AYURVEDIC_PLANTS.length} sacred medicinal plants
          </span>
          {(searchQuery || selectedDosha !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={resetFilters}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--gold-radiance)',
                cursor: 'pointer',
                fontSize: '0.82rem',
                textDecoration: 'underline',
              }}
            >
              Reset all filters
            </button>
          )}
        </div>
      </section>

      {/* PLANT CARDS GRID */}
      {filteredPlants.length === 0 ? (
        <div
          className="temple-card"
          style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-dust)' }}
        >
          <span style={{ fontSize: '2.5rem' }}>🍃</span>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-vellum)', marginTop: '1rem' }}>
            No Medicinal Plants Found
          </h3>
          <p style={{ marginTop: '0.5rem', fontSize: '0.95rem' }}>
            No herbs matched your current search criteria &quot;{searchQuery}&quot;.
          </p>
          <button
            onClick={resetFilters}
            className="btn-sacred"
            style={{
              marginTop: '1.5rem',
              display: 'inline-flex',
              padding: '0.6rem 1.4rem',
              background: 'linear-gradient(135deg, #3A9B8C 0%, #22645a 100%)',
              color: '#EDE8D5',
              cursor: 'pointer',
            }}
          >
            Show All 14 Medicinal Plants
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem',
          }}
        >
          {filteredPlants.map((plant) => (
            <div
              key={plant.id}
              className="temple-card temple-card-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderTop: '3px solid #3A9B8C',
                padding: '2rem 1.75rem',
                background: 'linear-gradient(155deg, rgba(32, 28, 18, 0.95) 0%, rgba(16, 13, 8, 0.98) 100%)',
                boxShadow: '0 12px 36px -4px rgba(0, 0, 0, 0.75), 0 0 20px rgba(58, 155, 140, 0.1)',
                position: 'relative',
              }}
            >
              <div>
                {/* Card Top: Icon, Sanskrit & Category Badge */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      className="card-icon-bubble"
                      style={{
                        background: 'rgba(58, 155, 140, 0.18)',
                        borderColor: 'rgba(58, 155, 140, 0.45)',
                        fontSize: '1.75rem',
                      }}
                    >
                      {plant.icon}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: '#4fd1c5',
                          fontWeight: 700,
                          letterSpacing: '0.04em',
                        }}
                      >
                        {plant.sanskritName}
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          fontStyle: 'italic',
                          color: 'var(--text-dust)',
                        }}
                      >
                        {plant.botanicalName}
                      </div>
                    </div>
                  </div>

                  <span
                    className="badge"
                    style={{
                      borderColor: 'rgba(58, 155, 140, 0.45)',
                      color: '#4fd1c5',
                      background: 'rgba(58, 155, 140, 0.12)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      maxWidth: '140px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                    title={plant.category}
                  >
                    {plant.category.split('(')[0]}
                  </span>
                </div>

                {/* Common Name */}
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: 'var(--gold-radiance)',
                    marginBottom: '0.75rem',
                    lineHeight: 1.25,
                  }}
                >
                  {plant.name}
                </h3>

                {/* Dosha Matrix Strip */}
                <div
                  style={{
                    background: 'rgba(13, 11, 8, 0.75)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(212, 175, 55, 0.18)',
                    marginBottom: '1.25rem',
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
                        fontSize: '0.72rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--gold-sacred)',
                        fontWeight: 700,
                      }}
                    >
                      Tri-Dosha Matrix Action
                    </span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dust)' }}>
                      {plant.doshaMatrix.summary}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background:
                          plant.doshaMatrix.vata === 'reduces'
                            ? 'rgba(79, 209, 197, 0.2)'
                            : 'rgba(13, 11, 8, 0.5)',
                        border:
                          plant.doshaMatrix.vata === 'reduces'
                            ? '1px solid #4fd1c5'
                            : '1px solid rgba(212, 175, 55, 0.15)',
                        color: plant.doshaMatrix.vata === 'reduces' ? '#81e6d9' : 'var(--text-dust)',
                      }}
                    >
                      🌬️ Vata: {plant.doshaMatrix.vata === 'reduces' ? '↓ Pacifies' : '= Neutral'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background:
                          plant.doshaMatrix.pitta === 'reduces'
                            ? 'rgba(248, 113, 113, 0.2)'
                            : 'rgba(13, 11, 8, 0.5)',
                        border:
                          plant.doshaMatrix.pitta === 'reduces'
                            ? '1px solid #f87171'
                            : '1px solid rgba(212, 175, 55, 0.15)',
                        color: plant.doshaMatrix.pitta === 'reduces' ? '#fca5a5' : 'var(--text-dust)',
                      }}
                    >
                      🔥 Pitta: {plant.doshaMatrix.pitta === 'reduces' ? '↓ Cools' : plant.doshaMatrix.pitta === 'neutral' ? '= Neutral' : '↑ Mild Warm'}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background:
                          plant.doshaMatrix.kapha === 'reduces'
                            ? 'rgba(251, 191, 36, 0.2)'
                            : 'rgba(13, 11, 8, 0.5)',
                        border:
                          plant.doshaMatrix.kapha === 'reduces'
                            ? '1px solid #fbbf24'
                            : '1px solid rgba(212, 175, 55, 0.15)',
                        color: plant.doshaMatrix.kapha === 'reduces' ? '#fde68a' : 'var(--text-dust)',
                      }}
                    >
                      💧 Kapha: {plant.doshaMatrix.kapha === 'reduces' ? '↓ Reduces' : '= Neutral'}
                    </span>
                  </div>
                </div>

                {/* SECTION 1: WHAT IS THE BENEFITS */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>✨</span>
                    <h4
                      style={{
                        fontSize: '0.82rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--gold-sacred)',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      What is the Benefits (स्वास्थ्य लाभ)
                    </h4>
                  </div>
                  <ul
                    style={{
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                    }}
                  >
                    {plant.benefits.map((b, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: '0.85rem',
                          color: 'var(--text-vellum)',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.55rem',
                          lineHeight: 1.45,
                        }}
                      >
                        <span style={{ color: '#4fd1c5', fontWeight: 700, fontSize: '0.85rem' }}>✓</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* SECTION 2: HOW TO USE */}
                <div
                  style={{
                    background: 'rgba(58, 155, 140, 0.08)',
                    border: '1px solid rgba(58, 155, 140, 0.25)',
                    padding: '0.9rem',
                    borderRadius: '8px',
                    marginBottom: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      marginBottom: '0.45rem',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>🥣</span>
                    <h4
                      style={{
                        fontSize: '0.82rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#4fd1c5',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      How to Use (उपयोग विधि &amp; Anupana)
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-vellum)', lineHeight: 1.5 }}>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <strong style={{ color: 'var(--gold-radiance)' }}>Form &amp; Dosage:</strong>{' '}
                      {plant.howToUse.dosage} in {plant.howToUse.form}.
                    </div>
                    <div>
                      <strong style={{ color: 'var(--gold-radiance)' }}>Vehicle (Anupana):</strong>{' '}
                      {plant.howToUse.anupana}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: WHERE & WHEN TO USE */}
                <div
                  style={{
                    background: 'rgba(212, 175, 55, 0.07)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    padding: '0.9rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      marginBottom: '0.45rem',
                    }}
                  >
                    <span style={{ fontSize: '0.9rem' }}>⏰</span>
                    <h4
                      style={{
                        fontSize: '0.82rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: 'var(--gold-radiance)',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      Where &amp; When to Use (समय एवं स्थिति)
                    </h4>
                  </div>
                  <div style={{ fontSize: '0.83rem', color: 'var(--text-vellum)', lineHeight: 1.5 }}>
                    <div style={{ marginBottom: '0.3rem' }}>
                      <strong style={{ color: '#4fd1c5' }}>When:</strong>{' '}
                      {plant.whereAndWhen.whenToUse} ({plant.whereAndWhen.seasonalRitucharya}).
                    </div>
                    <div>
                      <strong style={{ color: '#4fd1c5' }}>Where (Target):</strong>{' '}
                      {plant.whereAndWhen.whereToUse}.
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD FOOTER: Classical Shastra Citation & Modal Button */}
              <div>
                <div
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--text-dust)',
                    fontStyle: 'italic',
                    marginBottom: '1rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(212, 175, 55, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <span>📜</span>
                  <span>{plant.classicalCitation.source}</span>
                </div>

                <button
                  onClick={() => setActiveModalPlant(plant)}
                  className="btn-sacred"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.25rem',
                    background: 'linear-gradient(135deg, rgba(58, 155, 140, 0.25) 0%, rgba(58, 155, 140, 0.12) 100%)',
                    borderColor: 'rgba(58, 155, 140, 0.6)',
                    color: '#81e6d9',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
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

      {/* EDUCATIONAL PRIMER: THE 4 PILLARS OF DRAVYAGUNA */}
      <section
        className="temple-card"
        style={{
          marginTop: '4rem',
          padding: '2.5rem 2rem',
          background: 'linear-gradient(160deg, rgba(30, 26, 17, 0.95) 0%, rgba(14, 12, 8, 0.98) 100%)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span
            style={{
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--gold-sacred)',
              fontWeight: 700,
            }}
          >
            द्रव्यगुण रहस्य • The Classical Science of Ayurvedic Herbs
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              marginTop: '0.4rem',
              color: 'var(--gold-radiance)',
            }}
          >
            Why Formulations, Anupanas &amp; Timings Matter
          </h2>
          <p
            style={{
              color: 'var(--text-dust)',
              maxWidth: '750px',
              margin: '0.5rem auto 0',
              fontSize: '0.95rem',
              lineHeight: 1.6,
            }}
          >
            In the Charaka Samhita, a plant is not merely a collection of chemical compounds; it acts dynamically through four classical energetic dimensions:
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <div
            style={{
              background: 'rgba(13, 11, 8, 0.65)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>👅</div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-radiance)', marginBottom: '0.3rem' }}>
              1. Rasa (Taste on Tongue)
            </h4>
            <p style={{ color: 'var(--text-dust)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              The 6 tastes (Sweet, Sour, Salty, Pungent, Bitter, Astringent) signal the nervous system immediately upon contact, triggering specific enzymatic cascades.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(13, 11, 8, 0.65)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔥</div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-radiance)', marginBottom: '0.3rem' }}>
              2. Virya (Thermal Potency)
            </h4>
            <p style={{ color: 'var(--text-dust)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Whether an herb is Ushna (heating) or Sheeta (cooling) determines whether it kindles digestive fire or calms inflammatory burning within the circulatory channels.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(13, 11, 8, 0.65)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-radiance)', marginBottom: '0.3rem' }}>
              3. Vipaka (Post-Digestive Effect)
            </h4>
            <p style={{ color: 'var(--text-dust)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              The transformation the herb undergoes after absorption by Agni—determining its long-term tissue-building (Madhura) or tissue-clearing (Katu) impact.
            </p>
          </div>

          <div
            style={{
              background: 'rgba(13, 11, 8, 0.65)',
              padding: '1.25rem',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🥛</div>
            <h4 style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold-radiance)', marginBottom: '0.3rem' }}>
              4. Anupana (Sacred Carrier)
            </h4>
            <p style={{ color: 'var(--text-dust)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              Milk, ghee, warm water, and raw honey act as Yogavahi vehicles that transport active botanicals across blood-tissue barriers directly into target organs.
            </p>
          </div>
        </div>
      </section>

      {/* DETAIL MODAL: CLASSICAL RECIPE, SHASTRA SHLOKA & PRECAUTIONS */}
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
            padding: '1.5rem',
          }}
          onClick={() => setActiveModalPlant(null)}
        >
          <div
            className="temple-card"
            style={{
              maxWidth: '720px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: 'linear-gradient(160deg, #1f1b11 0%, #120f09 100%)',
              border: '1px solid rgba(212, 175, 55, 0.45)',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.9), 0 0 40px rgba(58, 155, 140, 0.25)',
              padding: '2.5rem 2rem',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalPlant(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(13, 11, 8, 0.6)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                color: 'var(--text-vellum)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div
                style={{
                  fontSize: '2.5rem',
                  background: 'rgba(58, 155, 140, 0.2)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(58, 155, 140, 0.4)',
                }}
              >
                {activeModalPlant.icon}
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#4fd1c5', fontWeight: 700 }}>
                  {activeModalPlant.sanskritName} • <em>{activeModalPlant.botanicalName}</em>
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.85rem',
                    color: 'var(--gold-radiance)',
                    margin: '0.2rem 0 0',
                  }}
                >
                  {activeModalPlant.name} Classical Preparation
                </h2>
              </div>
            </div>

            {/* Shastric Shloka Citation */}
            <div
              style={{
                background: 'rgba(13, 11, 8, 0.8)',
                padding: '1.25rem',
                borderRadius: '8px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                marginBottom: '1.5rem',
              }}
            >
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--gold-sacred)', fontWeight: 700, marginBottom: '0.4rem' }}>
                📜 Verbatim Shastra Verse ({activeModalPlant.classicalCitation.source})
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.05rem',
                  color: 'var(--gold-radiance)',
                  lineHeight: 1.6,
                  marginBottom: '0.5rem',
                }}
              >
                &ldquo;{activeModalPlant.classicalCitation.verse}&rdquo;
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-vellum)', fontStyle: 'italic', lineHeight: 1.5 }}>
                {activeModalPlant.classicalCitation.translation}
              </div>
            </div>

            {/* Step-by-Step Recipe */}
            <div style={{ marginBottom: '1.5rem' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  color: '#4fd1c5',
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span>🥣</span>
                <span>{activeModalPlant.preparationRecipe.title}</span>
              </h3>
              <ol
                style={{
                  margin: '0 0 0 1.25rem',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.6rem',
                  fontSize: '0.9rem',
                  color: 'var(--text-vellum)',
                  lineHeight: 1.5,
                }}
              >
                {activeModalPlant.preparationRecipe.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Energetics Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '0.75rem',
                background: 'rgba(13, 11, 8, 0.6)',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid rgba(58, 155, 140, 0.2)',
                marginBottom: '1.5rem',
                fontSize: '0.82rem',
              }}
            >
              <div>
                <strong style={{ color: 'var(--gold-radiance)' }}>Rasa (Taste):</strong>
                <div style={{ color: 'var(--text-dust)' }}>{activeModalPlant.rasaGuna.rasa}</div>
              </div>
              <div>
                <strong style={{ color: 'var(--gold-radiance)' }}>Virya (Thermal):</strong>
                <div style={{ color: 'var(--text-dust)' }}>{activeModalPlant.rasaGuna.virya}</div>
              </div>
              <div>
                <strong style={{ color: 'var(--gold-radiance)' }}>Vipaka (Post-Digestive):</strong>
                <div style={{ color: 'var(--text-dust)' }}>{activeModalPlant.rasaGuna.vipaka}</div>
              </div>
            </div>

            {/* Safety & Precautions */}
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                padding: '1rem 1.25rem',
                borderRadius: '8px',
                marginBottom: '1.5rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#fca5a5',
                  fontWeight: 700,
                  marginBottom: '0.35rem',
                }}
              >
                <span>⚠️</span>
                <span>Ayurvedic Precautions &amp; Contraindications</span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#fed7d7', lineHeight: 1.5 }}>
                {activeModalPlant.preparationRecipe.precautions}
              </p>
            </div>

            {/* Modal Close Action */}
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={() => setActiveModalPlant(null)}
                className="btn-sacred"
                style={{
                  padding: '0.65rem 1.5rem',
                  background: 'linear-gradient(135deg, #3A9B8C 0%, #22645a 100%)',
                  color: '#EDE8D5',
                  cursor: 'pointer',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                }}
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
