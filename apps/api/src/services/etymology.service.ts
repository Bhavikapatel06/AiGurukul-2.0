import { CANONICAL_ETYMOLOGY_ENTRIES } from '@ai-gurukul/database';
import { EtymologyEntryDTO, SupportedLanguage } from '@ai-gurukul/types';

export class EtymologyService {
  getAllEtymologies(): EtymologyEntryDTO[] {
    return CANONICAL_ETYMOLOGY_ENTRIES;
  }

  getEtymologyByRoot(root: string): EtymologyEntryDTO | null {
    const cleanRoot = root.trim().toLowerCase();
    const entry = CANONICAL_ETYMOLOGY_ENTRIES.find((e) => {
      return (
        e.root.toLowerCase().includes(cleanRoot) ||
        e.rootIast.toLowerCase() === cleanRoot ||
        e.rootDevanagari.includes(cleanRoot) ||
        e.derivedWords.some((w) => w.toLowerCase().includes(cleanRoot))
      );
    });
    return entry || null;
  }

  searchEtymologies(query: string, language?: SupportedLanguage): EtymologyEntryDTO[] {
    const clean = query.trim().toLowerCase();
    return CANONICAL_ETYMOLOGY_ENTRIES.filter((e) => {
      const langMatch = language ? e.language === language : true;
      const textMatch =
        !clean ||
        e.root.toLowerCase().includes(clean) ||
        e.rootIast.toLowerCase().includes(clean) ||
        e.rootMeaning.toLowerCase().includes(clean) ||
        e.derivedWords.some((w) => w.toLowerCase().includes(clean)) ||
        e.philosophicalEvolution.toLowerCase().includes(clean);
      return langMatch && textMatch;
    });
  }
}
