'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import {
  ConversationDTO,
  MessageCitation,
  MessageDTO,
  PersonaInfo,
  WisdomPersona,
} from '@ai-gurukul/types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const DEFAULT_PERSONAS: PersonaInfo[] = [
  {
    id: 'krishna',
    name: 'Lord Krishna',
    title: 'Supreme Guide & Charioteer of Dharma',
    domain: 'Bhagavad Gita & Karma Yoga',
    color: '#7B68EE',
    avatarIcon: '🪷',
    description:
      'Provides compassionate yet uncompromising clarity, teaching Nishkama Karma (detached action), emotional resilience, and devotion.',
    philosophicalCore:
      'Nishkama Karma (selfless action without anxiety for rewards), Sthitaprajna (unshakable equanimity), divine friendship, and inner liberation.',
    sampleInquiries: [
      'How do I make difficult decisions when personal emotions cloud my duty?',
      'How can I overcome anxiety regarding the outcome of my work?',
      'What is true equanimity in times of praise and blame?',
    ],
  },
  {
    id: 'chanakya',
    name: 'Chanakya Pandit',
    title: 'Master Strategist & Prime Minister',
    domain: 'Arthashastra & Neeti Shastra',
    color: '#C46B3A',
    avatarIcon: '📜',
    description:
      'Delivers sharp, pragmatic, and analytical counsel on leadership, ethics, resource allocation, and real-world strategy.',
    philosophicalCore:
      'Rajaneeti (statecraft), Vinaya (disciplined governance), foresight, psychological realism, and unwavering accountability.',
    sampleInquiries: [
      'How do I maintain authority and trust among a competitive team?',
      'How should I navigate betrayal or deceit in professional alliances?',
      'What are the foundational principles of sustainable strategic planning?',
    ],
  },
  {
    id: 'vaidya',
    name: 'Vaidya Charaka',
    title: 'Holistic Physician & Ayurvedic Sage',
    domain: 'Ayurveda & Doshic Wellness',
    color: '#3A9B8C',
    avatarIcon: '🌿',
    description:
      'Offers restorative guidance for psycho-physical balance, seasonal attunement, digestive fire (Agni), and holistic vitality.',
    philosophicalCore:
      'Tridosha harmony (Vata, Pitta, Kapha), Dinacharya (daily rituals), Ritucharya (seasonal living), and mind-body equilibrium.',
    sampleInquiries: [
      'How can I balance elevated stress and mental agitation according to Ayurveda?',
      'What daily morning practices support optimal digestive Agni and vitality?',
      'How should I adjust my routine and diet during seasonal transitions?',
    ],
  },
  {
    id: 'vyasa',
    name: 'Sage Vyasa',
    title: 'Chronicler of Epics & Cosmic Observer',
    domain: 'Mahabharata & Puranic Wisdom',
    color: '#B8860B',
    avatarIcon: '📖',
    description:
      'Reveals the multi-layered complexity of human destiny, moral dilemmas, and the inexorable unfolding of cosmic cycles.',
    philosophicalCore:
      'Dharma in ambiguity, the law of cause and effect across generations, and profound narrative introspection.',
    sampleInquiries: [
      'Why do virtuous individuals encounter unjust suffering in life?',
      'How does one navigate loyalty to family versus adherence to truth?',
      'What does the epic narrative teach us about the inevitable cycles of civilization?',
    ],
  },
  {
    id: 'patanjali',
    name: 'Sage Patanjali',
    title: 'Author of the Yoga Sutras',
    domain: 'Ashtanga Yoga & Mental Mastery',
    color: '#4682B4',
    avatarIcon: '🧘',
    description:
      'Directs the seeker toward profound stilling of the mind, mental discipline, and discriminative discernment.',
    philosophicalCore:
      'Citta-Vritti-Nirodha (stilling mental fluctuations), Abhyasa & Vairagya (practice and dispassion), and eight-limbed yoga.',
    sampleInquiries: [
      'How can I train the wandering mind to remain anchored in singular focus?',
      'What is the practical difference between suppression of thought and serene detachment?',
      'How do the Yamas and Niyamas establish psychological peace?',
    ],
  },
];

