'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { apiClient } from '../../lib/api';

interface QuizSummary {
  id: string;
  title: string;
  description?: string;
  domain: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questionCount: number;
  tags: string[];
  isDynamic?: boolean;
}

interface QuestionClient {
  questionIndex: number;
  questionText: string;
  options: string[];
  sourceRef?: string;
}

interface ActiveQuiz {
  id: string;
  title: string;
  description?: string;
  domain: string;
  difficulty: string;
  totalQuestions: number;
  questions: QuestionClient[];
  isDynamic?: boolean;
}

interface AttemptAnswerResult {
  questionIndex: number;
  questionText: string;
  options: string[];
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  explanation: string;
  sourceRef?: string;
}

interface QuizAttemptResult {
  id: string;
  quizId: string;
  quizTitle: string;
  domain: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  answers: AttemptAnswerResult[];
  weakAreas: string[];
  timeSpentSeconds?: number;
  completedAt: string;
}

const DOMAIN_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  all: { label: 'All Traditions', icon: '🪷', color: '#D4AF37' },
  custom: { label: 'Your Quizzes', icon: '✨', color: '#ec4899' },
  gita: { label: 'Bhagavad Gita', icon: '🏹', color: '#7B68EE' },
  chanakya: { label: 'Chanakya Neeti', icon: '🏛️', color: '#C46B3A' },
  upanishads: { label: 'Upanishads', icon: '✨', color: '#4fd1c5' },
  ayurveda: { label: 'Ayurveda', icon: '🌿', color: '#3A9B8C' },
  mahabharata: { label: 'Mahabharata', icon: '⚔️', color: '#e53e3e' },
  ramayana: { label: 'Ramayana', icon: '🔆', color: '#f6ad55' },
  panchatantra: { label: 'Panchatantra', icon: '📖', color: '#3182ce' },
  yoga: { label: 'Patanjali Yoga', icon: '🧘', color: '#38bdf8' },
  general: { label: 'Universal Vedic', icon: '🕉️', color: '#d69e2e' },
};

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Active Quiz State
  const [activeQuiz, setActiveQuiz] = useState<ActiveQuiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizTimer, setQuizTimer] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const quizRunnerRef = useRef<HTMLDivElement | null>(null);

  // Results State
  const [attemptResult, setAttemptResult] = useState<QuizAttemptResult | null>(null);

  // Dynamic Quiz Modal State
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [genDomain, setGenDomain] = useState('gita');
  const [genGuru, setGenGuru] = useState('');
  const [genTopic, setGenTopic] = useState('');
  const [genDifficulty, setGenDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>(
    'intermediate'
  );
  const [genCount, setGenCount] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch quizzes list
  const loadQuizzes = useCallback(async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      let endpoint = '/quizzes?limit=100';
      if (selectedDomain === 'custom') {
        endpoint += '&domain=custom';
      } else if (selectedDomain !== 'all') {
        endpoint += `&domain=${selectedDomain}`;
      }
      if (selectedDifficulty !== 'all') endpoint += `&difficulty=${selectedDifficulty}`;
      if (searchQuery.trim()) endpoint += `&search=${encodeURIComponent(searchQuery.trim())}`;

      const res = await apiClient<QuizSummary[]>(endpoint);
      if (res.success && res.data) {
        setQuizzes(res.data);
      } else {
        setErrorMsg(res.error?.message || 'Failed to load quizzes');
      }
    } catch {
      setErrorMsg('Failed to fetch quizzes from server');
    } finally {
      setLoading(false);
    }
  }, [selectedDomain, selectedDifficulty, searchQuery]);

  useEffect(() => {
    loadQuizzes();
  }, [loadQuizzes]);

  // Quiz timer effect
  useEffect(() => {
    let interval: any = null;
    if (activeQuiz && !attemptResult) {
      interval = setInterval(() => {
        setQuizTimer((t) => t + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeQuiz, attemptResult]);

  // Start a Quiz
  const handleStartQuiz = async (quizId: string) => {
    setErrorMsg('');
    try {
      const res = await apiClient<ActiveQuiz>(`/quizzes/${quizId}`);
      if (res.success && res.data) {
        setActiveQuiz(res.data);
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setQuizTimer(0);
        setAttemptResult(null);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        setErrorMsg(res.error?.message || 'Unable to load quiz details');
      }
    } catch {
      setErrorMsg('Failed to load quiz');
    }
  };

  // Submit Answer & Attempt
  const handleSubmitQuiz = async () => {
    if (!activeQuiz) return;
    setIsSubmitting(true);
    setErrorMsg('');

    const answersPayload = Object.entries(selectedAnswers).map(([qIdx, optIdx]) => ({
      questionIndex: Number(qIdx),
      selectedIndex: optIdx,
    }));

    try {
      const res = await apiClient<QuizAttemptResult>('/quizzes/attempt', {
        method: 'POST',
        body: JSON.stringify({
          quizId: activeQuiz.id,
          answers: answersPayload,
          timeSpentSeconds: quizTimer,
        }),
      });

      if (res.success && res.data) {
        setAttemptResult(res.data);
      } else {
        setErrorMsg(res.error?.message || 'Failed to evaluate quiz submission');
      }
    } catch {
      setErrorMsg('Network error submitting quiz attempt');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate Dynamic AI Quiz grounded in RAG
  const handleGenerateAIQuiz = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsGenerating(true);
    setErrorMsg('');

    try {
      const res = await apiClient<ActiveQuiz>('/quizzes/generate', {
        method: 'POST',
        body: JSON.stringify({
          domain: genDomain,
          guru: genGuru || undefined,
          topic: genTopic.trim() || undefined,
          difficulty: genDifficulty,
          questionCount: Number(genCount),
        }),
      });

      if (res.success && res.data) {
        setShowGenerateModal(false);
        loadQuizzes();
        setActiveQuiz(res.data);
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setQuizTimer(0);
        setAttemptResult(null);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        setErrorMsg(res.error?.message || 'Failed to synthesize AI quiz grounded in RAG data');
      }
    } catch {
      setErrorMsg('Error communicating with knowledge base to generate dynamic quiz');
    } finally {
      setIsGenerating(false);
    }
  };

  // Retry with New Dynamic Questions from RAG
  const handleRetryWithNewQuestions = async () => {
    if (!attemptResult) return;
    setIsGenerating(true);
    setErrorMsg('');

    try {
      const res = await apiClient<ActiveQuiz>('/quizzes/generate', {
        method: 'POST',
        body: JSON.stringify({
          domain: attemptResult.domain || 'gita',
          difficulty: attemptResult.difficulty,
          questionCount: attemptResult.totalQuestions || 5,
        }),
      });

      if (res.success && res.data) {
        setActiveQuiz(res.data);
        setCurrentQuestionIdx(0);
        setSelectedAnswers({});
        setQuizTimer(0);
        setAttemptResult(null);
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
      } else {
        setErrorMsg(res.error?.message || 'Failed to synthesize new quiz questions from knowledge base');
      }
    } catch {
      setErrorMsg('Error generating new questions from the scriptural knowledge base');
    } finally {
      setIsGenerating(false);
    }
  };

  // Format Timer
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 4rem)', padding: activeQuiz && !attemptResult ? '0.65rem 1rem 2rem' : '2.5rem 1rem 5rem' }}>
      <div className="temple-container">
        {/* Compact Navigation when in Active Quiz Mode */}
        {activeQuiz && !attemptResult && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.6rem',
              padding: '0.2rem 0.5rem',
              fontSize: '0.82rem',
            }}
          >
            <button
              onClick={() => {
                if (confirm('Exit assessment and return to quiz catalog?')) {
                  setActiveQuiz(null);
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--gold-radiance)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                fontWeight: 600,
              }}
            >
              ← Exit Assessment to Catalog
            </button>
            <span style={{ color: 'var(--text-dust)', fontSize: '0.78rem' }}>
              Active Vedic Assessment
            </span>
          </div>
        )}

        {/* Navigation Breadcrumb & Banner - Only when NOT in active quiz mode */}
        {!activeQuiz && !attemptResult && (
          <>
            {/* Navigation Breadcrumb */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '2rem',
                fontSize: '0.9rem',
              }}
            >
              <Link href="/" style={{ color: 'var(--text-dust)', textDecoration: 'none' }}>
                ← Sanctum
              </Link>
              <span style={{ color: 'rgba(212, 175, 55, 0.3)' }}>/</span>
              <span style={{ color: '#f6ad55', fontWeight: 600 }}>
                Vedic Quizzes &amp; Dynamic Assessments
              </span>
            </div>

            {/* Banner Section */}
            <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>🎯</span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: 'var(--gold-sacred)',
                    fontWeight: 600,
                  }}
                >
                  वैदिक परीक्षा • Vedic Discernment Engine
                </span>
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.5rem',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  lineHeight: 1.2,
                }}
                className="gold-gradient-text"
              >
                Vedic Quizzes & Dynamic Assessments
              </h1>
              <p
                style={{
                  color: 'var(--text-dust)',
                  maxWidth: '700px',
                  margin: '0 auto',
                  fontSize: '1.05rem',
                }}
              >
                Deepen your experiential understanding of ancient wisdom. Challenge yourself with
                curated scriptural tests or summon an AI Sage to synthesize interactive quizzes on any
                spiritual or pragmatic topic.
              </p>

              {/* Quick Action Buttons */}
              <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setShowGenerateModal(true)}
                  style={{
                    background: 'linear-gradient(135deg, #D4AF37 0%, #8B6914 100%)',
                    color: '#0D0B08',
                    border: 'none',
                    padding: '0.85rem 2rem',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(212, 175, 55, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>✨</span> Create Quiz from Topic (Max 15 Qs)
                </button>
                <button
                  onClick={() => setSelectedDomain('custom')}
                  style={{
                    background: selectedDomain === 'custom' ? 'rgba(236, 72, 153, 0.25)' : 'rgba(20, 17, 11, 0.85)',
                    color: selectedDomain === 'custom' ? '#f472b6' : 'var(--text-vellum)',
                    border: selectedDomain === 'custom' ? '1px solid rgba(236, 72, 153, 0.6)' : '1px solid rgba(212, 175, 55, 0.25)',
                    padding: '0.85rem 1.6rem',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span>🪪</span> View Your Quizzes
                </button>
              </div>
            </section>
          </>
        )}

        {errorMsg && (
          <div
            style={{
              background: errorMsg.toLowerCase().includes('knowledge base') || errorMsg.toLowerCase().includes('passages')
                ? 'rgba(196, 107, 58, 0.15)'
                : 'rgba(229, 62, 62, 0.15)',
              border: `1px solid ${
                errorMsg.toLowerCase().includes('knowledge base') || errorMsg.toLowerCase().includes('passages')
                  ? 'rgba(196, 107, 58, 0.45)'
                  : 'rgba(229, 62, 62, 0.4)'
              }`,
              color: errorMsg.toLowerCase().includes('knowledge base') || errorMsg.toLowerCase().includes('passages')
                ? '#fbd38d'
                : '#fc8181',
              padding: '1.25rem 1.5rem',
              borderRadius: '10px',
              marginBottom: '2rem',
              maxWidth: '850px',
              margin: '0 auto 2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>
              {errorMsg.toLowerCase().includes('knowledge base') || errorMsg.toLowerCase().includes('passages')
                ? '📜'
                : '⚠️'}
            </span>
            <div style={{ flex: 1, fontSize: '0.92rem', lineHeight: 1.5 }}>
              <div style={{ fontWeight: 700, marginBottom: '0.25rem', color: '#fff' }}>
                {errorMsg.toLowerCase().includes('knowledge base') || errorMsg.toLowerCase().includes('passages')
                  ? 'RAG Knowledge Grounding Advisory'
                  : 'Assessment System Advisory'}
              </div>
              <p style={{ margin: 0 }}>{errorMsg}</p>
            </div>
            <button
              onClick={() => setErrorMsg('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dust)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0 0.5rem',
              }}
              title="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {/* =========================================================================
            STATE 1: RESULTS VIEW
        ========================================================================== */}
        {attemptResult && (
          <div
            className="temple-card"
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              padding: '2.5rem',
              borderColor: attemptResult.passed
                ? 'rgba(72, 187, 120, 0.4)'
                : 'rgba(212, 175, 55, 0.3)',
            }}
          >
            {/* Header Result */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>
                {attemptResult.passed ? '🏆' : '📜'}
              </div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  color: attemptResult.passed ? '#68d391' : 'var(--text-vellum)',
                  marginBottom: '0.5rem',
                }}
              >
                {attemptResult.passed
                  ? attemptResult.percentage >= 90
                    ? 'Param Pandita (Supreme Master)'
                    : 'Acharya of Vedic Discernment'
                  : 'Sadhaka in Contemplation'}
              </h2>
              <p style={{ color: 'var(--text-dust)', fontSize: '0.95rem' }}>
                Completed {attemptResult.quizTitle} in{' '}
                {formatTime(attemptResult.timeSpentSeconds || 0)}
              </p>
            </div>

            {/* Score Ring & Stats Summary */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2.5rem',
              }}
            >
              <div
                style={{
                  background: 'rgba(13, 11, 8, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-dust)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Score Percentage
                </div>
                <div
                  style={{
                    fontSize: '2.2rem',
                    fontWeight: 700,
                    color: attemptResult.passed ? '#48bb78' : '#e53e3e',
                  }}
                >
                  {attemptResult.percentage}%
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(13, 11, 8, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-dust)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Correct Responses
                </div>
                <div style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--gold-sacred)' }}>
                  {attemptResult.score} / {attemptResult.totalQuestions}
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(13, 11, 8, 0.6)',
                  border: '1px solid rgba(212, 175, 55, 0.15)',
                  padding: '1.25rem',
                  borderRadius: '10px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-dust)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Result Status
                </div>
                <div
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    marginTop: '0.5rem',
                    color: attemptResult.passed ? '#48bb78' : '#e53e3e',
                  }}
                >
                  {attemptResult.passed ? 'PASSED (उत्तीर्ण)' : 'REVIEW NEEDED'}
                </div>
              </div>
            </div>

            {/* Weak Areas if any */}
            {attemptResult.weakAreas.length > 0 && (
              <div
                style={{
                  background: 'rgba(196, 107, 58, 0.1)',
                  border: '1px solid rgba(196, 107, 58, 0.3)',
                  padding: '1.25rem',
                  borderRadius: '8px',
                  marginBottom: '2.5rem',
                }}
              >
                <div
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--accent-chanakya)',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <span>🔍</span> Areas Recommended for Deeper Reflection:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {attemptResult.weakAreas.map((w, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(13, 11, 8, 0.6)',
                        border: '1px solid rgba(196, 107, 58, 0.4)',
                        color: 'var(--text-vellum)',
                        fontSize: '0.85rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '20px',
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Question Review */}
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: 'var(--gold-sacred)',
                marginBottom: '1.5rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                paddingBottom: '0.5rem',
              }}
            >
              Detailed Question Analysis & Scriptural Commentary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {attemptResult.answers.map((a, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(13, 11, 8, 0.7)',
                    border: `1px solid ${a.isCorrect ? 'rgba(72, 187, 120, 0.3)' : 'rgba(229, 62, 62, 0.3)'}`,
                    borderRadius: '8px',
                    padding: '1.25rem',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: a.isCorrect ? '#48bb78' : '#e53e3e',
                      }}
                    >
                      {a.isCorrect ? '✓ CORRECT' : '✗ INCORRECT'} • Question {idx + 1}
                    </span>
                    {a.sourceRef && (
                      <span
                        style={{
                          fontSize: '0.8rem',
                          background: 'rgba(212, 175, 55, 0.1)',
                          color: 'var(--gold-sacred)',
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                        }}
                      >
                        📜 {a.sourceRef}
                      </span>
                    )}
                  </div>

                  <p style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '1rem' }}>
                    {a.questionText}
                  </p>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      marginBottom: '1rem',
                    }}
                  >
                    {a.options.map((opt, oIdx) => {
                      const isChosen = a.selectedIndex === oIdx;
                      const isAnswer = a.correctIndex === oIdx;
                      let bg = 'rgba(255, 255, 255, 0.02)';
                      let border = 'rgba(212, 175, 55, 0.1)';
                      let color = 'var(--text-vellum)';

                      if (isAnswer) {
                        bg = 'rgba(72, 187, 120, 0.15)';
                        border = '#48bb78';
                        color = '#68d391';
                      } else if (isChosen && !isAnswer) {
                        bg = 'rgba(229, 62, 62, 0.15)';
                        border = '#e53e3e';
                        color = '#fc8181';
                      }

                      return (
                        <div
                          key={oIdx}
                          style={{
                            background: bg,
                            border: `1px solid ${border}`,
                            color: color,
                            padding: '0.65rem 1rem',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <span>{opt}</span>
                          {isAnswer && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                              CORRECT ANSWER
                            </span>
                          )}
                          {isChosen && !isAnswer && (
                            <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>
                              YOUR CHOICE
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div
                    style={{
                      background: 'rgba(33, 29, 18, 0.7)',
                      borderLeft: '3px solid var(--gold-sacred)',
                      padding: '0.75rem 1rem',
                      fontSize: '0.88rem',
                      color: 'var(--text-vellum)',
                    }}
                  >
                    <span style={{ color: 'var(--gold-sacred)', fontWeight: 600 }}>
                      Commentary:{' '}
                    </span>
                    {a.explanation}
                  </div>
                </div>
              ))}
            </div>

            {/* Result Action Buttons */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginTop: '2.5rem',
              }}
            >
              <button
                onClick={handleRetryWithNewQuestions}
                disabled={isGenerating}
                className="gold-button"
                style={{ padding: '0.75rem 1.75rem', borderRadius: '24px' }}
              >
                {isGenerating ? 'Synthesizing...' : '🎲 Retry with New Questions'}
              </button>
              <button
                onClick={() => {
                  if (activeQuiz) handleStartQuiz(activeQuiz.id);
                }}
                style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid var(--gold-sacred)',
                  color: 'var(--gold-radiance)',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                🔄 Retake Same Quiz
              </button>
              <button
                onClick={() => {
                  setAttemptResult(null);
                  setActiveQuiz(null);
                  loadQuizzes();
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'var(--text-vellum)',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                ← Back to Quiz Catalog
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 2: ACTIVE QUIZ IN PROGRESS (Compact & Fit on Screen)
        ========================================================================== */}
        {activeQuiz && !attemptResult && (
          <div
            ref={quizRunnerRef}
            className="temple-card"
            style={{
              maxWidth: '850px',
              margin: '0 auto',
              padding: '1.15rem 1.5rem',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
              scrollMarginTop: '85px',
            }}
          >
            {/* Active Quiz Header - Compact */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                paddingBottom: '0.65rem',
                marginBottom: '0.85rem',
                gap: '1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    color: 'var(--gold-sacred)',
                    letterSpacing: '0.06em',
                    fontWeight: 700,
                    background: 'rgba(212, 175, 55, 0.1)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '12px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  {DOMAIN_LABELS[activeQuiz.domain]?.label || activeQuiz.domain.toUpperCase()} •{' '}
                  {activeQuiz.difficulty.toUpperCase()}
                </span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', margin: 0 }}>
                  {activeQuiz.title}
                </h2>
              </div>
              <div
                style={{
                  background: 'rgba(13, 11, 8, 0.9)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  color: 'var(--gold-radiance)',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                ⏱️ {formatTime(quizTimer)}
              </div>
            </div>

            {/* Progress Bar - Compact */}
            <div style={{ marginBottom: '0.85rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem',
                  color: 'var(--text-dust)',
                  marginBottom: '0.35rem',
                }}
              >
                <span>
                  Question <strong style={{ color: 'var(--gold-radiance)' }}>{currentQuestionIdx + 1}</strong> of {activeQuiz.totalQuestions}
                </span>
                <span>
                  {Math.round(((currentQuestionIdx + 1) / activeQuiz.totalQuestions) * 100)}% Complete
                </span>
              </div>
              <div
                style={{
                  height: '5px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${((currentQuestionIdx + 1) / activeQuiz.totalQuestions) * 100}%`,
                    background: 'linear-gradient(90deg, #D4AF37, #F2D675)',
                    transition: 'width 0.3s ease',
                  }}
                />
              </div>
            </div>

            {/* Current Question & Options */}
            {activeQuiz.questions[currentQuestionIdx] && (
              <div>
                {activeQuiz.questions[currentQuestionIdx].sourceRef && (
                  <span
                    style={{
                      display: 'inline-block',
                      background: 'rgba(212, 175, 55, 0.1)',
                      color: 'var(--gold-sacred)',
                      fontSize: '0.75rem',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '10px',
                      marginBottom: '0.5rem',
                    }}
                  >
                    📜 {activeQuiz.questions[currentQuestionIdx].sourceRef}
                  </span>
                )}
                <h3
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    marginBottom: '0.85rem',
                    lineHeight: 1.4,
                    color: 'var(--text-vellum)',
                  }}
                >
                  {activeQuiz.questions[currentQuestionIdx].questionText}
                </h3>

                {/* Option Choices - 2x2 Grid so they fit on screen without vertical scrolling */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '0.55rem',
                    marginBottom: '1rem',
                  }}
                >
                  {activeQuiz.questions[currentQuestionIdx].options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQuestionIdx] === oIdx;
                    return (
                      <div
                        key={oIdx}
                        onClick={() => {
                          setSelectedAnswers({
                            ...selectedAnswers,
                            [currentQuestionIdx]: oIdx,
                          });
                        }}
                        style={{
                          background: isSelected
                            ? 'rgba(212, 175, 55, 0.18)'
                            : 'rgba(13, 11, 8, 0.65)',
                          border: `1px solid ${isSelected ? 'var(--gold-sacred)' : 'rgba(212, 175, 55, 0.2)'}`,
                          padding: '0.65rem 0.85rem',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.65rem',
                          transition: 'all 0.18s ease',
                          minHeight: '48px',
                          boxShadow: isSelected ? '0 0 12px rgba(212, 175, 55, 0.2)' : 'none',
                        }}
                      >
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            border: `2px solid ${isSelected ? 'var(--gold-sacred)' : 'var(--text-dust)'}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {isSelected && (
                            <div
                              style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: 'var(--gold-sacred)',
                              }}
                            />
                          )}
                        </div>
                        <span
                          style={{
                            fontSize: '0.88rem',
                            lineHeight: 1.35,
                            color: isSelected ? 'var(--gold-radiance)' : 'var(--text-vellum)',
                            fontWeight: isSelected ? 600 : 400,
                          }}
                        >
                          {opt}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.5rem',
                    borderTop: '1px solid rgba(212, 175, 55, 0.12)',
                  }}
                >
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx((i) => i - 1)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                      color: currentQuestionIdx === 0 ? 'var(--text-dust)' : 'var(--text-vellum)',
                      padding: '0.5rem 1.1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      cursor: currentQuestionIdx === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    ← Previous
                  </button>

                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <button
                      onClick={() => {
                        if (confirm('Cancel assessment and return to catalog?')) {
                          setActiveQuiz(null);
                        }
                      }}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dust)',
                        cursor: 'pointer',
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.85rem',
                      }}
                    >
                      Exit
                    </button>

                    {currentQuestionIdx < activeQuiz.totalQuestions - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIdx((i) => i + 1)}
                        className="gold-button"
                        style={{
                          padding: '0.55rem 1.4rem',
                          borderRadius: '20px',
                          fontSize: '0.88rem',
                        }}
                      >
                        Next Question →
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={isSubmitting}
                        style={{
                          background: 'linear-gradient(135deg, #48bb78 0%, #2f855a 100%)',
                          border: 'none',
                          color: '#fff',
                          padding: '0.55rem 1.5rem',
                          borderRadius: '20px',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          cursor: isSubmitting ? 'wait' : 'pointer',
                          boxShadow: '0 4px 15px rgba(72, 187, 120, 0.3)',
                        }}
                      >
                        {isSubmitting ? 'Evaluating...' : 'Submit Assessment ✓'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            STATE 3: CATALOG BROWSER & FILTERING
        ========================================================================== */}
        {!activeQuiz && !attemptResult && (
          <div>
            {/* Card Navigation Segmented Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
              <div className="card-nav-tabs" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
                {Object.entries(DOMAIN_LABELS).map(([domainKey, meta]) => {
                  const isActive = selectedDomain === domainKey;
                  return (
                    <button
                      key={domainKey}
                      onClick={() => setSelectedDomain(domainKey)}
                      className={`card-nav-tab ${isActive ? 'active' : ''}`}
                      style={{
                        padding: '0.45rem 0.95rem',
                        fontSize: '0.84rem',
                      }}
                    >
                      <span style={{ fontSize: '1.05rem' }}>{meta.icon}</span>
                      <span>{meta.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Secondary Controls: Search & Difficulty */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2.5rem',
                background: 'rgba(20, 17, 11, 0.88)',
                backdropFilter: 'blur(12px)',
                padding: '0.85rem 1.4rem',
                borderRadius: '12px',
                border: '1px solid rgba(212, 175, 55, 0.22)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Difficulty selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dust)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Difficulty:
                </span>
                <div style={{ display: 'flex', gap: '0.35rem', background: 'rgba(13, 11, 8, 0.7)', padding: '3px', borderRadius: '20px', border: '1px solid rgba(212, 175, 55, 0.15)' }}>
                  {['all', 'beginner', 'intermediate', 'advanced'].map((diff) => {
                    const isDiffActive = selectedDifficulty === diff;
                    return (
                      <button
                        key={diff}
                        onClick={() => setSelectedDifficulty(diff)}
                        style={{
                          background: isDiffActive
                            ? 'linear-gradient(135deg, var(--gold-sacred) 0%, var(--gold-antique) 100%)'
                            : 'transparent',
                          color: isDiffActive ? '#0D0B08' : 'var(--text-vellum)',
                          border: 'none',
                          padding: '0.3rem 0.75rem',
                          borderRadius: '16px',
                          fontSize: '0.78rem',
                          fontWeight: isDiffActive ? 700 : 500,
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {diff}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Search Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  loadQuizzes();
                }}
                style={{ display: 'flex', gap: '0.5rem' }}
              >
                <input
                  type="text"
                  placeholder="Search topics, verses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'rgba(13, 11, 8, 0.7)',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                    color: 'var(--text-vellum)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: 'rgba(212, 175, 55, 0.2)',
                    border: '1px solid var(--gold-sacred)',
                    color: 'var(--gold-radiance)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: '6px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  Search
                </button>
              </form>
            </div>

            {/* Quiz Cards Grid */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-dust)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🪷</div>
                Loading classical Vedic assessments...
              </div>
            ) : quizzes.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 1.5rem',
                  background: selectedDomain === 'custom' ? 'rgba(236, 72, 153, 0.04)' : 'var(--surface-stone)',
                  borderRadius: '12px',
                  border: selectedDomain === 'custom' ? '1px dashed rgba(236, 72, 153, 0.35)' : '1px dashed rgba(212, 175, 55, 0.2)',
                }}
              >
                <div style={{ fontSize: '2.8rem', marginBottom: '0.75rem' }}>
                  {selectedDomain === 'custom' ? '✨' : '📜'}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    marginBottom: '0.5rem',
                    color: selectedDomain === 'custom' ? '#f472b6' : 'var(--text-vellum)',
                  }}
                >
                  {selectedDomain === 'custom'
                    ? 'No Custom Quizzes Created Yet'
                    : 'No Quizzes Found for Current Filter'}
                </h3>
                <p
                  style={{ color: 'var(--text-dust)', fontSize: '0.92rem', marginBottom: '1.5rem', maxWidth: '520px', margin: '0 auto 1.5rem' }}
                >
                  {selectedDomain === 'custom'
                    ? 'Create an interactive quiz on any ancient wisdom topic with up to 15 questions generated instantly by the AI Sage!'
                    : 'Try adjusting the domain or generate an on-the-fly AI assessment.'}
                </p>
                <button
                  onClick={() => setShowGenerateModal(true)}
                  className="gold-button"
                  style={{ padding: '0.7rem 1.8rem', borderRadius: '25px', fontWeight: 700 }}
                >
                  ✨ Create Quiz from Topic Now
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {quizzes.map((quiz) => {
                  const domainMeta = DOMAIN_LABELS[quiz.domain] || DOMAIN_LABELS.general;
                  const isUserCreated =
                    quiz.isDynamic ||
                    quiz.domain === 'custom' ||
                    quiz.tags?.includes('user-created') ||
                    quiz.tags?.includes('custom') ||
                    quiz.tags?.includes('your-quiz');

                  return (
                    <div
                      key={quiz.id}
                      className="temple-card temple-card-interactive"
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        borderTop: isUserCreated ? '3px solid #ec4899' : `3px solid ${domainMeta.color}`,
                        boxShadow: isUserCreated
                          ? '0 10px 32px -4px rgba(0, 0, 0, 0.65), 0 0 20px rgba(236, 72, 153, 0.2)'
                          : `0 10px 32px -4px rgba(0, 0, 0, 0.65), 0 0 20px ${domainMeta.color}15`,
                      }}
                      onClick={() => handleStartQuiz(quiz.id)}
                    >
                      <div>
                        {/* Domain Badge & Difficulty */}
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1.25rem',
                            flexWrap: 'wrap',
                            gap: '0.4rem',
                          }}
                        >
                          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
                            {isUserCreated && (
                              <span
                                className="badge"
                                style={{
                                  background: 'rgba(236, 72, 153, 0.15)',
                                  color: '#f472b6',
                                  borderColor: 'rgba(236, 72, 153, 0.45)',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  boxShadow: '0 0 10px rgba(236, 72, 153, 0.2)',
                                }}
                              >
                                <span>✨</span>
                                <span>Your Quiz</span>
                              </span>
                            )}
                            <span
                              className="badge"
                              style={{
                                background: `${domainMeta.color}14`,
                                color: domainMeta.color,
                                borderColor: `${domainMeta.color}45`,
                                fontSize: '0.78rem',
                                fontWeight: 700,
                              }}
                            >
                              <span>{domainMeta.icon}</span>
                              <span>{domainMeta.label}</span>
                            </span>
                          </div>

                          <span
                            style={{
                              fontSize: '0.74rem',
                              textTransform: 'uppercase',
                              color:
                                quiz.difficulty === 'advanced'
                                  ? '#fc8181'
                                  : quiz.difficulty === 'intermediate'
                                    ? 'var(--gold-radiance)'
                                    : '#68d391',
                              fontWeight: 700,
                              letterSpacing: '0.06em',
                              background: 'rgba(0, 0, 0, 0.3)',
                              padding: '0.15rem 0.55rem',
                              borderRadius: '9999px',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            {quiz.difficulty}
                          </span>
                        </div>

                        {/* Title */}
                        <h3
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.25rem',
                            fontWeight: 700,
                            marginBottom: '0.75rem',
                            color: 'var(--text-vellum)',
                            lineHeight: 1.35,
                          }}
                        >
                          {quiz.title}
                        </h3>

                        {/* Description */}
                        {quiz.description && (
                          <p
                            style={{
                              color: 'var(--text-dust)',
                              fontSize: '0.9rem',
                              lineHeight: 1.6,
                              marginBottom: '1.25rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {quiz.description}
                          </p>
                        )}

                        {/* Tags */}
                        {quiz.tags && quiz.tags.length > 0 && (
                          <div
                            style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.35rem',
                              marginBottom: '1.5rem',
                            }}
                          >
                            {quiz.tags.slice(0, 4).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                style={{
                                  fontSize: '0.72rem',
                                  background: 'rgba(212, 175, 55, 0.08)',
                                  color: 'var(--gold-radiance)',
                                  padding: '0.18rem 0.55rem',
                                  borderRadius: '6px',
                                  border: '1px solid rgba(212, 175, 55, 0.18)',
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                          paddingTop: '1.25rem',
                          marginTop: '0.5rem',
                        }}
                      >
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-dust)', fontWeight: 600 }}>
                          📝 {quiz.questionCount} Questions
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartQuiz(quiz.id);
                          }}
                          className="btn-outline-sacred card-action-link"
                          style={{
                            padding: '0.45rem 1.15rem',
                            fontSize: '0.84rem',
                            fontWeight: 700,
                            borderColor: domainMeta.color,
                            color: domainMeta.color,
                            background: `${domainMeta.color}10`,
                          }}
                        >
                          <span>Begin Test</span>
                          <span className="action-arrow">→</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            DYNAMIC AI QUIZ GENERATION MODAL
        ========================================================================== */}
        {showGenerateModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
            }}
          >
            <div
              className="temple-card"
              style={{
                maxWidth: '560px',
                width: '100%',
                maxHeight: '92vh',
                overflowY: 'auto',
                padding: '1.25rem 1.6rem',
                border: '1px solid var(--gold-sacred)',
                boxShadow: '0 8px 40px rgba(212, 175, 55, 0.25)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.65rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.3rem' }}>✨</span>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        color: 'var(--gold-sacred)',
                        margin: 0,
                      }}
                    >
                      Create Quiz from Topic
                    </h3>
                    <span style={{ fontSize: '0.72rem', color: '#f472b6', fontWeight: 600 }}>
                      Saves to &quot;Your Quizzes&quot; • Up to 15 Questions
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-dust)',
                    fontSize: '1.3rem',
                    cursor: 'pointer',
                    padding: '0.2rem',
                  }}
                >
                  ✕
                </button>
              </div>

              <p style={{ color: 'var(--text-dust)', fontSize: '0.8rem', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                Enter any spiritual, philosophical, or practical topic. The AI Sage will synthesize an authentic
                assessment grounded in Vedic principles that you can take immediately.
              </p>

              <form onSubmit={handleGenerateAIQuiz}>
                {/* Specific Topic Input - Primary */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      marginBottom: '0.3rem',
                      color: 'var(--gold-radiance)',
                      fontWeight: 600,
                    }}
                  >
                    Enter Topic or Concept <span style={{ color: '#fc8181' }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sthitaprajna, Tridoshas in Winter, Chanakya's Four Expedients..."
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(13, 11, 8, 0.9)',
                      border: '1px solid rgba(212, 175, 55, 0.45)',
                      color: 'var(--text-vellum)',
                      padding: '0.55rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      outline: 'none',
                      boxShadow: '0 0 10px rgba(212, 175, 55, 0.1)',
                    }}
                  />
                </div>

                {/* 2-Column Grid: Domain Picker & Guru Picker side-by-side to save vertical space */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.65rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        marginBottom: '0.3rem',
                        color: 'var(--text-vellum)',
                      }}
                    >
                      Category / Tradition
                    </label>
                    <select
                      value={genDomain}
                      onChange={(e) => setGenDomain(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'rgba(13, 11, 8, 0.8)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: 'var(--text-vellum)',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    >
                      <option value="gita">🏹 Bhagavad Gita</option>
                      <option value="chanakya">🏛️ Chanakya Neeti</option>
                      <option value="upanishads">✨ Upanishads</option>
                      <option value="ayurveda">🌿 Ayurveda</option>
                      <option value="mahabharata">⚔️ Mahabharata</option>
                      <option value="ramayana">🔆 Ramayana</option>
                      <option value="panchatantra">📖 Panchatantra</option>
                      <option value="yoga">🧘 Yoga Sutras</option>
                      <option value="general">🕉️ Universal Vedic</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        marginBottom: '0.3rem',
                        color: 'var(--text-vellum)',
                      }}
                    >
                      Sage Voice (Optional)
                    </label>
                    <select
                      value={genGuru}
                      onChange={(e) => {
                        const guru = e.target.value;
                        setGenGuru(guru);
                        if (guru === 'krishna') setGenDomain('gita');
                        else if (guru === 'chanakya') setGenDomain('chanakya');
                        else if (guru === 'charaka') setGenDomain('ayurveda');
                        else if (guru === 'vyasa') setGenDomain('mahabharata');
                        else if (guru === 'patanjali') setGenDomain('yoga');
                      }}
                      style={{
                        width: '100%',
                        background: 'rgba(13, 11, 8, 0.8)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: 'var(--text-vellum)',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    >
                      <option value="">All Gurus</option>
                      <option value="krishna">Lord Krishna</option>
                      <option value="chanakya">Chanakya</option>
                      <option value="charaka">Vaidya Charaka</option>
                      <option value="vyasa">Sage Vyasa</option>
                      <option value="patanjali">Sage Patanjali</option>
                    </select>
                  </div>
                </div>

                {/* Difficulty & Count */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.65rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        marginBottom: '0.3rem',
                        color: 'var(--text-vellum)',
                      }}
                    >
                      Difficulty Level
                    </label>
                    <select
                      value={genDifficulty}
                      onChange={(e) => setGenDifficulty(e.target.value as any)}
                      style={{
                        width: '100%',
                        background: 'rgba(13, 11, 8, 0.8)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        color: 'var(--text-vellum)',
                        padding: '0.5rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.82rem',
                        outline: 'none',
                      }}
                    >
                      <option value="beginner">Beginner (Sadhaka)</option>
                      <option value="intermediate">Intermediate (Pandita)</option>
                      <option value="advanced">Advanced (Acharya)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.78rem',
                        marginBottom: '0.3rem',
                        color: 'var(--text-vellum)',
                      }}
                    >
                      Question Count: <strong style={{ color: 'var(--gold-radiance)' }}>{genCount}</strong>
                    </label>
                    <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                      {[3, 5, 8, 10, 15].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGenCount(num)}
                          style={{
                            flex: 1,
                            minWidth: '32px',
                            padding: '0.25rem 0.2rem',
                            borderRadius: '5px',
                            border: `1px solid ${genCount === num ? 'var(--gold-sacred)' : 'rgba(212, 175, 55, 0.25)'}`,
                            background: genCount === num ? 'linear-gradient(135deg, rgba(212, 175, 55, 0.3) 0%, rgba(184, 134, 11, 0.2) 100%)' : 'rgba(0,0,0,0.4)',
                            color: genCount === num ? 'var(--gold-radiance)' : 'var(--text-dust)',
                            fontWeight: genCount === num ? 700 : 500,
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {num} Qs
                        </button>
                      ))}
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={genCount}
                      onChange={(e) => setGenCount(Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: 'var(--gold-sacred)',
                      }}
                    />
                  </div>
                </div>

                {/* Modal Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => setShowGenerateModal(false)}
                    style={{
                      background: 'transparent',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'var(--text-vellum)',
                      padding: '0.5rem 1.1rem',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isGenerating || !genTopic.trim()}
                    className="gold-button"
                    style={{
                      padding: '0.55rem 1.4rem',
                      borderRadius: '20px',
                      fontSize: '0.88rem',
                      opacity: !genTopic.trim() ? 0.6 : 1,
                      cursor: !genTopic.trim() ? 'not-allowed' : 'pointer',
                    }}
                  >
                    {isGenerating ? `Synthesizing ${genCount} Qs...` : `✨ Generate & Start Quiz (${genCount} Qs)`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
