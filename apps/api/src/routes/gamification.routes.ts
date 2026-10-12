import { Router } from 'express';
import { GamificationController } from '../controllers/gamification.controller.js';
import { requireAuth, optionalAuth } from '../middlewares/auth.middleware.js';

export interface GamificationRoutesOptions {
  controller: GamificationController;
  jwtSecret: string;
}

export function createGamificationRouter(options: GamificationRoutesOptions): Router {
  const router = Router();
  const { controller, jwtSecret } = options;
  const authGuard = requireAuth(jwtSecret);
  const optGuard = optionalAuth(jwtSecret);

  // Profile, stats, XP, level
  router.get('/profile', optGuard, controller.getProfile);
  router.post('/award-xp', authGuard, controller.awardXp);

  // Quests
  router.get('/quests', optGuard, controller.getQuests);
  router.post('/quests/:id/claim', optGuard, controller.claimQuest);

  // Bazaar
  router.get('/bazaar', controller.getBazaarCatalog);
  router.post('/bazaar/buy', optGuard, controller.buyBazaarItem);

  // Inventory
  router.get('/inventory', optGuard, controller.getInventory);
  router.post('/inventory/equip', optGuard, controller.equipItem);

  // Jigsaw Mini-Game (3x4)
  router.get('/jigsaw/puzzles', controller.getPuzzles);
  router.get('/jigsaw/puzzles/:id', controller.getPuzzleById);
  router.post('/jigsaw/complete', optGuard, controller.submitJigsaw);

  return router;
}