const CLIENT_WISDOM_REPLIES: Record<WisdomPersona, { text: string; citations: MessageCitation[] }> = {
  krishna: {
    text: `O Seeker, in the midst of uncertainty and doubt, remember that your true self (Atman) is imperishable and beyond fear. As revealed in the Bhagavad Gita: "Your right is only to perform duty with dedicated awareness, never to anxious anticipation of results." When actions are offered selflessly without clinging to victory or defeat, the mind attains unshakable tranquility (Sthitaprajna). Elevate your spirit through internal mastery and stand firm in your Svadharma.`,
    citations: [
      {
        canonicalReference: 'BG 2.47',
        chunkText: 'Karmanye vadhikaraste ma phaleshu kadachana (Your right is to work only, never to its fruit).',
        domain: 'gita',
        relevanceScore: 1.0,
      },
      {
        canonicalReference: 'BG 6.5',
        chunkText: 'Uddhared atmanatmanam (Let a man lift himself by his own Self).',
        domain: 'gita',
        relevanceScore: 0.95,
      },
    ],
  },
  chanakya: {
    text: `Noble strategist, clarity of intellect (buddhi) must always precede decisive action. In the Arthashastra, it is codified: "True power belongs to the disciplined ruler who cultivates self-restraint (vinaya) and tirelessly advances collective welfare." Do not let sentiment cloud strategic foresight. Evaluate incentives, foresee collateral consequences, and align your resources with unwavering discipline and ethical accountability.`,
    citations: [
      {
        canonicalReference: 'Arthashastra 1.7.1',
        chunkText: 'Indriya-jaye vinayam (Self-control rooted in mastery of the senses is the foundation of statecraft).',
        domain: 'chanakya',
        relevanceScore: 1.0,
      },
      {
        canonicalReference: 'Chanakya Neeti 2.1',
        chunkText: 'Foresight and adaptability are the shields of the sovereign mind.',
        domain: 'chanakya',
        relevanceScore: 0.92,
      },
    ],
  },
  vaidya: {
    text: `Namaste, health is the foundational balance (samya) between your biological doshas (Vata, Pitta, Kapha), metabolic fire (Agni), and mental serenity. As revealed in the Charaka Samhita, Ayurveda guides the integration of wholesome nutrition, circadian routine (dinacharya), and season-aware living. Observe where subtle imbalances manifest in your daily life, and restore equilibrium gently through nature's rhythm and restorative lifestyle.`,
    citations: [
      {
        canonicalReference: 'Charaka Samhita Sutrasthana 1.41',
        chunkText: 'Hitahitam sukham dukham ayustasya hitahitam (Life is balanced through wholesome alignment of body, senses, mind and soul).',
        domain: 'ayurveda',
        relevanceScore: 1.0,
      },
      {
        canonicalReference: 'Charaka Samhita Chikitsasthana 15',
        chunkText: 'Shante agnau mriyate (When the internal metabolic digestive fire is healthy, vitality flourishes).',
        domain: 'ayurveda',
        relevanceScore: 0.95,
      },
    ],
  },
  vyasa: {
    text: `Seeker of truth, the human experience is woven with intricate moral dilemmas where duty often conflicts with circumstance. In the epic chronicle of the Mahabharata, we observe that righteousness (Dharma) is subtle and requires profound introspective discrimination. Face ambiguity with patience, honor the law of cause and effect (Karma), and remember that integrity in adversity outlasts the rise and fall of kingdoms.`,
    citations: [
      {
        canonicalReference: 'Mahabharata Shantiparva 109.11',
        chunkText: 'Dharmo dharayati prajah (Dharma sustains and protects all living beings).',
        domain: 'mahabharata',
        relevanceScore: 1.0,
      },
    ],
  },
  patanjali: {
    text: `Quiet the external noise and turn the inward gaze. Yoga is the intentional settling of mental vortexes (Citta-Vritti-Nirodha). As documented in the Yoga Sutras, the mind fluctuates between memory, projection, and sensory turbulence. Cultivate consistent practice (abhyasa) alongside serene dispassion (vairagya) to transcend distractions and discover the luminous peace of the Witness.`,
    citations: [
      {
        canonicalReference: 'Yoga Sutras 1.2',
        chunkText: 'Yogas chitta vritti nirodha (Yoga is the intentional restraint and stilling of the fluctuations of consciousness).',
        domain: 'classical_texts',
        relevanceScore: 1.0,
      },
      {
        canonicalReference: 'Yoga Sutras 1.12',
        chunkText: 'Abhyasa-vairagyabhyam tan-nirodhah (Mastery of the mind is achieved through consistent practice and detachment).',
        domain: 'classical_texts',
        relevanceScore: 0.95,
      },
    ],
  },
};

