export type GurukulLevel = 'Seeker' | 'Learner' | 'Thinker' | 'Philosopher' | 'Acharya';

export interface LevelThreshold {
  level: GurukulLevel;
  minXp: number;
  maxXp: number | null; // null for Acharya (highest level)
  titleSanskrit: string;
  description: string;
}

export const GURUKUL_LEVEL_THRESHOLDS: Record<GurukulLevel, LevelThreshold> = {
  Seeker: {
    level: 'Seeker',
    minXp: 0,
    maxXp: 250,
    titleSanskrit: 'जिज्ञासु (Jijñāsu)',
    description: 'One who steps onto the sacred threshold with earnest curiosity.',
  },
  Learner: {
    level: 'Learner',
    minXp: 250,
    maxXp: 700,
    titleSanskrit: 'अध्येता (Adhyetā)',
    description: 'A devoted student absorbing foundational scripture and practice.',
  },
  Thinker: {
    level: 'Thinker',
    minXp: 700,
    maxXp: 1500,
    titleSanskrit: 'मननशील (Mananaśīla)',
    description: 'An introspective scholar who deeply contemplates inner truths.',
  },
  Philosopher: {
    level: 'Philosopher',
    minXp: 1500,
    maxXp: 3000,
    titleSanskrit: 'तत्त्वदर्शी (Tattvadarśī)',
    description: 'A seer of truth with holistic vision across multiple shastras.',
  },
  Acharya: {
    level: 'Acharya',
    minXp: 3000,
    maxXp: null,
    titleSanskrit: 'आचार्य (Ācārya)',
    description: 'A supreme master whose conduct exemplifies timeless wisdom.',
  },
};

export interface LevelProgressInfo {
  level: GurukulLevel;
  currentXp: number;
  nextLevel: GurukulLevel | null;
  nextLevelXp: number;
  xpNeededForNext: number;
  progressPct: number;
  titleSanskrit: string;
}

export function calculateGurukulLevel(xp: number): LevelProgressInfo {
  const safeXp = Math.max(0, Math.floor(xp));

  if (safeXp >= 3000) {
    return {
      level: 'Acharya',
      currentXp: safeXp,
      nextLevel: null,
      nextLevelXp: 3000,
      xpNeededForNext: 0,
      progressPct: 100,
      titleSanskrit: GURUKUL_LEVEL_THRESHOLDS.Acharya.titleSanskrit,
    };
  }

  if (safeXp >= 1500) {
    const min = 1500;
    const max = 3000;
    const progressPct = Math.min(100, Math.round(((safeXp - min) / (max - min)) * 100));
    return {
      level: 'Philosopher',
      currentXp: safeXp,
      nextLevel: 'Acharya',
      nextLevelXp: max,
      xpNeededForNext: max - safeXp,
      progressPct,
      titleSanskrit: GURUKUL_LEVEL_THRESHOLDS.Philosopher.titleSanskrit,
    };
  }

  if (safeXp >= 700) {
    const min = 700;
    const max = 1500;
    const progressPct = Math.min(100, Math.round(((safeXp - min) / (max - min)) * 100));
    return {
      level: 'Thinker',
      currentXp: safeXp,
      nextLevel: 'Philosopher',
      nextLevelXp: max,
      xpNeededForNext: max - safeXp,
      progressPct,
      titleSanskrit: GURUKUL_LEVEL_THRESHOLDS.Thinker.titleSanskrit,
    };
  }

  if (safeXp >= 250) {
    const min = 250;
    const max = 700;
    const progressPct = Math.min(100, Math.round(((safeXp - min) / (max - min)) * 100));
    return {
      level: 'Learner',
      currentXp: safeXp,
      nextLevel: 'Thinker',
      nextLevelXp: max,
      xpNeededForNext: max - safeXp,
      progressPct,
      titleSanskrit: GURUKUL_LEVEL_THRESHOLDS.Learner.titleSanskrit,
    };
  }

  const min = 0;
  const max = 250;
  const progressPct = Math.min(100, Math.round(((safeXp - min) / (max - min)) * 100));
  return {
    level: 'Seeker',
    currentXp: safeXp,
    nextLevel: 'Learner',
    nextLevelXp: max,
    xpNeededForNext: max - safeXp,
    progressPct,
    titleSanskrit: GURUKUL_LEVEL_THRESHOLDS.Seeker.titleSanskrit,
  };
}

export type QuestCategory = 'daily' | 'scriptural' | 'puzzle' | 'ayurveda';
export type QuestStatus = 'available' | 'in_progress' | 'completed' | 'claimed';

export interface QuestDTO {
  id: string;
  code: string;
  title: string;
  description: string;
  category: QuestCategory;
  rewardXp: number;
  rewardCoins: number;
  rewardBadge?: string;
  targetCount: number;
  currentCount: number;
  status: QuestStatus;
  completedAt?: string;
  claimedAt?: string;
}

export type BazaarItemCategory =
  | 'sacred_relic'
  | 'ayurvedic_herb'
  | 'manuscript'
  | 'title'
  | 'avatar_frame';

export type ItemRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface BazaarItemDTO {
  id: string;
  code: string;
  name: string;
  category: BazaarItemCategory;
  rarity: ItemRarity;
  price: number;
  icon: string;
  description: string;
  loreSnippet: string;
  benefits: string;
}

export interface InventoryItemDTO {
  itemId: string;
  code: string;
  name: string;
  category: BazaarItemCategory;
  rarity: ItemRarity;
  icon: string;
  description: string;
  acquiredAt: string;
  quantity: number;
  isEquipped: boolean;
}

export interface GamificationStatsDTO {
  questsCompleted: number;
  puzzlesSolved: number;
  itemsPurchased: number;
  streakDays: number;
  lastActiveDate: string;
}

export interface UserGamificationDTO {
  id: string;
  userId: string;
  xp: number;
  coins: number;
  level: GurukulLevel;
  levelProgress: LevelProgressInfo;
  stats: GamificationStatsDTO;
  badges: string[];
  inventory: InventoryItemDTO[];
  activeQuests: QuestDTO[];
}

export type JigsawLoreCategory =
  | 'ramayana'
  | 'mahabharata'
  | 'cosmology'
  | 'temple'
  | 'ayurveda';

export interface JigsawTileDTO {
  tileId: number;
  correctRow: number; // 0 to 2 (for 3 rows)
  correctCol: number; // 0 to 3 (for 4 cols)
  correctIndex: number; // 0 to 11 (3x4 = 12 tiles)
  label: string;
  symbol: string;
  loreSnippet: string;
}

export interface JigsawPuzzleDTO {
  id: string;
  code: string;
  title: string;
  category: JigsawLoreCategory;
  description: string;
  rows: 3;
  cols: 4;
  totalTiles: 12;
  rewardXp: number;
  rewardCoins: number;
  hintCost: number; // coins deducted per hint
  penaltyPerWrongMove: number;
  tiles: JigsawTileDTO[];
  loreCompletionNotes: string;
}

export interface SubmitJigsawRequestDTO {
  puzzleId: string;
  moves: number;
  hintsUsed: number;
  timeSeconds: number;
  tilePlacements: number[]; // Array of 12 tileIds in slot 0..11
}

export interface JigsawCompletionResultDTO {
  success: boolean;
  earnedXp: number;
  earnedCoins: number;
  finalScore: number;
  hintsPenalty: number;
  leveledUp: boolean;
  newLevel: GurukulLevel;
  newXp: number;
  newCoins: number;
  loreCompletionNotes: string;
  profile: UserGamificationDTO;
}
