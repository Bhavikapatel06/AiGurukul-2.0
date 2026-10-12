import { Request, Response, NextFunction } from 'express';
import { GamificationService } from '../services/gamification.service.js';
import {
  ClaimQuestSchema,
  BuyBazaarItemSchema,
  EquipItemSchema,
  SubmitJigsawSchema,
  AwardXpSchema,
} from '@ai-gurukul/validation';
import { BadRequestError } from '@ai-gurukul/types';

export class GamificationController {
  constructor(private service: GamificationService) {}

  private getUserId(req: Request): string {
    const id = req.user?.sub || (req as any).user?.id || req.query.userId || req.body?.userId;
    if (!id) {
      throw new BadRequestError('User ID is required');
    }
    return String(id);
  }

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const profile = await this.service.getProfile(userId);
      res.status(200).json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  };

  getQuests = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const quests = await this.service.getQuests(userId);
      res.status(200).json({ success: true, data: quests });
    } catch (err) {
      next(err);
    }
  };

  claimQuest = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const questId = req.params.id || req.body.questId;
      const parsed = ClaimQuestSchema.parse({ questId });

      const result = await this.service.completeQuest(userId, parsed.questId);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  getBazaarCatalog = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const items = this.service.getBazaarItems();
      res.status(200).json({ success: true, data: items });
    } catch (err) {
      next(err);
    }
  };

  buyBazaarItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const parsed = BuyBazaarItemSchema.parse(req.body);
      const result = await this.service.buyBazaarItem(userId, parsed.itemId);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  getInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const inventory = await this.service.getInventory(userId);
      res.status(200).json({ success: true, data: inventory });
    } catch (err) {
      next(err);
    }
  };

  equipItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const parsed = EquipItemSchema.parse(req.body);
      const profile = await this.service.equipItem(userId, parsed.itemId, req.body.equip !== false);
      res.status(200).json({ success: true, data: profile });
    } catch (err) {
      next(err);
    }
  };

  getPuzzles = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const puzzles = this.service.getPuzzles();
      res.status(200).json({ success: true, data: puzzles });
    } catch (err) {
      next(err);
    }
  };

  getPuzzleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const puzzle = this.service.getPuzzleById(req.params.id);
      res.status(200).json({ success: true, data: puzzle });
    } catch (err) {
      next(err);
    }
  };

  submitJigsaw = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const parsed = SubmitJigsawSchema.parse(req.body);
      const result = await this.service.submitJigsawPuzzle(userId, parsed);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  awardXp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = this.getUserId(req);
      const parsed = AwardXpSchema.parse(req.body);
      const result = await this.service.awardXpAndCoins(
        userId,
        parsed.xp,
        parsed.coins,
        parsed.reason
      );
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
