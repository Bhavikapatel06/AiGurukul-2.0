'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
import {
  GurukulLevel,
  UserGamificationDTO,
  BazaarItemDTO,
  InventoryItemDTO,
  QuestDTO,
  JigsawPuzzleDTO,
  calculateGurukulLevel,
} from '@ai-gurukul/types';

// Fallback initial gamification state when offline or guest
const INITIAL_DEMO_PROFILE: UserGamificationDTO = {
  id: 'demo-profile',
  userId: 'guest-seeker',
  xp: 320,
  coins: 180,
  level: 'Learner',
  levelProgress: calculateGurukulLevel(320),
  stats: {
    questsCompleted: 2,
    puzzlesSolved: 1,
    itemsPurchased: 1,
    streakDays: 3,
    lastActiveDate: new Date().toISOString().split('T')[0],
  },
  badges: ['Sadhaka Initiation', 'Shloka Contemplator', 'Mandala Weaver'],
  inventory: [
    {
      itemId: 'bazaar-tulsi-mala',
      code: 'tulsi_mala',
      name: 'Sacred Tulsi Japa Mala',
      category: 'sacred_relic',
      rarity: 'common',
      icon: '📿',
      description: '108 holy basil beads consecrated for quietening the mind.',
      acquiredAt: new Date().toISOString(),
      quantity: 1,
      isEquipped: true,
    },
  ],
  activeQuests: [
    {
      id: 'quest-daily-shloka',
      code: 'daily_shloka_contemplation',
      title: 'Daily Shloka Contemplation',
      description: 'Reflect upon a sacred Sanskrit verse and absorb its moral principle.',
      category: 'daily',
      rewardXp: 50,
      rewardCoins: 25,
      rewardBadge: 'Shloka Contemplator',
      targetCount: 1,
      currentCount: 1,
      status: 'claimed',
    },
    {
      id: 'quest-jigsaw-mastery',
      code: 'jigsaw_lore_puzzle',
      title: 'Sacred Jigsaw Alignment',
      description: 'Assemble all 12 pieces of a 3x4 Vedic lore jigsaw puzzle without exceeding 3 hints.',
      category: 'puzzle',
      rewardXp: 120,
      rewardCoins: 60,
      rewardBadge: 'Mandala Weaver',
      targetCount: 1,
      currentCount: 0,
      status: 'available',
    },
    {
      id: 'quest-scriptural-quiz',
      code: 'scriptural_quiz_passed',
      title: 'Scriptural Assessment Excellence',
      description: 'Achieve a passing score in any Vedic shastric or philosophy quiz assessment.',
      category: 'scriptural',
      rewardXp: 150,
      rewardCoins: 75,
      rewardBadge: 'Jnana Seeker',
      targetCount: 1,
      currentCount: 0,
      status: 'available',
    },
    {
      id: 'quest-bazaar-patron',
      code: 'bazaar_first_relic',
      title: 'Sacred Bazaar Patron',
      description: 'Acquire your first sacred relic, ayurvedic herb, or manuscript from the Gurukul Bazaar.',
      category: 'daily',
      rewardXp: 75,
      rewardCoins: 35,
      rewardBadge: 'Bazaar Patron',
      targetCount: 1,
      currentCount: 1,
      status: 'claimed',
    },
  ],
};

const BAZAAR_CATALOG: BazaarItemDTO[] = [
  {
    id: 'bazaar-tulsi-mala',
    code: 'tulsi_mala',
    name: 'Sacred Tulsi Japa Mala',
    category: 'sacred_relic',
    rarity: 'common',
    price: 50,
    icon: '📿',
    description: '108 pure holy basil beads consecrated according to Vaishnava vidhi.',
    loreSnippet: 'Tulsi purifies the aura, calms the mind, and enhances meditative focus during mantra japa.',
    benefits: '+10% Meditative Focus, unlocks Japa Badge',
  },
  {
    id: 'bazaar-ashwagandha',
    code: 'ashwagandha_elixir',
    name: 'Charaka Ashwagandha Rasayana',
    category: 'ayurvedic_herb',
    rarity: 'common',
    price: 75,
    icon: '🌿',
    description: 'Ancient rejuvenating adaptogen formulated with organic root extract.',
    loreSnippet: 'Known as "smell of a horse" for imparting strength, vitality, and soothing Vata-induced anxiety.',
    benefits: 'Calms Vata dosha, increases vitality',
  },
  {
    id: 'bazaar-palm-gita',
    code: 'palm_leaf_gita',
    name: 'Palm-Leaf Bhagavad Gita Manuscript',
    category: 'manuscript',
    rarity: 'rare',
    price: 150,
    icon: '📜',
    description: 'An ancient hand-inscribed Grantha script palm-leaf folio of Chapter 2.',
    loreSnippet: 'Preserved in southern temple vaults, carrying the unbroken lineage of Shankara commentaries.',
    benefits: 'Unlocks deeper philosophical dialogue notes with Krishna persona',
  },
  {
    id: 'bazaar-rudraksha-patanjali',
    code: 'rudraksha_patanjali',
    name: 'Five-Mukhi Rudraksha of Patanjali',
    category: 'sacred_relic',
    rarity: 'epic',
    price: 250,
    icon: '🧘',
    description: 'Sacred seed blessed with vibrational resonance of Yoga Sutras.',
    loreSnippet: 'Symbolizes Lord Shiva and aids in arresting citta-vritti (fluctuations of mental perception).',
    benefits: '+25% XP bonus in Jigsaw puzzle challenges',
  },
  {
    id: 'bazaar-title-dharma',
    code: 'title_dharma_guardian',
    name: 'Title: Dharma Guardian (धर्मपाल)',
    category: 'title',
    rarity: 'rare',
    price: 100,
    icon: '🛡️',
    description: 'Honorary title awarded to seekers demonstrating commitment to righteous living.',
    loreSnippet: 'Dharmo rakshati rakshitah — Dharma protects those who protect it.',
    benefits: 'Displays golden "Dharma Guardian" badge beside seeker profile name',
  },
  {
    id: 'bazaar-peacock-feather',
    code: 'peacock_feather_krishna',
    name: 'Golden Peacock Feather (मयूरपिच्छ)',
    category: 'avatar_frame',
    rarity: 'legendary',
    price: 500,
    icon: '🪶',
    description: 'A radiant avatar ornament echoing Sri Krishna’s divine crown.',
    loreSnippet: 'Represents transcendental beauty, purity of devotion, and cosmic equanimity.',
    benefits: 'Custom golden halo frame around seeker avatar in all dialogues',
  },
];

