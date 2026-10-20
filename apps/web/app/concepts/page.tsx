'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// =========================================================================
// DATA STRUCTURES
// =========================================================================

interface WordMeaning {
  sanskrit: string;
  transliteration: string;
  meaning: string;
}

interface ChapterDetail {
  id: string;
  number: number;
  sanskritTitle: string;
  transliteration: string;
  englishTitle: string;
  summary: string;
  tags: string[];
  keyShloka: {
    speaker?: string;
    sanskrit: string;
    transliteration: string;
    translation: string;
    wordBreakdown?: WordMeaning[];
  };
  coreLesson: string;
  modernConnection: string;
  onlineReadUrl: string;
}

interface AncientBook {
  id: string;
  title: string;
  sanskritTitle: string;
  icon: string;
  color: string;
  author: string;
  period: string;
  scope: string;
  tradition: string;
  overview: string;
  fullOnlineUrl: string;
  chapters: ChapterDetail[];
}

// =========================================================================
// CANONICAL ANCIENT BOOKS REPOSITORY
// =========================================================================

const ANCIENT_BOOKS: AncientBook[] = [
  // -----------------------------------------------------------------------
  // 1. BHAGAVAD GITA (All 18 Chapters)
  // -----------------------------------------------------------------------
  {
    id: 'gita',
    title: 'Bhagavad Gita',
    sanskritTitle: 'श्रीमद्भगवद्गीता',
    icon: '🪷',
    color: '#D4AF37',
    author: 'Maharishi Vedavyasa (Krishna-Arjuna Dialogue)',
    period: '~500 BCE – 200 BCE',
    scope: '18 Chapters · 700 Shlokas',
    tradition: 'Prasthanatrayi · Bhishma Parva of Mahabharata',
    overview:
      'A 700-verse dialogue between Prince Arjuna and Lord Krishna on the battlefield of Kurukshetra. Each of the 18 chapters focuses on a different path to liberation — duty, action, devotion, psychological mastery, or transcendental knowledge.',
    fullOnlineUrl: 'https://www.holy-bhagavad-gita.org/',
    chapters: [
      {
        id: 'gita-ch-1',
        number: 1,
        sanskritTitle: 'अर्जुन विषाद योग',
        transliteration: 'Arjuna Vishada Yoga',
        englishTitle: "The Yoga of Arjuna's Grief",
        summary:
          'Arjuna sees his own teachers, mentors, and kinsmen aligned for battle. Overcome with ethical anguish and emotional paralysis, he drops his bow Gandiva.',
        tags: ['Grief', 'Duty', 'Paralysis', 'Dilemma'],
        keyShloka: {
          speaker: 'धृतराष्ट्र उवाच —',
          sanskrit:
            'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥',
          transliteration:
            'dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ |\nmāmakāḥ pāṇḍavāś caiva kim akurvata sañjaya ||',
          translation:
            'Dhritarashtra said: O Sanjaya, assembled on the sacred plain of Kurukshetra with a desire to fight, what did my sons and the sons of Pandu do?',
          wordBreakdown: [
            { sanskrit: 'धर्मक्षेत्रे', transliteration: 'dharma-kṣetre', meaning: 'in the field of righteousness' },
            { sanskrit: 'कुरुक्षेत्रे', transliteration: 'kuru-kṣetre', meaning: 'at the sacred field of Kurukshetra' },
            { sanskrit: 'समवेताः', transliteration: 'samavetāḥ', meaning: 'assembled together' },
            { sanskrit: 'युयुत्सवः', transliteration: 'yuyutsavaḥ', meaning: 'desiring to fight' },
            { sanskrit: 'मामकाः', transliteration: 'māmakāḥ', meaning: 'my people' },
            { sanskrit: 'पाण्डवाः', transliteration: 'pāṇḍavāḥ', meaning: 'the sons of Pandu' },
          ],
        },
        coreLesson:
          'Even the greatest warrior can be paralysed by emotion. Acknowledging grief is the first step to wisdom.',
        modernConnection:
          'Arjuna shows classic acute stress response symptoms — racing heart, trembling limbs, mental fog. Modern psychology calls this "crisis paralysis." Before we can solve a life dilemma, we must face our subconscious attachments.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/1',
      },
      {
        id: 'gita-ch-2',
        number: 2,
        sanskritTitle: 'सांख्य योग',
        transliteration: 'Sankhya Yoga',
        englishTitle: 'The Yoga of Knowledge',
        summary:
          'Krishna reveals the immortal nature of the Soul (Atman), the transient nature of the body, and introduces the foundational formula of Nishkama Karma.',
        tags: ['Soul', 'Immortality', 'Nishkama Karma', 'Equanimity'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
          transliteration:
            'karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo \'stv akarmaṇi ||',
          translation:
            'You have a right only to perform your duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your attachment be to inaction.',
          wordBreakdown: [
            { sanskrit: 'कर्मणि', transliteration: 'karmaṇi', meaning: 'in action / duty' },
            { sanskrit: 'एव', transliteration: 'eva', meaning: 'only' },
            { sanskrit: 'अधिकारः', transliteration: 'adhikāraḥ', meaning: 'right / mastery' },
            { sanskrit: 'ते', transliteration: 'te', meaning: 'your' },
            { sanskrit: 'मा फलेषु', transliteration: 'mā phaleṣu', meaning: 'never in the results' },
            { sanskrit: 'अकर्मणि', transliteration: 'akarmaṇi', meaning: 'in inaction / sloth' },
          ],
        },
        coreLesson:
          'Focus 100% of your energy on your craft and preparation, not on outcome anxiety.',
        modernConnection:
          'Outcome bias and anxiety cripple modern high-performers during exams and career interviews. Detaching from the scoreboard while giving full effort maximizes flow state and psychological resilience.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/2',
      },
      {
        id: 'gita-ch-3',
        number: 3,
        sanskritTitle: 'कर्म योग',
        transliteration: 'Karma Yoga',
        englishTitle: 'The Yoga of Action',
        summary:
          'Krishna teaches that one cannot abstain from action. One must perform duties as a sacred contribution to society (Lokasamgraha) without selfish desire.',
        tags: ['Action', 'Duty', 'Selfless Work', 'Lokasamgraha'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'यद्यदाचरति श्रेष्ठस्तत्तदेवेतरोजनः।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते॥',
          transliteration:
            'yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṁ kurute lokas tad anuvartate ||',
          translation:
            'Whatever standard a great person sets by exemplary action, ordinary people follow. Whatever benchmark they establish, the entire world pursues.',
        },
        coreLesson:
          'Leadership is not about commanding others; it is about inspiring through personal integrity.',
        modernConnection:
          'In modern corporate culture and parenting, authentic values are caught, not taught. Leaders who hold themselves to high ethical benchmarks naturally build high-trust organizations.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/3',
      },
      {
        id: 'gita-ch-4',
        number: 4,
        sanskritTitle: 'ज्ञान कर्म संन्यास योग',
        transliteration: 'Jnana Karma Sanyasa Yoga',
        englishTitle: 'The Yoga of Knowledge & Renunciation of Action',
        summary:
          'The ancient lineage of spiritual wisdom is explained. Action ignited by the fire of wisdom ceases to create binding karma.',
        tags: ['Wisdom', 'Avatara', 'Dharma', 'Sacrifice'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥',
          transliteration:
            'yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||',
          translation:
            'Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharata, at that time I manifest Myself.',
        },
        coreLesson:
          'When moral order collapses, the universe naturally organizes forces to restore balance.',
        modernConnection:
          'Whenever corrupt or toxic systems reach an unsustainable tipping point, whistleblowers, courageous innovators, and reformers emerge to realign humanity with ethical principles.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/4',
      },
      {
        id: 'gita-ch-5',
        number: 5,
        sanskritTitle: 'कर्म संन्यास योग',
        transliteration: 'Karma Sanyasa Yoga',
        englishTitle: 'The Yoga of Renunciation',
        summary:
          'Clarifies the harmony between outer duty and inner detachment. Like a lotus leaf untouched by water, the wise person acts in the world without being stained.',
        tags: ['Renunciation', 'Inner Peace', 'Lotus Metaphor'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥',
          transliteration:
            'brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā ||',
          translation:
            'One who acts offering all deeds to the Supreme, abandoning all selfish attachment, remains untouched by negativity, like a lotus leaf in water.',
        },
        coreLesson:
          'You do not have to escape the world to be pure. Engage fully, but do not let greed stick to your soul.',
        modernConnection:
          'You can work in high-pressure finance, tech, or politics without letting cynical, manipulative office politics erode your inner character.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/5',
      },
      {
        id: 'gita-ch-6',
        number: 6,
        sanskritTitle: 'आत्मसंयम योग',
        transliteration: 'Atma Samyama Yoga',
        englishTitle: 'The Yoga of Meditation & Mind Mastery',
        summary:
          'The practical manual of Dhyana (meditation). The mind can be your greatest friend or your deadliest adversary depending on how it is disciplined.',
        tags: ['Meditation', 'Mind Control', 'Habits', 'Self-Mastery'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
          transliteration:
            'uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||',
          translation:
            'Elevate yourself through your own mind; do not degrade yourself. For the mind alone is your best ally, and the mind alone is your worst enemy.',
        },
        coreLesson:
          'Nobody can save you if your own self-talk is destructive; nobody can defeat you if your mind is disciplined.',
        modernConnection:
          'Modern cognitive behavioral therapy (CBT) revolves around this truth: reframing negative self-talk into constructive agency is the key to overcoming depression and self-sabotage.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/6',
      },
      {
        id: 'gita-ch-7',
        number: 7,
        sanskritTitle: 'ज्ञान विज्ञान योग',
        transliteration: 'Jnana Vijnana Yoga',
        englishTitle: 'The Yoga of Knowledge & Realization',
        summary:
          'Krishna reveals the twin energies of the cosmos: the material nature (Prakriti) and the conscious spirit (Purusha).',
        tags: ['Creation', 'Cosmic Energy', 'Realization'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय।\nमयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव॥',
          transliteration:
            'mattaḥ parataraṁ nānyat kiñcid asti dhanañjaya |\nmayi sarvam idaṁ protaṁ sūtre maṇi-gaṇā iva ||',
          translation:
            'There is nothing higher than Me, O Arjuna. All this universe is strung upon Me, like pearls upon a sacred thread.',
        },
        coreLesson:
          'Behind diverse physical phenomena lies an underlying unifying consciousness.',
        modernConnection:
          'Just as theoretical physics seeks the unified field theory behind all forces, ancient Indian thought recognized the fundamental interconnection of all life.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/7',
      },
      {
        id: 'gita-ch-8',
        number: 8,
        sanskritTitle: 'अक्षरब्रह्म योग',
        transliteration: 'Akshara Brahma Yoga',
        englishTitle: 'The Yoga of the Imperishable Absolute',
        summary:
          'Explains the mystery of death, the nature of continuous mindfulness, and how the focus of one’s lifetime thoughts determines transition.',
        tags: ['Mindfulness', 'Death', 'Cosmic Cycles'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम्।\nयः प्रयाति स मद्भावं याति नास्त्यत्र संशयः॥',
          transliteration:
            'anta-kāle ca mām eva smaran muktvā kalevaram |\nyaḥ prayāti sa mad-bhāvaṁ yāti nāsty atra saṁśayaḥ ||',
          translation:
            'Whoever remembers Me at the time of leaving the body attains My divine state; of this there is no doubt.',
        },
        coreLesson:
          'What you practice every day is what will spontaneously surface in times of extreme crisis.',
        modernConnection:
          'Under extreme pressure, soldiers, surgeons, and athletes do not rise to the occasion; they sink to the level of their daily training habits.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/8',
      },
      {
        id: 'gita-ch-9',
        number: 9,
        sanskritTitle: 'राजविद्या राजगुह्य योग',
        transliteration: 'Raja Vidya Raja Guhya Yoga',
        englishTitle: 'The Yoga of Sovereign Science & Secret',
        summary:
          'The most profound confidential science of devotion: how the Divine personally supports those who surrender wholeheartedly with pure intention.',
        tags: ['Grace', 'Devotion', 'Protection'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
          transliteration:
            'ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||',
          translation:
            'To those who constantly contemplate Me with undivided devotion, I personally provide what they lack and preserve what they possess.',
        },
        coreLesson:
          'Complete trust in righteous principles dissolves the paralysis of chronic worry.',
        modernConnection:
          'Psychological surrender to purpose frees immense cognitive bandwidth previously wasted on catastrophic future anxieties.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/9',
      },
      {
        id: 'gita-ch-10',
        number: 10,
        sanskritTitle: 'विभूति योग',
        transliteration: 'Vibhuti Yoga',
        englishTitle: 'The Yoga of Divine Splendors',
        summary:
          'Krishna enumerates how the Divine is present as the highest excellence in every category of creation.',
        tags: ['Excellence', 'Divine Spark', 'Wonder'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा।\nतत्तदेवावगच्छ त्वं मम तेजोऽंशसम्भवम्॥',
          transliteration:
            'yad yad vibhūtimat sattvaṁ śrīmad ūrjitam eva vā |\ntat tad evāvagaccha tvaṁ mama tejo-\'ṁśa-sambhavam ||',
          translation:
            'Whatever is glorious, majestic, beautiful, or mighty in this world, understand it to be born of a mere spark of My supreme splendor.',
        },
        coreLesson:
          'Cultivate awe for exceptional beauty, intelligence, and virtue in the world around you.',
        modernConnection:
          'Cultivating daily gratitude and awe for nature and human brilliance is scientifically proven to reduce cortisol and increase creative problem-solving.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/10',
      },
      {
        id: 'gita-ch-11',
        number: 11,
        sanskritTitle: 'विश्वरूप दर्शन योग',
        transliteration: 'Vishwarupa Darshana Yoga',
        englishTitle: 'The Yoga of the Cosmic Vision',
        summary:
          'Arjuna receives divine sight and witnesses the awe-inspiring, terrifying cosmic form of Krishna encompassing time, life, and annihilation.',
        tags: ['Cosmic Vision', 'Time', 'Awe', 'Kala'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'कालोऽस्मि लोकक्षयकृत्प्रवृद्धो लोकान्समाहर्तुमिह प्रवृत्ततः।\nऋतेऽपि त्वां न भविष्यन्ति सर्वे येऽवस्थिताः प्रत्यनीकेषु योधाः॥',
          transliteration:
            'kālo \'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ |\nṛte \'pi tvāṁ na bhaviṣyanti sarve ye \'vasthitāḥ pratyanīkeṣu yodhāḥ ||',
          translation:
            'I am mighty Time, the shatterer of worlds, engaged in subduing the realms. Even without your fight, all the warriors assembled in enemy ranks will cease to be.',
        },
        coreLesson:
          'You are an instrument of a much greater cosmic timeline. Do your duty without arrogant delusion of control.',
        modernConnection:
          'When Oppenheimer witnessed the first atomic detonation, this is the shloka he recalled: recognizing that human arrogance is dwarfed by the unstoppable forces of nature.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/11',
      },
      {
        id: 'gita-ch-12',
        number: 12,
        sanskritTitle: 'भक्ति योग',
        transliteration: 'Bhakti Yoga',
        englishTitle: 'The Yoga of Devotion',
        summary:
          'Outlines the qualities of an authentic devotee: non-envious, compassionate, patient, free from egoism, balanced in joy and grief.',
        tags: ['Devotion', 'Compassion', 'Emotional Balance'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥',
          transliteration:
            'yasmān nodvijate loko lokān nodvijate ca yaḥ |\nharṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ ||',
          translation:
            'One by whom the world is not agitated and who is not agitated by the world, free from euphoric extremes, anger, fear, and anxiety — such a person is dear to Me.',
        },
        coreLesson:
          'True spiritual maturity means you do not disrupt others, nor do others easily upset your calm.',
        modernConnection:
          'This is the pinnacle of Emotional Intelligence (EQ): possessing an unshakeable inner anchor that neither reacts defensively to criticism nor seeks toxic external validation.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/12',
      },
      {
        id: 'gita-ch-13',
        number: 13,
        sanskritTitle: 'क्षेत्र क्षेत्रज्ञ विभाग योग',
        transliteration: 'Kshetra Kshetragnya Vibhaga Yoga',
        englishTitle: 'The Yoga of the Field & the Knower',
        summary:
          'Distinguishes between the biological field of experience (Kshetra) and the silent conscious observer (Kshetragnya).',
        tags: ['Observer', 'Consciousness', 'Metacognition'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते।\nएतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः॥',
          transliteration:
            'idaṁ śarīraṁ kaunteya kṣetram ity abhidhīyate |\netad yo vetti taṁ prāhuḥ kṣetrajña iti tad-vidaḥ ||',
          translation:
            'This physical body, O son of Kunti, is called the Field; and the one who knows it is called the Knower of the Field by the wise.',
        },
        coreLesson:
          'You are not your fleeting thoughts or pains; you are the awareness observing them.',
        modernConnection:
          'Practicing metacognitive awareness ("I am noticing an angry thought" rather than "I am angry") allows you to break free from reactive emotional loops.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/13',
      },
      {
        id: 'gita-ch-14',
        number: 14,
        sanskritTitle: 'गुणत्रय विभाग योग',
        transliteration: 'Gunatraya Vibhaga Yoga',
        englishTitle: 'The Yoga of the Three Gunas',
        summary:
          'Analyzes how the three fundamental qualities of nature — Sattva (clarity), Rajas (passion/restlessness), and Tamas (inertia/fog) — dictate human behavior.',
        tags: ['Gunas', 'Sattva', 'Rajas', 'Tamas', 'Psychology'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान्।\nजन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते॥',
          transliteration:
            'guṇān etān atītya trīn dehī deha-samudbhavān |\njanma-mṛtyu-jarā-duḥkhair vimukto \'mṛtam aśnute ||',
          translation:
            'Transcending these three qualities that arise from material nature, the embodied soul is freed from birth, death, decay, and sorrow, tasting immortality.',
        },
        coreLesson:
          'Diagnose whether your mind is in Tamas (sluggish procrastination), Rajas (hyperactive agitation), or Sattva (lucid calm), and consciously cultivate Sattva.',
        modernConnection:
          'Understanding your mental state helps you make better lifestyle choices — like reducing social media doomscrolling (Tamas/Rajas) in favor of deep creative focus and sleep (Sattva).',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/14',
      },
      {
        id: 'gita-ch-15',
        number: 15,
        sanskritTitle: 'पुरुषोत्तम योग',
        transliteration: 'Purushottama Yoga',
        englishTitle: 'The Yoga of the Supreme Divine Person',
        summary:
          'The metaphor of the cosmic Ashvattha tree with roots above and branches below. Cutting attachments with the axe of dispassion.',
        tags: ['Cosmic Tree', 'Detachment', 'Supreme Being'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च।\nवेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम्॥',
          transliteration:
            'sarvasya cāhaṁ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṁ ca |\nvedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ||',
          translation:
            'I am seated in everyone’s heart, and from Me come memory, knowledge, and their loss. By all the Vedas, I alone am to be known; I am the author of Vedanta and the knower of the Vedas.',
        },
        coreLesson:
          'Inner wisdom and intuition come from connecting to the deep conscious core within you.',
        modernConnection:
          'Intuition is not magic; it is the synthesis of deep subconscious pattern recognition when the conscious ego quiets down.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/15',
      },
      {
        id: 'gita-ch-16',
        number: 16,
        sanskritTitle: 'दैवासुर सम्पद् विभाग योग',
        transliteration: 'Daivasura Sampad Vibhaga Yoga',
        englishTitle: 'The Yoga of Divine & Demonic Qualities',
        summary:
          'Contrasts noble qualities (fearlessness, purity, charity, forgiveness) against destructive traits (pride, arrogance, deceit, anger, harshness).',
        tags: ['Ethics', 'Integrity', 'Dark Triad', 'Virtue'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः।\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत्॥',
          transliteration:
            'tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ |\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet ||',
          translation:
            'There are three gateways leading to the ruin of the self: Lust, Anger, and Greed. Therefore, one must renounce these three.',
        },
        coreLesson:
          'Uncontrolled impulse, resentment, and insatiable greed always destroy life relationships and mental sanity.',
        modernConnection:
          'Every toxic corporate scandal, financial fraud, and personal burnout crisis can be traced back to the deadly trio of impulsivity, rage, and unchecked greed.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/16',
      },
      {
        id: 'gita-ch-17',
        number: 17,
        sanskritTitle: 'श्रद्धात्रय विभाग योग',
        transliteration: 'Shraddhatraya Vibhaga Yoga',
        englishTitle: 'The Yoga of the Threefold Faith',
        summary:
          'Explains how faith, diet, speech, and charity are shaped by the three Gunas. The sacred power of speech that is truthful, beneficial, and pleasing.',
        tags: ['Speech', 'Diet', 'Faith', 'Charity'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत्।\nस्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते॥',
          transliteration:
            'anudvega-karaṁ vākyaṁ satyaṁ priya-hitaṁ ca yat |\nsvādhyāyābhyasanaṁ caiva vāṅ-mayaṁ tapa ucyate ||',
          translation:
            'Speech that causes no agitation, that is truthful, pleasant, and beneficial, combined with regular self-study, is declared the austerity of speech.',
        },
        coreLesson:
          'Never use honesty as a blunt weapon to cruelty. Speak what is true, kind, and useful.',
        modernConnection:
          'Before posting or replying in heated communications: Ask: Is it true? Is it necessary? Is it kind? If not, pause before hitting send.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/17',
      },
      {
        id: 'gita-ch-18',
        number: 18,
        sanskritTitle: 'मोक्ष संन्यास योग',
        transliteration: 'Moksha Sanyasa Yoga',
        englishTitle: 'The Yoga of Liberation by Renunciation',
        summary:
          'The master synthesis of the entire Gita. Summarizes the nature of work, determination, joy, and the crowning call to follow your authentic calling (Svabhava).',
        tags: ['Liberation', 'Svadharma', 'Surrender', 'Mastery'],
        keyShloka: {
          speaker: 'श्रीभगवानुवाच —',
          sanskrit:
            'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
          transliteration:
            'sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||',
          translation:
            'Abandoning all conventional dependencies, surrender unto Me alone. I shall deliver you from all distress and sins; do not grieve!',
        },
        coreLesson:
          'When you surrender the burden of ego and align with cosmic truth, fear vanishes completely.',
        modernConnection:
          'True freedom is not doing whatever whim arises; it is knowing who you are, fulfilling your authentic purpose without fear, and letting go of what you cannot control.',
        onlineReadUrl: 'https://www.holy-bhagavad-gita.org/chapter/18',
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 2. VALMIKI RAMAYANA (7 Kandas)
  // -----------------------------------------------------------------------
  {
    id: 'ramayana',
    title: 'Valmiki Ramayana',
    sanskritTitle: 'श्रीमद्वाल्मीकिरामायणम्',
    icon: '🏹',
    color: '#E06C75',
    author: 'Adi Kavi Maharishi Valmiki',
    period: '~1000 BCE – 500 BCE',
    scope: '7 Kandas · 24,000 Shlokas',
    tradition: 'Itihasa · Maryada Purushottama Canon',
    overview:
      'The primordial Sanskrit epic celebrating Maryada Purushottama Sri Rama — the embodiment of virtue, filial duty, unwavering truthfulness, sovereign governance, and victory of Dharma over tyranny.',
    fullOnlineUrl: 'https://www.valmikiramayan.net/',
    chapters: [
      {
        id: 'ram-kanda-1',
        number: 1,
        sanskritTitle: 'बालकाण्डम्',
        transliteration: 'Bala Kanda',
        englishTitle: 'The Book of Divine Youth & Promise',
        summary:
          'The birth of Rama in Ayodhya, his tutelage under Sage Vishvamitra, slaying of demoness Tataka, protection of sacred rituals, and the lifting of Shiva’s bow in Mithila to win Sita.',
        tags: ['Youth', 'Mentorship', 'Character', 'Preparation'],
        keyShloka: {
          sanskrit:
            'को न्वस्मिन् साम्प्रतं लोके गुणवान् कश्च वीर्यवान्।\nधर्मज्ञश्च कृतज्ञश्च सत्यवाक्यो दृढव्रतः॥',
          transliteration:
            'ko nv asmin sāmprataṁ loke guṇavān kaś ca vīryavān |\ndharmajñaś ca kṛtajñaś ca satya-vākyo dṛḍha-vrataḥ ||',
          translation:
            'Valmiki asks Narada: Who in this world today possesses noble virtue, unmatched prowess, deep knowledge of righteousness, gratitude, truthfulness, and steadfast resolve?',
        },
        coreLesson:
          'Greatness is not an accident of birth; it is built on disciplined mentorship, gratitude, and moral steadfastness.',
        modernConnection:
          'Early habits, respectful apprenticeship, and learning how to protect constructive work from toxic disruptions form the foundation of lifelong mastery.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/baala/sarga1/bala_1_frame.htm',
      },
      {
        id: 'ram-kanda-2',
        number: 2,
        sanskritTitle: 'अयोध्याकाण्डम्',
        transliteration: 'Ayodhya Kanda',
        englishTitle: 'The Book of Ayodhya & Sacrificial Duty',
        summary:
          'On the eve of Rama’s coronation, Queen Kaikeyi demands his fourteen-year exile. Rama accepts with tranquil grace to protect his father’s word and sovereign honor.',
        tags: ['Duty', 'Sacrifice', 'Parental Respect', 'Honor'],
        keyShloka: {
          sanskrit:
            'न ह्यतो धर्मचरणं किञ्चिदस्ति महत्तरम्।\nयथा पितरि शुश्रूषा तस्य वा वचनक्रिया॥',
          transliteration:
            'na hy ato dharma-caraṇaṁ kiñcid asti mahattaram |\nyathā pitari śuśrūṣā tasya vā vacana-kriyā ||',
          translation:
            'There is indeed no higher practice of righteousness than honoring one’s parents and upholding their honorable pledge with dignity.',
        },
        coreLesson:
          'Character is revealed when unexpected disaster strikes right when triumph was promised.',
        modernConnection:
          'When life abruptly cancels your promotions or plans through unfair circumstances, meeting adversity with calmness rather than bitterness defines your spiritual caliber.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/ayodhya/sarga1/ayodhya_1_frame.htm',
      },
      {
        id: 'ram-kanda-3',
        number: 3,
        sanskritTitle: 'अरण्यकाण्डम्',
        transliteration: 'Aranya Kanda',
        englishTitle: 'The Book of the Forest & Ordeal',
        summary:
          'Life in the sacred forests, encounters with sages and rakshasas, the golden deer illusion, and the tragic abduction of Sita by Ravana.',
        tags: ['Forest', 'Vigilance', 'Illusion', 'Separation'],
        keyShloka: {
          sanskrit:
            'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।\nराजा सर्वस्य लोकस्य देवानां मघवानिव॥',
          transliteration:
            'rāmo vigrahavān dharmaḥ sādhuḥ satya-parākramaḥ |\nrājā sarvasya lokasya devānāṁ maghavān iva ||',
          translation:
            'Rama is the living embodiment of righteousness, noble, valiant in truth, and protector of all worlds like Indra is to the gods.',
        },
        coreLesson:
          'Beware of superficial allurements that seem glittering (the golden deer); they often distract from safety.',
        modernConnection:
          'Modern get-rich-quick scams, deceptive social media promises, and addictions are modern golden deers that trap even smart people when vigilance drops.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/aranya/sarga1/aranya_1_frame.htm',
      },
      {
        id: 'ram-kanda-4',
        number: 4,
        sanskritTitle: 'किष्किन्धाकाण्डम्',
        transliteration: 'Kishkindha Kanda',
        englishTitle: 'The Book of Kishkindha & Sacred Alliance',
        summary:
          'Rama meets Hanuman and forms a sacred alliance with Sugriva at Lake Pampa. Overcoming despair, they mobilize the Vanara forces to search all four corners of the Earth.',
        tags: ['Friendship', 'Hanuman', 'Alliance', 'Determination'],
        keyShloka: {
          sanskrit:
            'उत्साहो बलवान् आर्य नास्त्युत्साहात् परं बलम्।\nसोत्साहस्य हि लोकेषु न किञ्चिदपि दुर्लभम्॥',
          transliteration:
            'utsāho balavān ārya nāsty utsāhāt paraṁ balam |\nsotsāhasya hi lokeṣu na kiñcid api durlabham ||',
          translation:
            'Enthusiasm and resolve are the greatest strength, O noble one! There is no power superior to unyielding enthusiasm. For one with enthusiasm, nothing in this world is unattainable.',
        },
        coreLesson:
          'Despair achieves nothing. Courageous action combined with high-trust alliances can move mountains.',
        modernConnection:
          'Teamwork, psychological safety, and infectious enthusiasm can conquer impossible startup goals when individuals stop pointing fingers and align on a shared quest.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/kish/sarga1/kishkindha_1_frame.htm',
      },
      {
        id: 'ram-kanda-5',
        number: 5,
        sanskritTitle: 'सुन्दरकाण्डम्',
        transliteration: 'Sundara Kanda',
        englishTitle: 'The Book of Beauty, Courage & Hanuman’s Leap',
        summary:
          'Hanuman leaps across the ocean to Lanka, discovers Sita in the Ashoka Vatika, delivers Rama’s signet ring, outwits Ravana’s court, and restores supreme hope.',
        tags: ['Courage', 'Hanuman', 'Devotion', 'Hope'],
        keyShloka: {
          sanskrit:
            'नमोऽस्तु रामाय सलक्ष्मणाय देव्यै च तस्यै जनकात्मजायै।\nनमोऽस्तु रुद्रेन्द्रयमानिलेभ्यो नमोऽस्तु चन्द्रार्कमरुद्गणेभ्यः॥',
          transliteration:
            'namo \'stu rāmāya sa-lakṣmaṇāya devyai ca tasyai janakātmajāyai |\nnamo \'stu rudrendra-yamānilebhyo namo \'stu candrārka-marud-gaṇebhyaḥ ||',
          translation:
            'Salutations to Rama along with Lakshmana, and to the divine Sita, daughter of Janaka! Salutations to Rudra, Indra, Yama, Vayu, and the celestial forces of Sun, Moon, and Maruts!',
        },
        coreLesson:
          'You possess latent powers inside you. All you need is selfless purpose to leap across oceans of doubt.',
        modernConnection:
          'Imposter syndrome vanishes when your motivation shifts from self-aggrandizement to serving others. Purpose unlocks reservoirs of focus and resilience.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/sundara/sarga1/sundara_1_frame.htm',
      },
      {
        id: 'ram-kanda-6',
        number: 6,
        sanskritTitle: 'युद्धकाण्डम्',
        transliteration: 'Yuddha Kanda',
        englishTitle: 'The Book of War, Justice & Victory',
        summary:
          'The building of Ram Setu across the ocean, the epic battle between the forces of Dharma and Ravana’s titans, the vanquishing of Ravana, and the sacred return to Ayodhya.',
        tags: ['Justice', 'Motherland', 'Leadership', 'Dharma'],
        keyShloka: {
          sanskrit:
            'अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते।\nजननी जन्मभूमिश्च स्वर्गादपि गरीयसी॥',
          transliteration:
            'api svarṇamayī laṅkā na me lakṣmaṇa rocate |\njananī janmabhūmiś ca svargād api garīyasī ||',
          translation:
            'Even though Lanka is made of solid gold, Lakshmana, it does not appeal to my heart. Mother and Motherland are far more exalted than heaven itself!',
        },
        coreLesson:
          'Material opulence can never buy honor, family roots, and the soil that nurtured your soul.',
        modernConnection:
          'No salary or foreign luxury compensates for abandoning your core cultural roots and integrity. True pride lies in giving back to your roots and loved ones.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/yuddha/sarga1/yuddha_1_frame.htm',
      },
      {
        id: 'ram-kanda-7',
        number: 7,
        sanskritTitle: 'उत्तरकाण्डम्',
        transliteration: 'Uttara Kanda',
        englishTitle: 'The Book of the Sovereign Ideal (Ramrajya)',
        summary:
          'The establishment of Ramrajya — the model of welfare governance where no citizen suffers from poverty, injustice, or untimely grief. The story of Lava and Kusha singing the epic.',
        tags: ['Ramrajya', 'Governance', 'Legacy', 'Public Duty'],
        keyShloka: {
          sanskrit:
            'न पर्यदेवयन् वृद्धा बालप्रेतेषु कर्मसु।\nसर्वं मुदितमेवासीत् सर्वो धर्मपरोऽभवत्॥',
          transliteration:
            'na paryadevayan vṛddhā bāla-preteṣu karmasu |\nsarvaṁ muditam evāsīt sarvo dharma-paro \'bhavat ||',
          translation:
            'In Ramrajya, no elder ever wept over the loss of a youth. All hearts were joyful, and every citizen was naturally devoted to righteousness.',
        },
        coreLesson:
          'The hallmark of a great civilization is that the vulnerable are protected and justice is universal.',
        modernConnection:
          'Good governance, corporate social responsibility, and ethical leadership must prioritize public well-being above short-term self-interest.',
        onlineReadUrl: 'https://www.valmikiramayan.net/utf8/yuddha/sarga128/yuddha_128_frame.htm',
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 3. PANCHATANTRA (5 Tantras)
  // -----------------------------------------------------------------------
  {
    id: 'panchatantra',
    title: 'Panchatantra',
    sanskritTitle: 'पञ्चतन्त्रम्',
    icon: '🐘',
    color: '#61AFEF',
    author: 'Pandit Vishnu Sharma',
    period: '~300 BCE',
    scope: '5 Tantras · Animal Fables & Neeti Sutras',
    tradition: 'Neeti Shastra · Applied Pragmatism & Strategy',
    overview:
      'The world’s most celebrated Sanskrit treatise on practical intelligence, statecraft, friendship, and conflict management, told through witty interconnected animal fables.',
    fullOnlineUrl: 'https://www.sacred-texts.com/hin/pancha/',
    chapters: [
      {
        id: 'pancha-1',
        number: 1,
        sanskritTitle: 'मित्रभेदः',
        transliteration: 'Mitra Bheda',
        englishTitle: 'The Estrangement of Friends',
        summary:
          'How the trusting friendship between the lion Pingalaka and the bull Sanjivaka was poisoned by the conniving jackal Damanaka through false rumors.',
        tags: ['Gossip', 'Manipulation', 'Trust', 'Vigilance'],
        keyShloka: {
          sanskrit:
            'यस्य नास्ति स्वयं प्रज्ञा शास्त्रं तस्य करोति किम्।\nलोचनाभ्यां विहीनस्य दर्पणः किं करिष्यति॥',
          transliteration:
            'yasya nāsti svayaṁ prajñā śāstraṁ tasya karoti kim |\nlocanābhyāṁ vihīnasya darpaṇaḥ kiṁ kariṣyati ||',
          translation:
            'For one who lacks their own discernment, what can scriptures do? For a person devoid of eyes, what purpose does a mirror serve?',
        },
        coreLesson:
          'Never permit cunning third parties to whisper doubts that poison your most loyal friendships.',
        modernConnection:
          'Office politics and toxic whisper networks routinely destroy high-performing partnerships. Always verify rumors directly with your trusted colleague.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/pancha/index.htm',
      },
      {
        id: 'pancha-2',
        number: 2,
        sanskritTitle: 'मित्रसम्प्राप्तिः',
        transliteration: 'Mitra Samprapti',
        englishTitle: 'The Winning of Friends (Alliance)',
        summary:
          'How four naturally incompatible creatures — a crow, mouse, turtle, and deer — formed an unbreakable bond and repeatedly saved one another from hunters.',
        tags: ['Diversity', 'Alliances', 'Loyalty', 'Survival'],
        keyShloka: {
          sanskrit:
            'अल्पैरपि हि वस्तुभिः संहतिः कार्यसाधिका।\nतृणैर्गुणत्वमापन्नैर्बध्यन्ते मत्तदन्तिनः॥',
          transliteration:
            'alpair api hi vastubhiḥ saṁhatiḥ kārya-sādhikā |\ntṛṇair guṇatvam āpannair badhyante matta-dantinaḥ ||',
          translation:
            'Even frail and small items, when united, accomplish momentous deeds. Tiny blades of grass woven into a rope can bind even a furious rogue elephant!',
        },
        coreLesson:
          'Strength is not in individual size, but in cohesive, diverse collaboration.',
        modernConnection:
          'A cross-functional team with varied skillsets (design, engineering, storytelling) outcompetes solitary geniuses every single time.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/pancha/index.htm',
      },
      {
        id: 'pancha-3',
        number: 3,
        sanskritTitle: 'काकोलूकीयम्',
        transliteration: 'Kakolukiyam',
        englishTitle: 'On Crows & Owls (War & Peace)',
        summary:
          'The ancient enmity between crows and owls. How a wise crow pretended to be injured, infiltrated the owl fortress as a spy, and eliminated the threat.',
        tags: ['Strategy', 'Espionage', 'Timing', 'Deception'],
        keyShloka: {
          sanskrit:
            'न विश्वसेदविश्वस्ते विश्वस्ते नातिविश्वसेत्।\nविश्वासाद्भयमुत्पन्नं मूलान्यपि निकृन्तति॥',
          transliteration:
            'na viśvased aviśvaste viśvaste nātiviśvaset |\nviśvāsād bhayam utpannaṁ mūlāny api nikṛntati ||',
          translation:
            'Never trust the untrustworthy, nor place blind trust even in the trusted. A danger born of misplaced trust tears up the deepest roots.',
        },
        coreLesson:
          'Maintain situational awareness. Overconfidence and naive trust invite disaster.',
        modernConnection:
          'Cybersecurity and zero-trust architectures in modern tech follow this rule: verify continuously, protect sensitive credentials, and never assume passive safety.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/pancha/index.htm',
      },
      {
        id: 'pancha-4',
        number: 4,
        sanskritTitle: 'लब्धप्रणाशम्',
        transliteration: 'Labdhapranasam',
        englishTitle: 'The Loss of Gains (Greed & Guile)',
        summary:
          'The monkey and the crocodile. How quick wit saved the monkey when the crocodile was lured by his wife’s greed into attempting to drown his friend.',
        tags: ['Presence of Mind', 'Greed', 'Quick Thinking'],
        keyShloka: {
          sanskrit:
            'आपत्सु ये न मुह्यन्ति धीराः पश्यन्ति चोभयम्।\nन तेषां सीदते बुद्धिर्गभीरमिव सागरम्॥',
          transliteration:
            'āpatsu ye na muhyanti dhīrāḥ paśyanti cobhayam |\nna teṣāṁ sīdate buddhir gabhīram iva sāgaram ||',
          translation:
            'The courageous who do not panic in emergencies and calmly observe both sides never lose their intellect; they remain deep like the ocean.',
        },
        coreLesson:
          'When caught in an unexpected trap, do not panic. Quick wit and psychological composure can save your life.',
        modernConnection:
          'In crisis management and public relations, panic makes situations 10x worse. Breathing, analyzing leverage, and acting deliberately resolves crises.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/pancha/index.htm',
      },
      {
        id: 'pancha-5',
        number: 5,
        sanskritTitle: 'अपरीक्षितकारकम्',
        transliteration: 'Apariksitakarakam',
        englishTitle: 'Action Without Examination (The Mongoose Fable)',
        summary:
          'The famous story of the loyal mongoose and the snake. The mother kills the bloodstained mongoose in hasty assumption, only to discover it had saved her baby from a cobra.',
        tags: ['Impulsivity', 'Assumptions', 'Patience', 'Tragedy'],
        keyShloka: {
          sanskrit:
            'सहसा विदधीत न क्रियां विवेकः परमापदां पदम्।\nवृणुते हि विमृश्यकारिणं गुणलुब्धाः स्वयमेव सम्पदः॥',
          transliteration:
            'sahasā vidadhīta na kriyāṁ vivekaḥ param-āpadāṁ padam |\nvṛṇute hi vimṛśya-kāriṇaṁ guṇa-lubdhāḥ svayam eva sampadaḥ ||',
          translation:
            'Never act in rash haste! Lack of discernment is the breeding ground of catastrophic disaster. Fortune, attracted by virtues, voluntarily crowns the thoughtful actor.',
        },
        coreLesson:
          'Never react on superficial appearances without verifying the facts.',
        modernConnection:
          'Mob outrage and cancel culture thrive on knee-jerk assumptions. Always take 24 hours to investigate facts before launching accusations.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/pancha/index.htm',
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 4. CHARAKA SAMHITA (Ayurveda)
  // -----------------------------------------------------------------------
  {
    id: 'ayurveda',
    title: 'Charaka Samhita',
    sanskritTitle: 'चरकसंहिता',
    icon: '🌿',
    color: '#3A9B8C',
    author: 'Acharya Charaka / Agnivesha',
    period: '~600 BCE – 200 BCE',
    scope: '8 Sthanas · 120 Adhyayas',
    tradition: 'Ayurveda · Holistic Well-Being & Bio-Energetics',
    overview:
      'The foundational master-text of Ayurvedic medicine. It details Tri-Dosha physiology, mind-body constitution (Prakriti), seasonal living (Ritucharya), herbal pharmacology, and preventive health.',
    fullOnlineUrl: 'https://www.carakasamhitaonline.com/',
    chapters: [
      {
        id: 'charaka-1',
        number: 1,
        sanskritTitle: 'सूत्रस्थानम्',
        transliteration: 'Sutra Sthana',
        englishTitle: 'Foundations of Life & Vital Health',
        summary:
          'The definition of Ayus (life), the balance of Vata, Pitta, and Kapha, daily rituals (Dinacharya), and the role of pure diet (Ahara) as the primary medicine.',
        tags: ['Dinacharya', 'Tri-Dosha', 'Ahara', 'Prevention'],
        keyShloka: {
          sanskrit:
            'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्।\nमानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते॥',
          transliteration:
            'hitāhitaṁ sukhaṁ duḥkham āyus tasya hitāhitam |\nmānaṁ ca tac ca yatroktam āyurvedaḥ sa ucyate ||',
          translation:
            'Ayurveda is defined as the sacred science that explains what is wholesome and unwholesome, happy and sorrowful for life, its measure and its ultimate nature.',
        },
        coreLesson:
          'Health is not merely the absence of disease; it is the vibrant harmony of body, senses, mind, and spirit.',
        modernConnection:
          'Preventive lifestyle medicine, circadian rhythm alignment, and anti-inflammatory diets are modern rediscoveries of Charaka’s 2500-year-old Sutra Sthana.',
        onlineReadUrl: 'https://www.carakasamhitaonline.com/index.php?title=Sutra_Sthana',
      },
      {
        id: 'charaka-2',
        number: 2,
        sanskritTitle: 'विमानस्थानम्',
        transliteration: 'Vimana Sthana',
        englishTitle: 'The Measure of Doses, Toxins & Epidemics',
        summary:
          'Epidemic causation (Janapadodhvamsa), environmental pollution of water, air, and soil, and the scientific methods of diagnosis through direct observation and inference.',
        tags: ['Public Health', 'Environment', 'Epidemiology'],
        keyShloka: {
          sanskrit:
            'प्रज्ञापराधः सर्वेषां रोगाणां मूलकारणम्।',
          transliteration:
            'prajñāparādhaḥ sarveṣāṁ rogāṇāṁ mūla-kāraṇam |',
          translation:
            'Volitional transgression against your own intellect (Prajnaparadha) is the root cause of all illnesses.',
        },
        coreLesson:
          'We fall ill not through ignorance, but by knowingly doing what damages us.',
        modernConnection:
          'Eating processed junk foods when we know they hurt us, skipping sleep for Netflix, and sitting sedentary for 12 hours are textbook modern examples of Prajnaparadha.',
        onlineReadUrl: 'https://www.carakasamhitaonline.com/index.php?title=Vimana_Sthana',
      },
      {
        id: 'charaka-3',
        number: 3,
        sanskritTitle: 'चिकित्सास्थानम्',
        transliteration: 'Chikitsa Sthana',
        englishTitle: 'Therapeutics, Herbal Formulations & Rasayana',
        summary:
          'Comprehensive treatment protocols, rejuvenative therapies (Rasayana), immune-boosting formulations (Chyawanprash, Ashwagandha), and holistic rehabilitation.',
        tags: ['Herbs', 'Rasayana', 'Longevity', 'Immunity'],
        keyShloka: {
          sanskrit:
            'दीर्घमायुः स्मृतिं मेधामारोग्यं तरुणं वयः।\nप्रभो वर्णं स्वरोदार्यं देहेन्द्रियबलं परम्॥',
          transliteration:
            'dīrgham āyuḥ smṛtiṁ medhām ārogyaṁ taruṇaṁ vayaḥ |\nprabho varṇaṁ svarodāryaṁ dehendriya-balaṁ param ||',
          translation:
            'Through authentic Rasayana therapy, one gains longevity, photographic memory, brilliant intellect, robust health, radiant youth, and supreme vitality.',
        },
        coreLesson:
          'Invest in cellular regeneration and mental rejuvenation every single day.',
        modernConnection:
          'Modern bio-hacking, adaptogens, and longevity science mirror Charaka’s Rasayana protocols for delaying biological aging.',
        onlineReadUrl: 'https://www.carakasamhitaonline.com/index.php?title=Chikitsa_Sthana',
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 5. CHANAKYA ARTHASHASTRA
  // -----------------------------------------------------------------------
  {
    id: 'arthashastra',
    title: 'Arthashastra',
    sanskritTitle: 'कौटिलीय अर्थशास्त्रम्',
    icon: '⚖️',
    color: '#C46B3A',
    author: 'Acharya Chanakya (Kautilya)',
    period: '~350 BCE – 283 BCE',
    scope: '15 Adhikaranas · Statecraft, Wealth & Defense',
    tradition: 'Artha & Dandaniti · Strategic Governance',
    overview:
      'The foundational Indian manual on statecraft, economic prosperity, anti-corruption systems, intelligence networks, and international diplomacy.',
    fullOnlineUrl: 'https://www.sacred-texts.com/hin/arta/',
    chapters: [
      {
        id: 'artha-1',
        number: 1,
        sanskritTitle: 'विनयाधिकारिकम्',
        transliteration: 'Vinayadhikarika',
        englishTitle: 'The Discipline & Self-Control of the Leader',
        summary:
          'The supreme prerequisite for holding power: conquering the six inner enemies (lust, anger, greed, arrogance, jealousy, and rashness).',
        tags: ['Leadership', 'Discipline', 'Self-Control'],
        keyShloka: {
          sanskrit:
            'इन्द्रियजयमूलो हि विनयः।\nकामक्रोधलोभमानमदहर्षत्यागेनेन्द्रियजयं कुर्यात्॥',
          transliteration:
            'indriya-jaya-mūlo hi vinayaḥ |\nkāma-krodha-lobha-māna-mada-harṣa-tyāgenendriya-jayaṁ kuryāt ||',
          translation:
            'True leadership discipline is rooted in mastery over the senses. One achieves sense-mastery by abandoning lust, rage, greed, egoism, intoxication, and irrational exuberance.',
        },
        coreLesson:
          'If you cannot govern your own impulses, you have zero moral authority to govern other human beings.',
        modernConnection:
          'Founders and CEOs who suffer from emotional volatility or megalomania burn through company capital and alienate talented teams.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/arta/index.htm',
      },
      {
        id: 'artha-2',
        number: 2,
        sanskritTitle: 'अध्यक्षप्रचारः',
        transliteration: 'Adhyakshaprachara',
        englishTitle: 'Administration, Auditing & Public Wealth',
        summary:
          'The building of robust treasuries, transparent public accounting, meritocratic appointments, and detecting financial fraud in government departments.',
        tags: ['Finance', 'Anti-Corruption', 'Accountability'],
        keyShloka: {
          sanskrit:
            'प्रजासुखे सुखं राज्ञः प्रजानां च हिते हितम्।\nनात्मप्रियं हितं राज्ञः प्रजानां तु प्रियं हितम्॥',
          transliteration:
            'prajā-sukhe sukhaṁ rājñaḥ prajānāṁ ca hite hitam |\nnātma-priyaṁ hitaṁ rājñaḥ prajānāṁ tu priyaṁ hitam ||',
          translation:
            'In the happiness of the people lies the happiness of the king; in their welfare, his welfare. Whatever pleases himself is not considered good by the king; only what pleases the people is truly good.',
        },
        coreLesson:
          'A leader’s true wealth is the prosperity and security of those they serve.',
        modernConnection:
          'Servant leadership and shareholder capitalism being replaced by stakeholder stewardship is Chanakya’s ancient maxim put into modern practice.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/arta/index.htm',
      },
    ],
  },

  // -----------------------------------------------------------------------
  // 6. PATANJALI YOGA SUTRAS
  // -----------------------------------------------------------------------
  {
    id: 'yogasutras',
    title: 'Patanjali Yoga Sutras',
    sanskritTitle: 'पातञ्जलयोगसूत्राणि',
    icon: '🧘',
    color: '#98C379',
    author: 'Maharishi Patanjali',
    period: '~400 BCE – 200 BCE',
    scope: '4 Padas · 196 Sutras',
    tradition: 'Darshana · Classical Raja Yoga & Meditation',
    overview:
      'The definitive psychology text of classical India. It lays out the Eight Limbs of Yoga (Ashtanga Yoga) for quieting mental oscillations and attaining pure consciousness (Kaivalya).',
    fullOnlineUrl: 'https://www.sacred-texts.com/hin/yogasutr.htm',
    chapters: [
      {
        id: 'yoga-1',
        number: 1,
        sanskritTitle: 'समाधिपादः',
        transliteration: 'Samadhi Pada',
        englishTitle: 'The Portion on Contemplative Stillness',
        summary:
          'Defines Yoga as the mastery and cessation of mental fluctuations. The nature of concentration, obstacles, and effortless absorption.',
        tags: ['Stillness', 'Meditation', 'Focus', 'Mindfulness'],
        keyShloka: {
          sanskrit:
            'योगश्चित्तवृत्तिनिरोधः।\nतदा द्रष्टुः स्वरूपेऽवस्थानम्॥',
          transliteration:
            'yogaś citta-vṛtti-nirodhaḥ |\ntadā draṣṭuḥ svarūpe \'vasthānam ||',
          translation:
            'Yoga is the cessation of the restless whirls of the mind. Then the Seer abides comfortably in their own true nature.',
        },
        coreLesson:
          'When the water of the lake is calm, you can finally see the jewels at the bottom. Quiet your mind to know who you are.',
        modernConnection:
          'Attention spans fragmented by notifications and dopamine spikes find instant healing in Patanjali’s practice of sustained single-pointed awareness.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/yogasutr.htm',
      },
      {
        id: 'yoga-2',
        number: 2,
        sanskritTitle: 'साधनापादः',
        transliteration: 'Sadhana Pada',
        englishTitle: 'The Portion on Daily Practice (Ashtanga Yoga)',
        summary:
          'The practical path: Yamas (ethical restrains), Niyamas (observances), Asana (posture), Pranayama (breathwork), and Pratyahara (sensory withdrawal).',
        tags: ['Ashtanga', 'Breathwork', 'Habits', 'Yamas'],
        keyShloka: {
          sanskrit:
            'मैत्रीकरुणामुदितोपेक्षाणां सुखदुःखपुण्यापुण्यविषयाणां भावनातश्चित्तप्रसादनम्॥',
          transliteration:
            'maitrī-karuṇā-muditopekṣāṇāṁ sukha-duḥkha-puṇyāpuṇya-viṣayāṇāṁ bhāvanātaś citta-prasādanam ||',
          translation:
            'The mind becomes serene by cultivating friendliness toward the happy, compassion for the sorrowful, delight in the virtuous, and neutral equanimity toward the wicked.',
        },
        coreLesson:
          'Protect your peace by not reacting with jealousy to others’ success, nor with anger to malice.',
        modernConnection:
          'Patanjali’s fourfold social attitude formula is the most elegant mental health safeguard against toxic comparison and internet hostility.',
        onlineReadUrl: 'https://www.sacred-texts.com/hin/yogasutr.htm',
      },
    ],
  },
];

// =========================================================================
// MAIN PAGE COMPONENT
// =========================================================================

export default function AncientKnowledgePage() {
  const [selectedBookId, setSelectedBookId] = useState<string>('gita');
  const [activeModalChapter, setActiveModalChapter] = useState<ChapterDetail | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>('');

  const currentBook =
    ANCIENT_BOOKS.find((b) => b.id === selectedBookId) || ANCIENT_BOOKS[0];

  const filteredChapters = currentBook.chapters.filter((ch) => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      ch.sanskritTitle.toLowerCase().includes(q) ||
      ch.transliteration.toLowerCase().includes(q) ||
      ch.englishTitle.toLowerCase().includes(q) ||
      ch.summary.toLowerCase().includes(q) ||
      ch.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0B08',
        color: '#EDE8D5',
        paddingBottom: '5rem',
      }}
    >
      {/* ===================================================================
          1. TOP MINIMAL NAVIGATION BAR (Image 1 Style)
          =================================================================== */}
      <header
        style={{
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          background: 'rgba(13, 11, 8, 0.95)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 90,
          padding: '0.85rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--gold-radiance, #F2D675)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 600,
                padding: '0.4rem 0.85rem',
                borderRadius: '6px',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                background: 'rgba(212, 175, 55, 0.08)',
                transition: 'all 0.2s ease',
              }}
            >
              ← Back
            </Link>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.15rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: 'var(--gold-sacred, #D4AF37)',
                textTransform: 'uppercase',
              }}
            >
              Ancient Knowledge
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/wisdom"
              style={{
                color: 'var(--text-vellum, #EDE8D5)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                opacity: 0.85,
              }}
            >
              💬 Ask Sages
            </Link>
            <span style={{ color: 'rgba(212, 175, 55, 0.3)' }}>•</span>
            <Link
              href="/quizzes"
              style={{
                color: 'var(--text-vellum, #EDE8D5)',
                fontSize: '0.85rem',
                textDecoration: 'none',
                opacity: 0.85,
              }}
            >
              🎯 Quizzes
            </Link>
          </div>
        </div>
      </header>

      {/* ===================================================================
          2. HORIZONTAL BOOK TABS (Matching Image 1: Gita, Panchatantra, etc.)
          =================================================================== */}
      <nav
        style={{
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
          background: 'rgba(20, 17, 11, 0.7)',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            padding: '0 1rem',
          }}
        >
          {ANCIENT_BOOKS.map((book) => {
            const isSelected = book.id === currentBook.id;
            return (
              <button
                key={book.id}
                onClick={() => {
                  setSelectedBookId(book.id);
                  setSearchFilter('');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.4rem',
                  background: isSelected ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  border: 'none',
                  borderBottom: isSelected ? '2px solid #D4AF37' : '2px solid transparent',
                  borderRight: '1px solid rgba(212, 175, 55, 0.1)',
                  color: isSelected ? '#F2D675' : '#9A9078',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.88rem',
                  fontWeight: isSelected ? 700 : 500,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{book.icon}</span>
                <span>{book.title}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ===================================================================
          3. SCRIPTURE HEADER & METADATA BANNER (Matching Image 1)
          =================================================================== */}
      <main style={{ maxWidth: '1360px', margin: '0 auto', padding: '2.5rem 1.5rem 0' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <span
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--gold-sacred, #D4AF37)',
              fontWeight: 600,
            }}
          >
            Sacred Scripture
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '0.35rem',
              marginBottom: '1rem',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                margin: 0,
                color: 'var(--gold-radiance, #F2D675)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {currentBook.title}
            </h1>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.35rem',
                color: '#9A9078',
              }}
            >
              ({currentBook.sanskritTitle})
            </span>
          </div>

          {/* Metadata Badges Cluster */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              flexWrap: 'wrap',
              marginBottom: '1.5rem',
            }}
          >
            <span
              style={{
                fontSize: '0.82rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                background: 'rgba(212, 175, 55, 0.1)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                color: '#EDE8D5',
              }}
            >
              ✍️ {currentBook.author}
            </span>

            <span
              style={{
                fontSize: '0.82rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                background: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: '#7dd3fc',
              }}
            >
              📅 {currentBook.period}
            </span>

            <span
              style={{
                fontSize: '0.82rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                background: 'rgba(154, 144, 120, 0.12)',
                border: '1px solid rgba(154, 144, 120, 0.25)',
                color: '#EDE8D5',
              }}
            >
              📖 {currentBook.scope}
            </span>

            <span
              style={{
                fontSize: '0.82rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '20px',
                background: 'rgba(123, 104, 238, 0.1)',
                border: '1px solid rgba(123, 104, 238, 0.25)',
                color: '#c4b5fd',
              }}
            >
              🏛️ {currentBook.tradition}
            </span>

            {/* Online External Reading Link Requested by User */}
            <a
              href={currentBook.fullOnlineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.82rem',
                padding: '0.3rem 0.85rem',
                borderRadius: '20px',
                background: 'rgba(94, 234, 212, 0.12)',
                border: '1px solid rgba(94, 234, 212, 0.4)',
                color: '#5eead4',
                textDecoration: 'none',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              🔗 Read Complete Unabridged Text Online ↗
            </a>
          </div>

          {/* Book Summary */}
          <p
            style={{
              maxWidth: '920px',
              fontSize: '1.05rem',
              lineHeight: 1.65,
              color: 'rgba(237, 232, 213, 0.85)',
              margin: '0 0 2rem',
            }}
          >
            {currentBook.overview}
          </p>

          {/* Section Subheader & Quick Search Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              borderTop: '1px solid rgba(212, 175, 55, 0.15)',
              paddingTop: '1.5rem',
            }}
          >
            <div
              style={{
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
                color: '#9A9078',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              ALL {currentBook.chapters.length} CHAPTERS / SECTIONS — CLICK READ MORE FOR FULL SHLOKA + LESSON
            </div>

            <div style={{ minWidth: '260px' }}>
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="🔍 Filter chapters or tags..."
                style={{
                  width: '100%',
                  background: 'rgba(33, 29, 18, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.25)',
                  borderRadius: '20px',
                  padding: '0.5rem 1rem',
                  color: '#EDE8D5',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* ===================================================================
            4. CHAPTER CARDS GRID (Matching Image 1: 3-Column Layout)
            =================================================================== */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {filteredChapters.map((chapter) => (
            <div
              key={chapter.id}
              style={{
                background: 'linear-gradient(180deg, #1A160E 0%, #120F0A 100%)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '12px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.45)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#9A9078',
                    fontWeight: 600,
                  }}
                >
                  Chapter {chapter.number} of {currentBook.chapters.length}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    color: 'var(--gold-radiance, #F2D675)',
                    margin: '0.4rem 0 0.2rem',
                    lineHeight: 1.3,
                  }}
                >
                  {chapter.sanskritTitle}
                </h3>

                <div
                  style={{
                    fontSize: '0.82rem',
                    fontStyle: 'italic',
                    color: '#9A9078',
                    marginBottom: '0.75rem',
                  }}
                >
                  {chapter.transliteration}
                </div>

                <h4
                  style={{
                    fontSize: '1rem',
                    color: '#EDE8D5',
                    margin: '0 0 0.6rem',
                    fontWeight: 600,
                  }}
                >
                  {chapter.englishTitle}
                </h4>

                <p
                  style={{
                    fontSize: '0.88rem',
                    lineHeight: 1.55,
                    color: 'rgba(237, 232, 213, 0.75)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {chapter.summary}
                </p>
              </div>

              <div>
                {/* Thematic Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.4rem',
                    marginBottom: '1.25rem',
                  }}
                >
                  {chapter.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '4px',
                        background: 'rgba(212, 175, 55, 0.08)',
                        border: '1px solid rgba(212, 175, 55, 0.15)',
                        color: 'var(--gold-radiance, #F2D675)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Action Button */}
                <button
                  onClick={() => setActiveModalChapter(chapter)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem',
                    background: 'rgba(212, 175, 55, 0.1)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '6px',
                    color: 'var(--gold-radiance, #F2D675)',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.22)';
                    e.currentTarget.style.borderColor = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                  }}
                >
                  READ MORE →
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ===================================================================
          5. CHAPTER DETAIL OVERLAY MODAL (Matching Image 3)
          =================================================================== */}
      {activeModalChapter && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.5rem',
            overflowY: 'auto',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalChapter(null);
          }}
        >
          <div
            style={{
              background: '#120F0A',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '12px',
              maxWidth: '820px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 16px 48px rgba(0, 0, 0, 0.8)',
              padding: '2.5rem',
              position: 'relative',
            }}
          >
            {/* Top Modal Header Bar: Close & Chapter Indicator */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
                borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
                paddingBottom: '1rem',
              }}
            >
              <button
                onClick={() => setActiveModalChapter(null)}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: 'var(--gold-radiance, #F2D675)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}
              >
                ✕ Close
              </button>

              <span
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  color: '#9A9078',
                  textTransform: 'uppercase',
                }}
              >
                Chapter {activeModalChapter.number} of {currentBook.chapters.length}
              </span>
            </div>

            {/* Chapter Heading Banner */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--gold-sacred, #D4AF37)',
                  fontWeight: 600,
                  marginBottom: '0.3rem',
                }}
              >
                CHAPTER {activeModalChapter.number} OF {currentBook.chapters.length} · {currentBook.title.toUpperCase()}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.75rem, 3vw, 2.4rem)',
                  color: 'var(--gold-radiance, #F2D675)',
                  margin: '0 0 0.25rem',
                }}
              >
                {activeModalChapter.sanskritTitle}
              </h2>

              <div
                style={{
                  fontSize: '0.95rem',
                  fontStyle: 'italic',
                  color: '#9A9078',
                  marginBottom: '0.65rem',
                }}
              >
                {activeModalChapter.transliteration}
              </div>

              <div
                style={{
                  fontSize: '1.25rem',
                  color: '#EDE8D5',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                {activeModalChapter.englishTitle}
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {activeModalChapter.tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      background: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.2)',
                      color: 'var(--gold-radiance, #F2D675)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Section 1: Key Shloka (Sanskrit) */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9A9078',
                  fontWeight: 600,
                  marginBottom: '0.65rem',
                }}
              >
                KEY SHLOKA (SANSKRIT)
              </div>

              <div
                style={{
                  background: 'rgba(26, 22, 14, 0.8)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '8px',
                  padding: '1.5rem',
                }}
              >
                {activeModalChapter.keyShloka.speaker && (
                  <div
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: '#9A9078',
                      fontSize: '0.95rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {activeModalChapter.keyShloka.speaker}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.35rem',
                    lineHeight: 1.6,
                    color: 'var(--gold-radiance, #F2D675)',
                    whiteSpace: 'pre-line',
                    marginBottom: '0.75rem',
                  }}
                >
                  {activeModalChapter.keyShloka.sanskrit}
                </div>

                <div
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.88rem',
                    fontStyle: 'italic',
                    color: 'rgba(237, 232, 213, 0.7)',
                    whiteSpace: 'pre-line',
                    marginBottom: '1rem',
                  }}
                >
                  {activeModalChapter.keyShloka.transliteration}
                </div>

                <div
                  style={{
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    color: '#EDE8D5',
                    borderTop: '1px solid rgba(212, 175, 55, 0.12)',
                    paddingTop: '0.75rem',
                  }}
                >
                  &ldquo;{activeModalChapter.keyShloka.translation}&rdquo;
                </div>

                {activeModalChapter.keyShloka.wordBreakdown && (
                  <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {activeModalChapter.keyShloka.wordBreakdown.map((w, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '0.75rem',
                          background: 'rgba(13, 11, 8, 0.7)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          border: '1px solid rgba(212, 175, 55, 0.15)',
                        }}
                      >
                        <strong style={{ color: '#F2D675' }}>{w.sanskrit}</strong>: {w.meaning}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Core Lesson (Golden Callout Box) */}
            <div style={{ marginBottom: '2rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9A9078',
                  fontWeight: 600,
                  marginBottom: '0.65rem',
                }}
              >
                CORE LESSON
              </div>

              <div
                style={{
                  background: 'rgba(212, 175, 55, 0.08)',
                  border: '1px solid rgba(212, 175, 55, 0.35)',
                  borderLeft: '4px solid #D4AF37',
                  borderRadius: '6px',
                  padding: '1.25rem 1.5rem',
                  fontSize: '1.05rem',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  color: 'var(--gold-radiance, #F2D675)',
                }}
              >
                {activeModalChapter.coreLesson}
              </div>
            </div>

            {/* Section 3: Modern Connection */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#9A9078',
                  fontWeight: 600,
                  marginBottom: '0.65rem',
                }}
              >
                MODERN CONNECTION
              </div>

              <p
                style={{
                  fontSize: '0.95rem',
                  lineHeight: 1.65,
                  color: 'rgba(237, 232, 213, 0.85)',
                  margin: 0,
                }}
              >
                {activeModalChapter.modernConnection}
              </p>
            </div>

            {/* Modal Bottom Action Bridges */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                borderTop: '1px solid rgba(212, 175, 55, 0.15)',
                paddingTop: '1.5rem',
              }}
            >
              <a
                href={activeModalChapter.onlineReadUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.65rem 1.25rem',
                  borderRadius: '6px',
                  background: 'transparent',
                  border: '1px solid rgba(94, 234, 212, 0.4)',
                  color: '#5eead4',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                📖 Read Full Chapter Online ↗
              </a>

              <Link
                href="/wisdom"
                style={{
                  padding: '0.65rem 1.5rem',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #D4AF37 0%, #8B6914 100%)',
                  color: '#0D0B08',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                }}
              >
                💬 Ask Sage About This Shloka
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
