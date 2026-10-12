import { Schema, model, Document, Model, Types } from 'mongoose';
import {
  GurukulLevel,
  UserGamificationDTO,
  InventoryItemDTO,
  QuestDTO,
  calculateGurukulLevel,
} from '@ai-gurukul/types';

export interface IGamificationProfileDocument extends Document {
  userId: Types.ObjectId;
  xp: number;
  coins: number;
  level: GurukulLevel;
  stats: {
    questsCompleted: number;
    puzzlesSolved: number;
    itemsPurchased: number;
    streakDays: number;
    lastActiveDate: string;
  };
  badges: string[];
  inventory: Array<{
    itemId: string;
    code: string;
    name: string;
    category: string;
    rarity: string;
    icon: string;
    description: string;
    acquiredAt: Date;
    quantity: number;
    isEquipped: boolean;
  }>;
  activeQuests: Array<{
    questId: string;
    code: string;
    title: string;
    description: string;
    category: string;
    rewardXp: number;
    rewardCoins: number;
    rewardBadge?: string;
    targetCount: number;
    currentCount: number;
    status: string;
    completedAt?: Date;
    claimedAt?: Date;
  }>;
  puzzleHistory: Array<{
    puzzleId: string;
    category: string;
    moves: number;
    hintsUsed: number;
    timeSeconds: number;
    score: number;
    completedAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  toDTO(): UserGamificationDTO;
}

const InventoryItemSchema = new Schema(
  {
    itemId: { type: String, required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['sacred_relic', 'ayurvedic_herb', 'manuscript', 'title', 'avatar_frame'],
      required: true,
    },
    rarity: {
      type: String,
      enum: ['common', 'rare', 'epic', 'legendary'],
      default: 'common',
      required: true,
    },
    icon: { type: String, default: '📿' },
    description: { type: String, default: '' },
    acquiredAt: { type: Date, default: Date.now },
    quantity: { type: Number, default: 1, min: 1 },
    isEquipped: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserQuestSchema = new Schema(
  {
    questId: { type: String, required: true },
    code: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['daily', 'scriptural', 'puzzle', 'ayurveda'],
      required: true,
    },
    rewardXp: { type: Number, required: true, min: 0 },
    rewardCoins: { type: Number, required: true, min: 0 },
    rewardBadge: { type: String },
    targetCount: { type: Number, required: true, default: 1 },
    currentCount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ['available', 'in_progress', 'completed', 'claimed'],
      default: 'available',
      required: true,
    },
    completedAt: { type: Date },
    claimedAt: { type: Date },
  },
  { _id: false }
);

const PuzzleHistorySchema = new Schema(
  {
    puzzleId: { type: String, required: true },
    category: { type: String, required: true },
    moves: { type: Number, required: true },
    hintsUsed: { type: Number, default: 0 },
    timeSeconds: { type: Number, required: true },
    score: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

export const GamificationProfileSchema = new Schema<IGamificationProfileDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
      index: true,
    },
    xp: {
      type: Number,
      default: 0,
      min: 0,
      index: true,
    },
    coins: {
      type: Number,
      default: 100, // Starting endowment for new seekers
      min: 0,
    },
    level: {
      type: String,
      enum: ['Seeker', 'Learner', 'Thinker', 'Philosopher', 'Acharya'],
      default: 'Seeker',
      required: true,
      index: true,
    },
    stats: {
      questsCompleted: { type: Number, default: 0 },
      puzzlesSolved: { type: Number, default: 0 },
      itemsPurchased: { type: Number, default: 0 },
      streakDays: { type: Number, default: 1 },
      lastActiveDate: { type: String, default: () => new Date().toISOString().split('T')[0] },
    },
    badges: {
      type: [String],
      default: ['Sadhaka Initiation'],
    },
    inventory: {
      type: [InventoryItemSchema],
      default: [],
    },
    activeQuests: {
      type: [UserQuestSchema],
      default: [],
    },
    puzzleHistory: {
      type: [PuzzleHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
    strict: 'throw',
    toJSON: {
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

GamificationProfileSchema.methods.toDTO = function (): UserGamificationDTO {
  const levelInfo = calculateGurukulLevel(this.xp);
  return {
    id: this._id ? this._id.toString() : '',
    userId: this.userId ? this.userId.toString() : '',
    xp: this.xp,
    coins: this.coins,
    level: levelInfo.level,
    levelProgress: levelInfo,
    stats: {
      questsCompleted: this.stats?.questsCompleted || 0,
      puzzlesSolved: this.stats?.puzzlesSolved || 0,
      itemsPurchased: this.stats?.itemsPurchased || 0,
      streakDays: this.stats?.streakDays || 1,
      lastActiveDate: this.stats?.lastActiveDate || new Date().toISOString().split('T')[0],
    },
    badges: this.badges || [],
    inventory: (this.inventory || []).map(
      (item: any): InventoryItemDTO => ({
        itemId: item.itemId,
        code: item.code,
        name: item.name,
        category: item.category,
        rarity: item.rarity,
        icon: item.icon,
        description: item.description,
        acquiredAt: item.acquiredAt ? new Date(item.acquiredAt).toISOString() : new Date().toISOString(),
        quantity: item.quantity,
        isEquipped: item.isEquipped ?? false,
      })
    ),
    activeQuests: (this.activeQuests || []).map(
      (q: any): QuestDTO => ({
        id: q.questId,
        code: q.code,
        title: q.title,
        description: q.description,
        category: q.category,
        rewardXp: q.rewardXp,
        rewardCoins: q.rewardCoins,
        rewardBadge: q.rewardBadge,
        targetCount: q.targetCount,
        currentCount: q.currentCount,
        status: q.status,
        completedAt: q.completedAt ? new Date(q.completedAt).toISOString() : undefined,
        claimedAt: q.claimedAt ? new Date(q.claimedAt).toISOString() : undefined,
      })
    ),
  };
};

export const GamificationProfileModel: Model<IGamificationProfileDocument> =
  model<IGamificationProfileDocument>('GamificationProfile', GamificationProfileSchema);