const PUZZLE_CATEGORIES = [
  { id: 'ramayana', label: 'Setu Bandhana (Ramayana)', symbol: '🌊', title: 'The Bridge of Faith' },
  { id: 'mahabharata', label: 'Gita Upadesha (Mahabharata)', symbol: '🏹', title: 'The Chariot at Kurukshetra' },
  { id: 'cosmology', label: 'Samudra Manthana (Cosmology)', symbol: '☸️', title: 'The Cosmic Churning' },
  { id: 'temple', label: 'Brihadisvara Temple (Architecture)', symbol: '🛕', title: 'Vastu Mandala Geometry' },
  { id: 'ayurveda', label: 'Dhanvantari Healing (Ayurveda)', symbol: '🌿', title: 'Sacred Herb Alignment' },
];

interface TileData {
  id: number;
  label: string;
  symbol: string;
  lore: string;
}

const TILE_SETS: Record<string, TileData[]> = {
  ramayana: [
    { id: 0, label: 'Shore of Rameshwaram', symbol: '🌊', lore: 'Where Sri Rama meditated on Shiva.' },
    { id: 1, label: 'Nala & Nila Architects', symbol: '📐', lore: 'Blessed to make stones float.' },
    { id: 2, label: 'Sacred Stones', symbol: '🪨', lore: 'Inscribed with Rama\'s holy name.' },
    { id: 3, label: 'Varuna Bowing', symbol: '🔱', lore: 'Ocean deity yielding passage.' },
    { id: 4, label: 'Angada Leading', symbol: '👑', lore: 'Valiant prince carrying mountain foundations.' },
    { id: 5, label: 'Hanuman Flying', symbol: '🚩', lore: 'Leaping with boundless devotion.' },
    { id: 6, label: 'The Little Squirrel', symbol: '🐿️', lore: 'Rolling in sand with sincere love.' },
    { id: 7, label: 'Mid-Ocean Span', symbol: '🌉', lore: 'Uniting continents in Dharma.' },
    { id: 8, label: 'Vanara Multitude', symbol: '🐒', lore: 'Laboring in selfless joy.' },
    { id: 9, label: 'Lakshmana Watchful', symbol: '🏹', lore: 'Ever-vigilant guardian.' },
    { id: 10, label: 'Vibhishana Insight', symbol: '🕊️', lore: 'Strategic ethical counsel.' },
    { id: 11, label: 'Shores of Suvela', symbol: '🌴', lore: 'The dawn of cosmic balance.' },
  ],
  mahabharata: [
    { id: 0, label: 'White Steeds', symbol: '🐎', lore: 'Controlled senses in yoga.' },
    { id: 1, label: 'Golden Chariot', symbol: '🛞', lore: 'The physical vessel guided by intellect.' },
    { id: 2, label: 'Arjuna Despondent', symbol: '🏹', lore: 'Laying down the Gandiva bow.' },
    { id: 3, label: 'Krishna Smiling', symbol: '🪷', lore: 'Supreme teacher of eternity.' },
    { id: 4, label: 'Panchajanya Conch', symbol: '🐚', lore: 'Piercing darkness with truth.' },
    { id: 5, label: 'Hanuman on Banner', symbol: '🚩', lore: 'Imparting unshakable courage.' },
    { id: 6, label: 'Nishkama Wheel', symbol: '☸️', lore: 'Action without craving fruits.' },
    { id: 7, label: 'Karmic Horizon', symbol: '⚔️', lore: 'The battlefield of inner tendencies.' },
    { id: 8, label: 'Bhisma & Drona', symbol: '🛡️', lore: 'Venerated elders bound by vow.' },
    { id: 9, label: 'Vishwarupa Glint', symbol: '✨', lore: 'Cosmic form across all worlds.' },
    { id: 10, label: 'Equanimity Dawn', symbol: '⚖️', lore: 'Samatvam yoga ucyate.' },
    { id: 11, label: 'Gandiva Raised', symbol: '🏹', lore: 'Resolved to perform duty.' },
  ],
  cosmology: [
    { id: 0, label: 'Mount Mandara', symbol: '⛰️', lore: 'Golden cosmic churning rod.' },
    { id: 1, label: 'Kurma Tortoise', symbol: '🐢', lore: 'Vishnu avatar supporting the base.' },
    { id: 2, label: 'Vasuki Serpent', symbol: '🐍', lore: 'Great churning rope of eternity.' },
    { id: 3, label: 'Devas at Tail', symbol: '🌟', lore: 'Luminous beings of light.' },
    { id: 4, label: 'Asuras at Head', symbol: '🔥', lore: 'Titans of restless fire.' },
    { id: 5, label: 'Halahala Poison', symbol: '☠️', lore: 'Toxins emerging before nectar.' },
    { id: 6, label: 'Neelakantha Shiva', symbol: '🔱', lore: 'Consuming poison to protect all.' },
    { id: 7, label: 'Kamadhenu Cow', symbol: '🐄', lore: 'Wish-fulfilling divine abundance.' },
    { id: 8, label: 'Airavata Elephant', symbol: '🐘', lore: 'Four-tusked sovereign mount.' },
    { id: 9, label: 'Goddess Lakshmi', symbol: '🪷', lore: 'Mother of prosperity on lotus.' },
    { id: 10, label: 'Kaustubha Gem', symbol: '💎', lore: 'Flawless gem adorning Vishnu.' },
    { id: 11, label: 'Dhanvantari & Amrita', symbol: '🏺', lore: 'Golden pot of immortality.' },
  ],
  temple: [
    { id: 0, label: 'Golden Kalasha', symbol: '🏺', lore: 'Pranic cosmic spire.' },
    { id: 1, label: 'Monolithic Capstone', symbol: '🏛️', lore: '80-tonne granite dome.' },
    { id: 2, label: 'Vimana Tiers', symbol: '📐', lore: '16 cosmological levels.' },
    { id: 3, label: 'Nandi Pavilion', symbol: '🐂', lore: 'Single-boulder bull facing shrine.' },
    { id: 4, label: 'Garbhagriha', symbol: '🛕', lore: 'Womb chamber of the Lingam.' },
    { id: 5, label: 'Chola Inscriptions', symbol: '📜', lore: 'Classical Tamil epigraphy.' },
    { id: 6, label: 'Shadow Mystery', symbol: '☀️', lore: 'Geometric alignment at noon.' },
    { id: 7, label: 'Dvarapala Guardians', symbol: '⚔️', lore: 'Colossal stone gatekeepers.' },
    { id: 8, label: 'Vastu Purusha Grid', symbol: '☸️', lore: '64-square cosmic mandala.' },
    { id: 9, label: 'Interlocking Granite', symbol: '🧱', lore: 'Thousand-year mortarless joint.' },
    { id: 10, label: 'Natyashastra Reliefs', symbol: '💃', lore: '81 classical dance karanas.' },
    { id: 11, label: 'Perimeter Cloister', symbol: '🏰', lore: 'Embracing thousands of seekers.' },
  ],
  ayurveda: [
    { id: 0, label: 'Amrita Pot', symbol: '🏺', lore: 'Healing nectar of life.' },
    { id: 1, label: 'Chakra of Time', symbol: '☸️', lore: 'Ritucharya seasonal wisdom.' },
    { id: 2, label: 'Jalauka Leech', symbol: '🪱', lore: 'Sushruta surgical purification.' },
    { id: 3, label: 'Conch of Prana', symbol: '🐚', lore: 'Life-force breath vibration.' },
    { id: 4, label: 'Haritaki Herb', symbol: '🌰', lore: 'King of herbs balancing tri-dosha.' },
    { id: 5, label: 'Bibhitaki Bark', symbol: '🍃', lore: 'Astringent lung purifier.' },
    { id: 6, label: 'Amalaki Fruit', symbol: '🍈', lore: 'Supreme cooling Pitta remedy.' },
    { id: 7, label: 'Tri-Dosha Balance', symbol: '⚖️', lore: 'Vata, Pitta, Kapha harmony.' },
    { id: 8, label: 'Charaka Mortar', symbol: '🥣', lore: 'Hand-ground botanical powders.' },
    { id: 9, label: 'Neem Leaf', symbol: '🌿', lore: 'Bitter purifier of blood.' },
    { id: 10, label: 'Golden Haridra', symbol: '🟡', lore: 'Turmeric soothing inflammation.' },
    { id: 11, label: 'Swastha State', symbol: '🧘', lore: 'Situated in the true self.' },
  ],
};

