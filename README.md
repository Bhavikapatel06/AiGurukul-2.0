# 🕉️ AI Gurukul – Ancient Wisdom for Modern Life

[![Node.js](https://img.shields.io/badge/Node.js-20.0+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14_App_Router-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose_8-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Redis](https://img.shields.io/badge/Redis-BullMQ-DC382D?logo=redis&logoColor=white)](https://redis.io/)
[![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?logo=turborepo&logoColor=white)](https://turbo.build/)

> **AI Gurukul** is an authentic, production-grade digital Gurukul bridging timeless Indian shastric wisdom (*Bhagavad Gita, Upanishads, Charaka Samhita, Thirukkural, Dhammapada, Arthashastra*) with modern AI architectures. It provides personalized guidance, Ayurvedic health diagnostics, an ontology knowledge graph, scriptural RAG, interactive gamification, virtual vernacular keyboards, and deep etymological translation.

---

## 🌟 Key Features Across Completed Phases

| Module | Route | Highlights |
| :--- | :--- | :--- |
| **Authentication & RBAC** | `/login`, `/register` | Dual-token auth, Refresh Token Rotation (RTR), HttpOnly cookies, Google OAuth, Seeker profiles |
| **Wisdom Guidance & SSE** | `/wisdom` | 5 Vedic Personas (Krishna, Chanakya, Charaka, Vyasa, Patanjali) with real-time SSE streaming & XML citation grounding |
| **Ayurvedic Diagnostic** | `/ayurveda` | 18-matrix Charaka Prakriti assessment, Tridosha normalization, Vikriti acute tracker, Ahara & Dinacharya regimens |
| **Knowledge Graph** | `/graph` | 32 ontology nodes, 56 semantic edges, multi-hop BFS shortest path engine, interactive visual canvas |
| **Scripture RAG & Search** | `/documents` | Multi-domain scriptural chunking, Sanskrit term extraction, semantic grounding, citation tracing |
| **Scriptural Quizzes** | `/quizzes` | Timed assessments, instant scoring analytics, AI Sage dynamic quiz generation |
| **Gamification & Jigsaw** | `/gamification` | 5 Seeker tiers (Seeker ➔ Acharya), XP & Coins, Quests, Vedic Bazaar, responsive 3x4 Jigsaw puzzle |
| **Multilingual Studio** | `/languages` | 6 languages (`en`, `hi`, `gu`, `sa`, `ta`, `pi`), Devanagari & Gujarati virtual keyboards, Matra combining, Dhatu root inspector |

---

## 🏗️ Repository Architecture

This repository is organized as a high-performance **Turborepo monorepo**:

```text
AiGurukul-2.0/
├── apps/
│   ├── web/                     # Next.js 14 App Router, Obsidian Temple Design System, TailwindCSS
│   ├── api/                     # Express.js + TypeScript REST & SSE API (Port 5000)
│   └── worker/                  # BullMQ background worker for async vector ingestion & chunking
│
├── packages/
│   ├── types/                   # Shared TypeScript DTOs, domain models, and interfaces
│   ├── validation/              # Zod validation schemas across all domain boundaries
│   ├── database/                # Mongoose models, indexes, and idempotent canonical seeds
│   ├── ai/                      # Multi-provider LLM abstraction (Local fallback, OpenAI, Anthropic, Gemini)
│   ├── embeddings/              # Embedding providers (Local hash embeddings, OpenAI, Cohere)
│   ├── vector-store/            # Vector store abstraction (Local cosine similarity, Pinecone)
│   ├── storage/                 # Document storage providers (Local disk, AWS S3)
│   ├── config/                  # Validated Zod environment loaders
│   └── logging/                 # Structured Pino logger with sensitive data redaction
│
└── package.json                 # Monorepo root workspace configuration
```

---

## 📋 Prerequisites

Ensure the following tools are installed on your machine before running:

1. **Node.js**: `v20.0.0` or higher ([Download Node.js](https://nodejs.org/))
2. **npm**: `v10.0.0` or higher
3. **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster URL.
4. **Redis** *(Optional)*: Local Redis instance (`redis://localhost:6379`) for BullMQ background queues. If Redis is not running, the API automatically operates gracefully in degraded mode.

---

## 🚀 How to Run the Project

### 1. Clone & Enter the Repository
```bash
git clone <repository-url>
cd AiGurukul-2.0
```

### 2. Install All Dependencies
Install monorepo dependencies across all apps and packages:
```bash
npm install
```

### 3. Setup Environment Variables
Copy the example environment configuration into `.env`:
```bash
# Windows PowerShell:
Copy-Item .env.example .env

# macOS / Linux:
cp .env.example .env
```

Review `.env` and configure your database settings if needed:
```ini
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/aigurukul_dev
REDIS_URL=redis://localhost:6379
JWT_ACCESS_SECRET=your_jwt_access_secret_min_32_characters_here!
JWT_REFRESH_SECRET=your_jwt_refresh_secret_min_32_characters_here!
COOKIE_SECRET=your_cookie_secret_min_32_characters_here!

# Pluggable Providers (defaults to deterministic local providers for offline development)
AI_PROVIDER=local
EMBEDDING_PROVIDER=local
VECTOR_STORE_PROVIDER=local
STORAGE_PROVIDER=local
```

### 4. Build Monorepo Packages
Compile all shared TypeScript packages (`@ai-gurukul/types`, `@ai-gurukul/database`, etc.):
```bash
npm run build
```

### 5. Launch the Development Server
Start all applications concurrently (`web`, `api`, and `worker`):
```bash
npm run dev
```

### 6. Access the Application
Once the dev server is active:
- 🌐 **Web Portal (Frontend)**: [http://localhost:3000](http://localhost:3000)
- ⚙️ **Core API (Backend)**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
- 💓 **Health Check**: [http://localhost:5000/health/live](http://localhost:5000/health/live)

---

## 🧭 Navigating the Platform

When you open [http://localhost:3000](http://localhost:3000), explore the dedicated feature studios via the navigation header:

1. **Wisdom Guidance (`/wisdom`)**:
   - Select a Vedic Persona (Lord Krishna, Chanakya, Vaidya Charaka, Sage Vyasa, Sage Patanjali).
   - Enter your existential or practical dilemma.
   - Watch the AI stream responses with verifiable citations linked directly to canonical Sanskrit verses.

2. **Ayurvedic Health Studio (`/ayurveda`)**:
   - Complete the 18-question Charaka Prakriti diagnostic assessment.
   - View your tri-dosha percentage distribution (Vata, Pitta, Kapha).
   - Receive personalized Dinacharya (daily rituals) and Ahara (dietary prescriptions).

3. **Vedic Knowledge Graph (`/graph`)**:
   - Explore interconnected scriptural concepts visually.
   - Run shortest-path queries between distinct concepts (e.g., *Karma* ➔ *Moksha*).

4. **Scripture Vault & RAG (`/documents`)**:
   - Search verses across Bhagavad Gita, Upanishads, and Charaka Samhita.
   - Ground queries in authentic primary texts with exact chapter and verse citations.

5. **Gamification & Vedic Bazaar (`/gamification`)**:
   - Check your Seeker tier and XP level progress bar.
   - Review and claim daily and milestone study quests.
   - Visit the Vedic Bazaar to acquire sacred relics (Sacred Tulsi Mala, Palm-Leaf Gita, Brass Dhyana Lamp) using earned coins.
   - Play the **3x4 Vedic Jigsaw Mini-Game** (12-tile puzzle, hint penalty system, lore categories).

6. **Multilingual Studio (`/languages`)**:
   - Switch between Sanskrit, Hindi, Gujarati, Tamil, Pali, and English.
   - Type using the **Devanagari** or **Gujarati** virtual keyboards with Shift and automatic Matra combining.
   - Explore ancient manuscripts with word-by-word grammatical breakdowns (vibhakti/lakara).
   - Inspect Sanskrit **Dhatu roots** (`कृ`, `ज्ञा`, `धृ`, `युज्`, etc.) and their semantic derivatives.

---

## 🛠️ Monorepo Scripts Reference

All primary commands are executed from the monorepo root:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts all apps in live-reloading watch mode (`apps/web`, `apps/api`, `apps/worker`) |
| `npm run build` | Builds all packages and creates optimized production bundles via Turborepo |
| `npm test` | Runs the Vitest test suite across all packages |
| `npm run typecheck` | Validates TypeScript types across the entire workspace without emitting files |
| `npm run lint` | Runs ESLint checks across packages and applications |
| `npm run format` | Automatically formats code using Prettier |
| `npm run clean` | Cleans build artifacts (`dist`, `.next`) and caches |

---

## ⚙️ Environment Variables Reference

| Variable | Description | Default | Required? |
| :--- | :--- | :--- | :--- |
| `PORT` | HTTP port for the Express API | `5000` | No |
| `CORS_ORIGIN` | Allowed CORS frontend origin | `http://localhost:3000` | No |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://localhost:27017/aigurukul_dev` | Yes (for persistent state) |
| `REDIS_URL` | Redis connection URI | `redis://localhost:6379` | No (Degrades gracefully) |
| `JWT_ACCESS_SECRET` | Secret key for signing 15-minute access JWTs | Min 16 chars | Yes |
| `JWT_REFRESH_SECRET`| Secret key for rotating 7-day refresh tokens | Min 16 chars | Yes |
| `COOKIE_SECRET` | Cookie signing secret | Min 16 chars | Yes |
| `AI_PROVIDER` | AI provider (`local`, `openai`, `anthropic`, `gemini`) | `local` | No |
| `EMBEDDING_PROVIDER`| Embedding provider (`local`, `openai`, `cohere`) | `local` | No |
| `VECTOR_STORE_PROVIDER` | Vector database (`local`, `pinecone`) | `local` | No |
| `STORAGE_PROVIDER` | Document storage provider (`local`, `s3`) | `local` | No |
| `OPENAI_API_KEY` | Optional OpenAI API key for live GPT models | - | Optional |
| `ANTHROPIC_API_KEY`| Optional Anthropic API key for Claude models | - | Optional |
| `GEMINI_API_KEY` | Optional Google Gemini API key | - | Optional |

---

## 📚 Completion Reports

Detailed architectural implementation reports for completed phases:
- [Phase 2 Completion Report](file:///c:/Users/Neel_Patel/Desktop/hackathon/AiGurukul-2.0/PHASE_2_COMPLETION.md) – Authentication, RTR, Security & Obsidian Temple Auth UI
- [Phase 3 Completion Report](file:///c:/Users/Neel_Patel/Desktop/hackathon/AiGurukul-2.0/PHASE_3_COMPLETION.md) – Wisdom Personas, SSE Streaming & Grounded Citations
- [Phase 6 & 7 Completion Report](file:///c:/Users/Neel_Patel/Desktop/hackathon/AiGurukul-2.0/PHASE_6_7_COMPLETION.md) – Gamification, 3x4 Jigsaw, Multilingual Keyboards & Translation Engine

---

## 📜 License

This project is licensed under the MIT License. May timeless wisdom illuminate your learning journey!