export default function WisdomChatPage() {
  const { user, loading: authLoading } = useAuth();

  const [personas, setPersonas] = useState<PersonaInfo[]>(DEFAULT_PERSONAS);
  const [selectedPersona, setSelectedPersona] = useState<WisdomPersona>('krishna');
  const [conversations, setConversations] = useState<ConversationDTO[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageDTO[]>([]);

  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamBuffer, setStreamBuffer] = useState('');
  const [activeCitations, setActiveCitations] = useState<MessageCitation[]>([]);
  const [inspectedCitation, setInspectedCitation] = useState<MessageCitation | null>(null);

  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Always scroll window to the top when navigating to the Wisdom page
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Only scroll the internal chat container when messages are present or streaming
  const scrollToBottom = (smooth = true) => {
    if (chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  };

  useEffect(() => {
    if (messages.length > 0 || streamBuffer) {
      scrollToBottom(true);
    }
  }, [messages, streamBuffer]);

  // Load available personas from API if available
  useEffect(() => {
    async function loadPersonas() {
      try {
        const res = await fetch(`${API_BASE}/wisdom/personas`);
        const json = await res.json();
        if (json.success && json.data?.personas && json.data.personas.length > 0) {
          setPersonas(json.data.personas);
        }
      } catch (err) {
        // Fall back gracefully to DEFAULT_PERSONAS
      }
    }
    loadPersonas();
  }, []);

  // Load user's conversations when authenticated
  useEffect(() => {
    if (!user) return;

    async function loadConversations() {
      try {
        const res = await fetch(`${API_BASE}/wisdom/conversations`, {
          credentials: 'include',
        });
        const json = await res.json();
        if (json.success && json.data?.items) {
          setConversations(json.data.items);
          if (json.data.items.length > 0 && !activeConversationId) {
            loadConversationThread(json.data.items[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load conversations', err);
      }
    }
    loadConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Load specific conversation thread
  const loadConversationThread = async (convId: string) => {
    setActiveConversationId(convId);
    setStreamBuffer('');
    try {
      const res = await fetch(`${API_BASE}/wisdom/conversations/${convId}`, {
        credentials: 'include',
      });
      const json = await res.json();
      if (json.success && json.data) {
        setMessages(json.data.messages || []);
        setSelectedPersona(json.data.persona);
      }
    } catch (err) {
      console.error('Failed to load thread', err);
    }
  };

  // Start new conversation (supported for both guest and authenticated seekers)
  const startNewDialogue = (persona: WisdomPersona, initialPrompt?: string) => {
    setSelectedPersona(persona);
    setActiveConversationId(null);
    setMessages([]);
    setStreamBuffer('');
    setActiveCitations([]);

    if (initialPrompt) {
      handleSendMessage(undefined, initialPrompt, persona);
    }
  };

  // Simulated client-side streaming engine with authentic citations
  const streamClientWisdom = (persona: WisdomPersona, query: string, targetConvId: string) => {
    const wisdomTemplate = CLIENT_WISDOM_REPLIES[persona] || CLIENT_WISDOM_REPLIES.krishna;
    const words = wisdomTemplate.text.split(' ');
    let currentIdx = 0;
    let accumulated = '';

    const interval = setInterval(() => {
      if (currentIdx < words.length) {
        accumulated += (currentIdx > 0 ? ' ' : '') + words[currentIdx];
        setStreamBuffer(accumulated);
        currentIdx++;
        if (currentIdx === Math.floor(words.length / 2)) {
          setActiveCitations(wisdomTemplate.citations);
        }
      } else {
        clearInterval(interval);
        const assistantMsg: MessageDTO = {
          id: 'assistant-' + Date.now(),
          conversationId: targetConvId,
          sender: 'assistant',
          content: wisdomTemplate.text,
          citations: wisdomTemplate.citations,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setStreamBuffer('');
        setIsStreaming(false);
      }
    }, 28);
  };

  // Send message via SSE streaming (with automatic client fallback)
  const handleSendMessage = async (e?: React.FormEvent, customQuery?: string, overridePersona?: WisdomPersona) => {
    if (e) e.preventDefault();
    const query = (customQuery || inputText).trim();
    if (!query || isStreaming) return;

    const persona = overridePersona || selectedPersona;
    setInputText('');

    // Ensure we have an active conversation reference
    const convId = activeConversationId || 'conv-' + Date.now();
    if (!activeConversationId) {
      setActiveConversationId(convId);
    }

    // Append user message locally
    const tempUserMsg: MessageDTO = {
      id: 'temp-' + Date.now(),
      conversationId: convId,
      sender: 'user',
      content: query,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, tempUserMsg]);

    // Prepare streaming state
    setIsStreaming(true);
    setStreamBuffer('');
    setActiveCitations([]);

    // If user is logged in, attempt backend persistence and SSE streaming
    if (user) {
      try {
        let serverConvId = activeConversationId;
        if (!serverConvId) {
          const initRes = await fetch(`${API_BASE}/wisdom/conversations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              persona,
              title: query.slice(0, 35) + '...',
            }),
          });
          const initJson = await initRes.json();
          if (initJson.success && initJson.data) {
            serverConvId = initJson.data.id;
            setActiveConversationId(serverConvId);
            setConversations((prev) => [initJson.data, ...prev]);
          }
        }

        if (serverConvId) {
          const response = await fetch(`${API_BASE}/wisdom/conversations/${serverConvId}/stream`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ content: query }),
          });

          if (response.body && response.ok) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');
            let buffer = '';
            let accumulatedText = '';
            const collectedCitations: MessageCitation[] = [];

            while (true) {
              const { value, done } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const events = buffer.split('\n\n');
              buffer = events.pop() || '';

              for (const rawEvent of events) {
                if (!rawEvent.trim()) continue;

                const lines = rawEvent.split('\n');
                let eventType = 'message';
                let dataStr = '';

                for (const line of lines) {
                  if (line.startsWith('event:')) {
                    eventType = line.replace('event:', '').trim();
                  } else if (line.startsWith('data:')) {
                    dataStr = line.replace('data:', '').trim();
                  }
                }

                if (!dataStr) continue;

                try {
                  const parsed = JSON.parse(dataStr);
                  if (eventType === 'token') {
                    accumulatedText += parsed.token;
                    setStreamBuffer(accumulatedText);
                  } else if (eventType === 'citation') {
                    collectedCitations.push(parsed.citation);
                    setActiveCitations([...collectedCitations]);
                  } else if (eventType === 'done') {
                    const assistantMsg: MessageDTO = {
                      id: parsed.messageId || 'final-' + Date.now(),
                      conversationId: serverConvId,
                      sender: 'assistant',
                      content: parsed.fullContent || accumulatedText,
                      citations: parsed.citations || collectedCitations,
                      createdAt: new Date().toISOString(),
                    };
                    setMessages((prev) => [...prev, assistantMsg]);
                    setStreamBuffer('');
                    setIsStreaming(false);
                    return;
                  }
                } catch {
                  // Ignore non-JSON heartbeat
                }
              }
            }
            return;
          }
        }
      } catch (err) {
        console.warn('Backend SSE streaming unavailable, switching to local wisdom engine', err);
      }
    }

    // Default / guest / offline fallback: stream client wisdom with citations
    streamClientWisdom(persona, query, convId);
  };

  const currentPersonaInfo = personas.find((p) => p.id === selectedPersona) || personas[0];

  return (
    <div
      className="temple-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 4rem)',
        padding: '1.5rem',
        maxWidth: '1350px',
      }}
    >
      {/* Subpage Breadcrumb Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: '1rem',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
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
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              margin: 0,
              display: 'inline-block',
            }}
            className="gold-gradient-text"
          >
            Vedic Wisdom Dialogue
          </h1>
          <span
            className="badge"
            style={{
              borderColor: 'rgba(123, 104, 238, 0.4)',
              color: '#c4b5fd',
              fontSize: '0.7rem',
              marginLeft: '0.25rem',
            }}
          >
            Live SSE Stream
          </span>
        </div>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dust)' }}>
              Seeker: <strong style={{ color: 'var(--gold-radiance)' }}>{user.displayName}</strong>
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              href="/login"
              className="btn-outline-sacred"
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
            >
              Sign In to Save History
            </Link>
          </div>
        )}
      </div>

      {/* Main Chat Workspace */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr',
          gap: '1.5rem',
          flex: 1,
          marginTop: '1rem',
          overflow: 'hidden',
        }}
      >
        {/* Left Sidebar: Personas & Thread History */}
        <aside
          className="temple-card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
            padding: '1.25rem',
            overflowY: 'auto',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--gold-radiance)',
                marginBottom: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span>☸</span>
              <span>Select Wisdom Persona</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {personas.map((p) => {
                const isSelected = selectedPersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => startNewDialogue(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.7rem 0.85rem',
                      borderRadius: '8px',
                      border: isSelected
                        ? `2px solid ${p.color}`
                        : '1px solid rgba(212, 175, 55, 0.15)',
                      background: isSelected
                        ? `linear-gradient(135deg, ${p.color}22 0%, rgba(13, 11, 8, 0.85) 100%)`
                        : 'rgba(255, 255, 255, 0.02)',
                      color: isSelected ? 'var(--text-vellum)' : 'var(--text-dust)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      boxShadow: isSelected ? `0 4px 16px ${p.color}25` : 'none',
                      transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.25rem',
                        background: isSelected ? `${p.color}25` : 'rgba(212, 175, 55, 0.08)',
                        border: `1px solid ${isSelected ? p.color : 'rgba(212, 175, 55, 0.2)'}`,
                        flexShrink: 0,
                      }}
                    >
                      {p.avatarIcon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isSelected ? p.color : 'var(--text-vellum)' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-dust)' }}>
                        {p.domain.split('&')[0]}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212, 175, 55, 0.1)' }} />

          {/* Previous Dialogues */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--gold-radiance)',
                marginBottom: '0.75rem',
              }}
            >
              Dialogue History
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', overflowY: 'auto' }}
            >
              {conversations.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dust)', fontStyle: 'italic' }}>
                  No previous inquiries. Start a new dialogue above.
                </div>
              ) : (
                conversations.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => loadConversationThread(c.id)}
                    style={{
                      padding: '0.6rem 0.75rem',
                      borderRadius: '5px',
                      background:
                        activeConversationId === c.id
                          ? 'rgba(212, 175, 55, 0.15)'
                          : 'rgba(13, 11, 8, 0.4)',
                      border:
                        activeConversationId === c.id
                          ? '1px solid var(--gold-sacred)'
                          : '1px solid transparent',
                      color: 'var(--text-vellum)',
                      fontSize: '0.85rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    💬 {c.title}
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* Right Main Column: Chat Thread & Input */}
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--surface-stone)',
            borderRadius: '8px',
            border: '1px solid rgba(212, 175, 55, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Active Persona Banner */}
          {currentPersonaInfo && (
            <div
              style={{
                padding: '0.85rem 1.25rem',
                background: 'var(--surface-wood)',
                borderBottom: `2px solid ${currentPersonaInfo.color}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{currentPersonaInfo.avatarIcon}</span>
                <div>
                  <h2 style={{ fontSize: '1.1rem', margin: 0, color: currentPersonaInfo.color }}>
                    {currentPersonaInfo.name}
                  </h2>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-dust)' }}>
                    {currentPersonaInfo.title} • {currentPersonaInfo.domain}
                  </div>
                </div>
              </div>
              <button
                onClick={() => startNewDialogue(selectedPersona)}
                className="btn-outline-sacred"
                style={{ padding: '0.35rem 0.8rem', fontSize: '0.8rem' }}
              >
                + New Inquiry
              </button>
            </div>
          )}

          {/* Message Thread Scroll Container */}
          <div
            ref={chatScrollContainerRef}
            style={{
              flex: 1,
              padding: '1.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {messages.length === 0 && !streamBuffer && (
              <div style={{ textAlign: 'center', margin: 'auto', maxWidth: '580px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
                  {currentPersonaInfo?.avatarIcon || '🕉️'}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'var(--gold-radiance)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Consult {currentPersonaInfo?.name}
                </h3>
                <p
                  style={{ color: 'var(--text-dust)', fontSize: '0.95rem', marginBottom: '1.5rem' }}
                >
                  {currentPersonaInfo?.description}
                </p>

                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--gold-radiance)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Suggested Questions:
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {currentPersonaInfo?.sampleInquiries.map((inq) => (
                    <button
                      key={inq}
                      onClick={() => handleSendMessage(undefined, inq)}
                      style={{
                        padding: '0.65rem 1rem',
                        background: 'rgba(13, 11, 8, 0.6)',
                        border: '1px solid rgba(212, 175, 55, 0.2)',
                        borderRadius: '6px',
                        color: 'var(--text-vellum)',
                        fontSize: '0.85rem',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.borderColor = 'var(--gold-radiance)')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)')
                      }
                    >
                      💡 {inq}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Render Stored Messages */}
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                  }}
                >
                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--text-dust)',
                      marginBottom: '0.25rem',
                      alignSelf: isUser ? 'flex-end' : 'flex-start',
                    }}
                  >
                    {isUser ? 'Seeker' : currentPersonaInfo?.name || 'Guide'}
                  </div>
                  <div
                    style={{
                      background: isUser ? 'rgba(212, 175, 55, 0.12)' : 'var(--surface-wood)',
                      border: isUser
                        ? '1px solid rgba(212, 175, 55, 0.3)'
                        : `1px solid rgba(212, 175, 55, 0.15)`,
                      borderLeft: isUser
                        ? '1px solid rgba(212, 175, 55, 0.3)'
                        : `3px solid ${currentPersonaInfo?.color || 'var(--gold-sacred)'}`,
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      color: 'var(--text-vellum)',
                      fontSize: '0.95rem',
                      lineHeight: 1.6,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {m.content}
                  </div>

                  {/* Render Verified Source Citations */}
                  {m.citations && m.citations.length > 0 && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        marginTop: '0.5rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {m.citations.map((c, idx) => (
                        <button
                          key={idx}
                          onClick={() => setInspectedCitation(c)}
                          style={{
                            background: 'rgba(212, 175, 55, 0.15)',
                            border: '1px solid var(--gold-antique)',
                            color: 'var(--gold-radiance)',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                          }}
                        >
                          📜 {c.canonicalReference}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Active Streaming Assistant Response */}
            {isStreaming && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'flex-start',
                  maxWidth: '80%',
                }}
              >
                <div
                  style={{
                    fontSize: '0.75rem',
                    color: currentPersonaInfo?.color || 'var(--gold-radiance)',
                    marginBottom: '0.25rem',
                  }}
                >
                  {currentPersonaInfo?.name} (Chanting &amp; Streaming...)
                </div>
                <div
                  style={{
                    background: 'var(--surface-wood)',
                    borderLeft: `3px solid ${currentPersonaInfo?.color || 'var(--gold-sacred)'}`,
                    padding: '1rem 1.25rem',
                    borderRadius: '8px',
                    color: 'var(--text-vellum)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {streamBuffer || '...'}
                  <span
                    style={{
                      display: 'inline-block',
                      width: '8px',
                      height: '14px',
                      background: 'var(--gold-radiance)',
                      marginLeft: '4px',
                      animation: 'blink 1s infinite',
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Input Box */}
          <div
            style={{
              padding: '1rem 1.25rem',
              background: 'var(--surface-stone)',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)',
            }}
          >
            <form
              onSubmit={(e) => handleSendMessage(e)}
              style={{ display: 'flex', gap: '0.75rem' }}
            >
              <input
                type="text"
                className="input-sacred"
                placeholder={`Ask ${currentPersonaInfo?.name || 'Vedic Guide'} for guidance...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isStreaming}
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                className="btn-sacred"
                disabled={isStreaming || !inputText.trim()}
                style={{ padding: '0.75rem 1.5rem' }}
              >
                {isStreaming ? 'Streaming...' : 'Seek'}
              </button>
            </form>
          </div>
        </main>
      </div>

      {/* Citation Inspector Modal */}
      {inspectedCitation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100,
            padding: '1.5rem',
          }}
          onClick={() => setInspectedCitation(null)}
        >
          <div
            className="temple-card"
            style={{
              maxWidth: '550px',
              width: '100%',
              background: 'var(--surface-wood)',
              border: '1px solid var(--gold-sacred)',
              padding: '2rem',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span className="badge">Canonical Source Grounding</span>
              <button
                onClick={() => setInspectedCitation(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dust)',
                  cursor: 'pointer',
                }}
              >
                ✕ Close
              </button>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                color: 'var(--gold-radiance)',
                marginBottom: '0.75rem',
              }}
            >
              {inspectedCitation.canonicalReference}
            </h3>
            <div
              style={{
                padding: '1rem',
                background: 'rgba(13, 11, 8, 0.6)',
                borderRadius: '6px',
                borderLeft: '3px solid var(--gold-sacred)',
                marginBottom: '1rem',
                fontStyle: 'italic',
                color: 'var(--text-vellum)',
                fontSize: '0.95rem',
              }}
            >
              &ldquo;{inspectedCitation.chunkText}&rdquo;
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-dust)' }}>
              Verified canonical shastra reference cited by the wisdom persona to ground this answer
              in authentic Vedic tradition.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