export default function GamificationPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserGamificationDTO>(INITIAL_DEMO_PROFILE);
  const [activeTab, setActiveTab] = useState<'progress' | 'bazaar' | 'jigsaw'>('progress');
  const [notification, setNotification] = useState<string | null>(null);

  // Jigsaw mini-game states (3 rows x 4 columns = 12 tiles)
  const [selectedCategory, setSelectedCategory] = useState<string>('ramayana');
  const [gridSlots, setGridSlots] = useState<(TileData | null)[]>(new Array(12).fill(null));
  const [trayTiles, setTrayTiles] = useState<TileData[]>([]);
  const [selectedTrayTileId, setSelectedTrayTileId] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [puzzleWon, setPuzzleWon] = useState<boolean>(false);
  const [winRewardDetails, setWinRewardDetails] = useState<{ xp: number; coins: number; score: number } | null>(null);

  // Load profile from API or use local fallback
  useEffect(() => {
    async function loadData() {
      try {
        const token = localStorage.getItem('access_token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch('/api/v1/gamification/profile', { headers });
        if (res.ok) {
          const json = await res.json();
          if (json.data) setProfile(json.data);
        }
      } catch {
        // Use initial demo profile
      }
    }
    loadData();
  }, [user]);

  // Initialize Jigsaw Puzzle
  useEffect(() => {
    resetPuzzle(selectedCategory);
  }, [selectedCategory]);

  // Timer effect
  useEffect(() => {
    let interval: any;
    if (timerRunning && !puzzleWon) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, puzzleWon]);

  function resetPuzzle(cat: string) {
    const tiles = [...TILE_SETS[cat]];
    // Shuffle tiles for tray
    const shuffled = [...tiles].sort(() => Math.random() - 0.5);
    setTrayTiles(shuffled);
    setGridSlots(new Array(12).fill(null));
    setSelectedTrayTileId(null);
    setMovesCount(0);
    setHintsUsed(0);
    setTimerSeconds(0);
    setTimerRunning(false);
    setPuzzleWon(false);
    setWinRewardDetails(null);
  }

  function showToast(msg: string) {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  }

  // Handle placing tile into a 3x4 grid slot (0 to 11)
  function handleSlotClick(slotIndex: number) {
    if (puzzleWon) return;

    if (!timerRunning) setTimerRunning(true);

    // If slot is occupied and no tray tile selected, return slot tile back to tray
    if (gridSlots[slotIndex] && selectedTrayTileId === null) {
      const removed = gridSlots[slotIndex]!;
      const newSlots = [...gridSlots];
      newSlots[slotIndex] = null;
      setGridSlots(newSlots);
      setTrayTiles((prev) => [...prev, removed]);
      setMovesCount((m) => m + 1);
      return;
    }

    // If a tray tile is selected, place into this slot
    if (selectedTrayTileId !== null) {
      const tileToPlace = trayTiles.find((t) => t.id === selectedTrayTileId);
      if (!tileToPlace) return;

      const previousSlotTile = gridSlots[slotIndex];
      const newSlots = [...gridSlots];
      newSlots[slotIndex] = tileToPlace;
      setGridSlots(newSlots);

      // Remove from tray, and if slot had an existing tile, return it to tray
      setTrayTiles((prev) => {
        const filtered = prev.filter((t) => t.id !== selectedTrayTileId);
        return previousSlotTile ? [...filtered, previousSlotTile] : filtered;
      });

      setSelectedTrayTileId(null);
      setMovesCount((m) => m + 1);

      // Check win condition
      checkWinCondition(newSlots);
    }
  }

  function checkWinCondition(currentSlots: (TileData | null)[]) {
    const isFull = currentSlots.every((s) => s !== null);
    if (!isFull) return;

    // Check if slot i has tile with id i
    const allCorrect = currentSlots.every((tile, idx) => tile?.id === idx);
    if (allCorrect) {
      handlePuzzleVictory();
    }
  }

  async function handlePuzzleVictory() {
    setPuzzleWon(true);
    setTimerRunning(false);

    const hintPenalty = hintsUsed * 5;
    const earnedCoins = Math.max(10, 60 - hintPenalty);
    const earnedXp = 120;
    const score = Math.max(100, 1000 - movesCount * 10 - timerSeconds * 2 - hintsUsed * 50);

    setWinRewardDetails({ xp: earnedXp, coins: earnedCoins, score });

    // Try posting to API
    try {
      const token = localStorage.getItem('access_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch('/api/v1/gamification/jigsaw/complete', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          puzzleId: `puzzle-${selectedCategory}`,
          moves: movesCount,
          hintsUsed,
          timeSeconds: Math.max(1, timerSeconds),
          tilePlacements: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        }),
      });
    } catch {
      // Fallback local update
    }

    // Update local profile state
    const newXp = profile.xp + earnedXp;
    const newCoins = profile.coins + earnedCoins;
    const newLevelInfo = calculateGurukulLevel(newXp);

    setProfile((prev) => ({
      ...prev,
      xp: newXp,
      coins: newCoins,
      level: newLevelInfo.level,
      levelProgress: newLevelInfo,
      stats: {
        ...prev.stats,
        puzzlesSolved: prev.stats.puzzlesSolved + 1,
      },
      badges: prev.badges.includes('Mandala Weaver')
        ? prev.badges
        : [...prev.badges, 'Mandala Weaver'],
    }));

    showToast(`🏆 Mandala Aligned! Earned +${earnedXp} XP and +${earnedCoins} Coins!`);
  }

  function handleUseHint() {
    if (puzzleWon) return;

    // Check coins penalty cost
    if (profile.coins < 5) {
      showToast('⚠️ Not enough coins for a Hint! (Requires 5 coins)');
      return;
    }

    // Find first empty or wrongly placed slot
    let targetSlot = -1;
    for (let i = 0; i < 12; i++) {
      if (!gridSlots[i] || gridSlots[i]?.id !== i) {
        targetSlot = i;
        break;
      }
    }

    if (targetSlot === -1) return;

    // Find the correct tile for targetSlot
    const correctTile = TILE_SETS[selectedCategory].find((t) => t.id === targetSlot);
    if (!correctTile) return;

    // Deduct 5 coins penalty and increment hint counter
    setHintsUsed((h) => h + 1);
    setProfile((prev) => ({ ...prev, coins: Math.max(0, prev.coins - 5) }));

    // Place correct tile into slot
    const previousTile = gridSlots[targetSlot];
    const newSlots = [...gridSlots];
    newSlots[targetSlot] = correctTile;
    setGridSlots(newSlots);

    // Remove from tray and return displaced tile if any
    setTrayTiles((prev) => {
      const filtered = prev.filter((t) => t.id !== correctTile.id);
      return previousTile && previousTile.id !== correctTile.id ? [...filtered, previousTile] : filtered;
    });

    showToast(`💡 Hint used: Placed "${correctTile.label}" in Slot ${targetSlot + 1} (-5 Coins penalty)`);
    checkWinCondition(newSlots);
  }

  // Claim Quest Reward
  async function handleClaimQuest(quest: QuestDTO) {
    try {
      const token = localStorage.getItem('access_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch(`/api/v1/gamification/quests/${quest.id}/claim`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ questId: quest.id }),
      });
    } catch {
      // Local fallback
    }

    const newXp = profile.xp + quest.rewardXp;
    const newCoins = profile.coins + quest.rewardCoins;
    const newLevelInfo = calculateGurukulLevel(newXp);

    setProfile((prev) => ({
      ...prev,
      xp: newXp,
      coins: newCoins,
      level: newLevelInfo.level,
      levelProgress: newLevelInfo,
      stats: {
        ...prev.stats,
        questsCompleted: prev.stats.questsCompleted + 1,
      },
      activeQuests: prev.activeQuests.map((q) =>
        q.id === quest.id ? { ...q, status: 'claimed' as const } : q
      ),
      badges: quest.rewardBadge && !prev.badges.includes(quest.rewardBadge)
        ? [...prev.badges, quest.rewardBadge]
        : prev.badges,
    }));

    showToast(`✨ Quest Claimed! Earned +${quest.rewardXp} XP & +${quest.rewardCoins} Coins!`);
  }

  // Buy item in Bazaar
  async function handleBuyItem(item: BazaarItemDTO) {
    if (profile.coins < item.price) {
      showToast(`❌ Insufficient coins! Need ${item.price} coins, you have ${profile.coins}.`);
      return;
    }

    try {
      const token = localStorage.getItem('access_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      await fetch('/api/v1/gamification/bazaar/buy', {
        method: 'POST',
        headers,
        body: JSON.stringify({ itemId: item.id }),
      });
    } catch {
      // Fallback
    }

    const newCoins = profile.coins - item.price;
    setProfile((prev) => {
      const exists = prev.inventory.find((i) => i.itemId === item.id);
      let updatedInv: InventoryItemDTO[];
      if (exists) {
        updatedInv = prev.inventory.map((i) =>
          i.itemId === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updatedInv = [
          ...prev.inventory,
          {
            itemId: item.id,
            code: item.code,
            name: item.name,
            category: item.category,
            rarity: item.rarity,
            icon: item.icon,
            description: item.description,
            acquiredAt: new Date().toISOString(),
            quantity: 1,
            isEquipped: false,
          },
        ];
      }

      return {
        ...prev,
        coins: newCoins,
        stats: { ...prev.stats, itemsPurchased: prev.stats.itemsPurchased + 1 },
        inventory: updatedInv,
        badges: prev.badges.includes('Bazaar Patron') ? prev.badges : [...prev.badges, 'Bazaar Patron'],
      };
    });

    showToast(`🛍️ Acquired "${item.name}" for ${item.price} coins! Added to your inventory.`);
  }

  // Toggle equipping item
  function handleToggleEquip(itemId: string) {
    setProfile((prev) => ({
      ...prev,
      inventory: prev.inventory.map((i) =>
        i.itemId === itemId ? { ...i, isEquipped: !i.isEquipped } : i
      ),
    }));
    showToast('🛡️ Item equipment updated.');
  }

  return (
    <div style={{ minHeight: '100vh', padding: '2rem 1.5rem', background: '#0D0B08', color: '#EDE8D5' }}>
      <div className="temple-container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Toast Notification */}
        {notification && (
          <div
            style={{
              position: 'fixed',
              top: '5rem',
              right: '2rem',
              zIndex: 9999,
              background: 'rgba(212, 175, 55, 0.95)',
              color: '#0D0B08',
              fontWeight: 600,
              padding: '0.85rem 1.5rem',
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
              border: '1px solid #F2D675',
              animation: 'slideIn 0.3s ease',
            }}
          >
            {notification}
          </div>
        )}

        {/* Header Banner */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🪷 🏆 📿</div>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2.5rem',
              fontWeight: 700,
              color: '#D4AF37',
              letterSpacing: '0.04em',
              marginBottom: '0.5rem',
            }}
          >
            Vedic Gamification, Bazaar &amp; Sacred Jigsaw
          </h1>
          <p style={{ color: '#9A9078', maxWidth: '720px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Cultivate your spiritual discipline (Sadhana). Earn XP, ascend through the five Vedic ranks, acquire sacred relics in the Bazaar, and reconstruct sacred lore in the 3x4 Jigsaw mandala.
          </p>
        </div>

        {/* Sadhaka Profile Progress Card */}
        <div
          className="temple-card"
          style={{
            background: 'linear-gradient(135deg, rgba(33, 29, 18, 0.95) 0%, rgba(20, 17, 12, 0.98) 100%)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '1.5rem',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '1.8rem' }}>🕉️</span>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#F2D675', margin: 0 }}>
                  Rank: {profile.level} ({profile.levelProgress.titleSanskrit})
                </h2>
              </div>
              <p style={{ color: '#9A9078', fontSize: '0.92rem', margin: 0 }}>
                {profile.level === 'Acharya'
                  ? 'Supreme spiritual mastery attained. Your conduct embodies timeless wisdom.'
                  : `Next Stage: ${profile.levelProgress.nextLevel} (${profile.levelProgress.xpNeededForNext} XP required)`}
              </p>
            </div>

            {/* Coins Vault & Streak */}
            <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
              <div
                style={{
                  background: 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🪙</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9A9078', textTransform: 'uppercase' }}>Coins Vault</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#F2D675' }}>{profile.coins}</div>
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>🔥</span>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#9A9078', textTransform: 'uppercase' }}>Streak</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#f87171' }}>{profile.stats.streakDays} Days</div>
                </div>
              </div>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem', color: '#EDE8D5' }}>
              <span>{profile.xp} XP Earned</span>
              <span>{profile.levelProgress.progressPct}% towards {profile.levelProgress.nextLevel || 'Max Rank'}</span>
            </div>
            <div style={{ width: '100%', height: '14px', background: 'rgba(0,0,0,0.6)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(212,175,55,0.2)' }}>
              <div
                style={{
                  width: `${profile.levelProgress.progressPct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #D4AF37 0%, #F2D675 100%)',
                  boxShadow: '0 0 12px rgba(242, 214, 117, 0.6)',
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
          </div>

          {/* Badges Pill Row */}
          <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#9A9078', marginRight: '0.5rem' }}>Honored Badges:</span>
            {profile.badges.map((b, i) => (
              <span
                key={i}
                style={{
                  background: 'rgba(212, 175, 55, 0.15)',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  color: '#F2D675',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                }}
              >
                🏅 {b}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(212,175,55,0.2)', paddingBottom: '0.5rem' }}>
          <button
            onClick={() => setActiveTab('progress')}
            style={{
              background: activeTab === 'progress' ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
              border: activeTab === 'progress' ? '1px solid #D4AF37' : '1px solid transparent',
              color: activeTab === 'progress' ? '#F2D675' : '#9A9078',
              padding: '0.65rem 1.4rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            📜 Quests &amp; Rewards
          </button>

          <button
            onClick={() => setActiveTab('bazaar')}
            style={{
              background: activeTab === 'bazaar' ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
              border: activeTab === 'bazaar' ? '1px solid #D4AF37' : '1px solid transparent',
              color: activeTab === 'bazaar' ? '#F2D675' : '#9A9078',
              padding: '0.65rem 1.4rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            🛍️ Sacred Bazaar &amp; Inventory
          </button>

          <button
            onClick={() => setActiveTab('jigsaw')}
            style={{
              background: activeTab === 'jigsaw' ? 'rgba(212, 175, 55, 0.2)' : 'transparent',
              border: activeTab === 'jigsaw' ? '1px solid #D4AF37' : '1px solid transparent',
              color: activeTab === 'jigsaw' ? '#F2D675' : '#9A9078',
              padding: '0.65rem 1.4rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            🧩 3x4 Jigsaw Mini-Game
          </button>
        </div>

        {/* TAB 1: QUESTS & REWARDS */}
        {activeTab === 'progress' && (
          <div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#D4AF37', marginBottom: '1.25rem' }}>
              Active Sadhana Quests
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {profile.activeQuests.map((quest) => (
                <div
                  key={quest.id}
                  className="temple-card"
                  style={{
                    background: 'rgba(33, 29, 18, 0.7)',
                    border: quest.status === 'claimed' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          background: quest.status === 'claimed' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(212, 175, 55, 0.15)',
                          color: quest.status === 'claimed' ? '#34d399' : '#F2D675',
                        }}
                      >
                        {quest.category}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#9A9078' }}>
                        {quest.status === 'claimed' ? '✅ Claimed' : '⏳ In Progress'}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#EDE8D5', marginBottom: '0.5rem' }}>
                      {quest.title}
                    </h4>
                    <p style={{ color: '#9A9078', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {quest.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.88rem' }}>
                      <span style={{ color: '#F2D675', fontWeight: 600 }}>+{quest.rewardXp} XP</span>
                      <span style={{ color: '#F2D675', fontWeight: 600 }}>+{quest.rewardCoins} 🪙 Coins</span>
                    </div>

                    {quest.status === 'claimed' ? (
                      <button
                        disabled
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: 'rgba(255,255,255,0.06)',
                          color: '#9A9078',
                          fontWeight: 600,
                          cursor: 'not-allowed',
                        }}
                      >
                        Claimed
                      </button>
                    ) : (
                      <button
                        onClick={() => handleClaimQuest(quest)}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          borderRadius: '6px',
                          border: 'none',
                          background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                          color: '#0D0B08',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'opacity 0.2s',
                        }}
                      >
                        Complete &amp; Claim Reward
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SACRED BAZAAR & BACKPACK */}
        {activeTab === 'bazaar' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#D4AF37' }}>
                Sacred Bazaar Catalog
              </h3>
              <div style={{ color: '#F2D675', fontSize: '1rem', fontWeight: 600 }}>
                Balance: {profile.coins} 🪙
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {BAZAAR_CATALOG.map((item) => (
                <div
                  key={item.id}
                  className="temple-card"
                  style={{
                    background: 'rgba(33, 29, 18, 0.85)',
                    border: '1px solid rgba(212, 175, 55, 0.25)',
                    borderRadius: '10px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '4px',
                          background:
                            item.rarity === 'legendary'
                              ? 'rgba(234, 179, 8, 0.25)'
                              : item.rarity === 'epic'
                              ? 'rgba(168, 85, 247, 0.25)'
                              : 'rgba(59, 130, 246, 0.25)',
                          color:
                            item.rarity === 'legendary'
                              ? '#facc15'
                              : item.rarity === 'epic'
                              ? '#c084fc'
                              : '#93c5fd',
                        }}
                      >
                        {item.rarity}
                      </span>
                    </div>

                    <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#EDE8D5', marginBottom: '0.4rem' }}>
                      {item.name}
                    </h4>
                    <p style={{ color: '#9A9078', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '0.8rem' }}>
                      {item.description}
                    </p>
                    <div style={{ fontStyle: 'italic', color: '#c4b5fd', fontSize: '0.8rem', marginBottom: '1.25rem' }}>
                      ✨ {item.benefits}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '1rem' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F2D675' }}>{item.price} 🪙</span>
                    <button
                      onClick={() => handleBuyItem(item)}
                      style={{
                        padding: '0.5rem 1.25rem',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
                        color: '#0D0B08',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Acquire
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Inventory Backpack */}
            <div style={{ borderTop: '1px solid rgba(212, 175, 55, 0.25)', paddingTop: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#D4AF37', marginBottom: '1.25rem' }}>
                🎒 Sadhaka Backpack &amp; Inventory ({profile.inventory.length} items)
              </h3>
              {profile.inventory.length === 0 ? (
                <p style={{ color: '#9A9078', fontStyle: 'italic' }}>Your backpack is empty. Visit the Bazaar above to acquire relics and ayurvedic herbs.</p>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {profile.inventory.map((invItem) => (
                    <div
                      key={invItem.itemId}
                      className="temple-card"
                      style={{
                        background: 'rgba(25, 22, 15, 0.9)',
                        border: invItem.isEquipped ? '1px solid #F2D675' : '1px solid rgba(212, 175, 55, 0.2)',
                        borderRadius: '8px',
                        padding: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.8rem' }}>{invItem.icon}</span>
                          <span style={{ fontSize: '0.8rem', color: '#9A9078' }}>Qty: {invItem.quantity}</span>
                        </div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: '#EDE8D5', marginBottom: '0.3rem' }}>
                          {invItem.name}
                        </h4>
                        <p style={{ color: '#9A9078', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                          {invItem.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleToggleEquip(invItem.itemId)}
                        style={{
                          width: '100%',
                          padding: '0.45rem',
                          borderRadius: '6px',
                          border: invItem.isEquipped ? '1px solid #10b981' : '1px solid rgba(212,175,55,0.4)',
                          background: invItem.isEquipped ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                          color: invItem.isEquipped ? '#34d399' : '#EDE8D5',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {invItem.isEquipped ? 'Equipped (Active)' : 'Equip Relic'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: 3x4 JIGSAW MINI-GAME */}
        {activeTab === 'jigsaw' && (
          <div>
            {/* Category Selector */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem', alignItems: 'center' }}>
              <span style={{ color: '#9A9078', fontSize: '0.9rem' }}>Lore Tradition:</span>
              {PUZZLE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    background: selectedCategory === cat.id ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255,255,255,0.04)',
                    border: selectedCategory === cat.id ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.1)',
                    color: selectedCategory === cat.id ? '#F2D675' : '#EDE8D5',
                    padding: '0.45rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {cat.symbol} {cat.label}
                </button>
              ))}
            </div>

            {/* Game Dashboard Stats */}
            <div
              className="temple-card"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                marginBottom: '1.5rem',
                background: 'rgba(20, 17, 12, 0.95)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
              }}
            >
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#9A9078', textTransform: 'uppercase' }}>Moves: </span>
                  <span style={{ fontWeight: 700, color: '#F2D675' }}>{movesCount}</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#9A9078', textTransform: 'uppercase' }}>Time: </span>
                  <span style={{ fontWeight: 700, color: '#F2D675' }}>{timerSeconds}s</span>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#9A9078', textTransform: 'uppercase' }}>Hints Used: </span>
                  <span style={{ fontWeight: 700, color: '#f87171' }}>{hintsUsed} (-{hintsUsed * 5} 🪙)</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={handleUseHint}
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: '#F2D675',
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  💡 Seek Hint (-5 🪙)
                </button>
                <button
                  onClick={() => resetPuzzle(selectedCategory)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#EDE8D5',
                    padding: '0.45rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>

            {/* Victory Laurel Modal */}
            {puzzleWon && winRewardDetails && (
              <div
                style={{
                  background: 'rgba(16, 185, 129, 0.15)',
                  border: '1px solid #10b981',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉 🪷 🏆</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', color: '#34d399', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                  Cosmic Mandala Aligned!
                </h3>
                <p style={{ color: '#EDE8D5', maxWidth: '600px', margin: '0 auto 1rem', fontSize: '0.92rem' }}>
                  {TILE_SETS[selectedCategory][0].lore} You have conquered despondency and restored sacred order.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontWeight: 700, color: '#F2D675', fontSize: '1.1rem' }}>
                  <span>+{winRewardDetails.xp} XP</span>
                  <span>+{winRewardDetails.coins} 🪙 Coins</span>
                  <span>Score: {winRewardDetails.score}</span>
                </div>
              </div>
            )}

            {/* 3x4 Jigsaw Board (12 Slots: 3 rows x 4 columns) */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: '#9A9078', marginBottom: '0.75rem', fontWeight: 600 }}>
                Mandala Altar (3x4 Grid — Click or Drag unplaced tiles into matching slots):
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '0.75rem',
                  background: 'rgba(13, 11, 8, 0.95)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '2px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: 'inset 0 0 24px rgba(0,0,0,0.8)',
                }}
              >
                {gridSlots.map((slotTile, idx) => {
                  const isCorrect = slotTile?.id === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSlotClick(idx)}
                      style={{
                        minHeight: '110px',
                        background: slotTile
                          ? isCorrect
                            ? 'rgba(16, 185, 129, 0.15)'
                            : 'rgba(212, 175, 55, 0.12)'
                          : 'rgba(255, 255, 255, 0.03)',
                        border: slotTile
                          ? isCorrect
                            ? '2px solid #10b981'
                            : '2px solid #D4AF37'
                          : '2px dashed rgba(212, 175, 55, 0.25)',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        transition: 'transform 0.15s ease, border-color 0.15s ease',
                        textAlign: 'center',
                      }}
                    >
                      {slotTile ? (
                        <>
                          <div style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{slotTile.symbol}</div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isCorrect ? '#34d399' : '#F2D675' }}>
                            {slotTile.label}
                          </div>
                          <div style={{ fontSize: '0.65rem', color: '#9A9078', marginTop: '0.2rem' }}>
                            {isCorrect ? '✓ Aligned' : 'Click to retrieve'}
                          </div>
                        </>
                      ) : (
                        <div style={{ color: 'rgba(212, 175, 55, 0.4)', fontSize: '0.8rem' }}>
                          Slot {idx + 1}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Unplaced Tile Tray */}
            <div>
              <div style={{ fontSize: '0.9rem', color: '#9A9078', marginBottom: '0.75rem', fontWeight: 600 }}>
                Unplaced Tray ({trayTiles.length} tiles remaining — Click a tile to select, then click an altar slot):
              </div>
              {trayTiles.length === 0 ? (
                <div style={{ color: '#34d399', fontStyle: 'italic', padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '8px' }}>
                  All 12 mandala pieces have been placed on the altar!
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                    gap: '0.75rem',
                    background: 'rgba(20, 17, 12, 0.8)',
                    padding: '1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                >
                  {trayTiles.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTrayTileId(selectedTrayTileId === t.id ? null : t.id)}
                      style={{
                        padding: '0.75rem 0.5rem',
                        background: selectedTrayTileId === t.id ? 'rgba(212, 175, 55, 0.3)' : 'rgba(33, 29, 18, 0.9)',
                        border: selectedTrayTileId === t.id ? '2px solid #F2D675' : '1px solid rgba(212, 175, 55, 0.3)',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transform: selectedTrayTileId === t.id ? 'scale(1.05)' : 'none',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <div style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>{t.symbol}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#EDE8D5' }}>{t.label}</div>
                      <div style={{ fontSize: '0.62rem', color: '#9A9078', marginTop: '0.2rem' }}>{t.lore}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
