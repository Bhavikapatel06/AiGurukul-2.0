import {
  ManuscriptModel,
  IManuscriptDocument,
  CANONICAL_SEED_MANUSCRIPTS,
  seedCanonicalManuscripts,
} from '@ai-gurukul/database';
import { ManuscriptDTO } from '@ai-gurukul/types';

export class ManuscriptRepository {
  async ensureSeeded(): Promise<number> {
    const count = await ManuscriptModel.countDocuments();
    if (count === 0) {
      return await seedCanonicalManuscripts();
    }
    return count;
  }

  async findAll(filter?: {
    language?: string;
    category?: string;
    search?: string;
  }): Promise<ManuscriptDTO[]> {
    await this.ensureSeeded();

    const query: Record<string, any> = {};
    if (filter?.language) {
      query.originalLanguage = filter.language;
    }
    if (filter?.category) {
      query.canonicalSource = new RegExp(filter.category, 'i');
    }
    if (filter?.search) {
      query.$or = [
        { title: new RegExp(filter.search, 'i') },
        { originalText: new RegExp(filter.search, 'i') },
        { transliteration: new RegExp(filter.search, 'i') },
      ];
    }

    const docs = await ManuscriptModel.find(query).sort({ createdAt: 1 });
    return docs.map((doc) => doc.toDTO());
  }

  async findBySlug(slug: string): Promise<ManuscriptDTO | null> {
    await this.ensureSeeded();
    const doc = await ManuscriptModel.findOne({ slug: slug.toLowerCase() });
    return doc ? doc.toDTO() : null;
  }
}
