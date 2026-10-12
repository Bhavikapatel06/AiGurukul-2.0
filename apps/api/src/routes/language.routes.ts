import { Router } from 'express';
import { LanguageController } from '../controllers/language.controller.js';

export interface LanguageRoutesOptions {
  controller: LanguageController;
}

export function createLanguageRouter(options: LanguageRoutesOptions): Router {
  const router = Router();
  const { controller } = options;

  // 1. Supported languages registry
  router.get('/supported', controller.getSupportedLanguages);

  // 2. Virtual keyboard layouts (Devanagari, Gujarati)
  router.get('/keyboards/:language', controller.getKeyboardLayout);
  router.get('/keyboards', controller.getKeyboardLayout);

  // 3. Translation engine (Sanskrit/Tamil/Pali -> English/Hindi and bidirectional)
  router.post('/translate', controller.translate);

  // 4. Canonical Manuscripts with word breakdowns
  router.get('/manuscripts', controller.getManuscripts);
  router.get('/manuscripts/:slug', controller.getManuscriptBySlug);

  // 5. Root-word (Dhatu) & Etymology
  router.get('/etymology', controller.getEtymologies);
  router.get('/etymology/:root', controller.getEtymologyByRoot);

  return router;
}
