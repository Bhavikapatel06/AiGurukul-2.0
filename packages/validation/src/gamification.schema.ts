import { z } from 'zod';

export const ClaimQuestSchema = z.object({
  questId: z.string().min(1, 'Quest ID is required'),
});

export const BuyBazaarItemSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

export const EquipItemSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
});

export const SubmitJigsawSchema = z.object({
  puzzleId: z.string().min(1, 'Puzzle ID is required'),
  moves: z.number().int().min(0, 'Moves must be non-negative'),
  hintsUsed: z.number().int().min(0, 'Hints used must be non-negative'),
  timeSeconds: z.number().int().min(1, 'Time seconds must be at least 1'),
  tilePlacements: z
    .array(z.number().int().min(0).max(11))
    .length(12, 'Must provide all 12 tile placements for a 3x4 grid'),
});

export const AwardXpSchema = z.object({
  xp: z.number().int().min(1, 'XP must be a positive integer'),
  coins: z.number().int().min(0, 'Coins must be non-negative').default(0),
  reason: z.string().min(1, 'Reason for award is required'),
});
