# Medium Clone

A full-stack blogging platform inspired by Medium, built with shared TypeScript types and Zod schemas published as a separate npm package to explore code reuse patterns and the motivation behind monorepos like **Turborepo**.

## Project Structure

```
medium/
├── Backend/       # Express API server
├── Frontend/      # React + Vite client
└── Common/        # Shared validation schemas (published to npm)
```

## Shared Package on npm

The `Common/` folder is published to npm as:

```
@kehsihba_dev/medium-common
```

[![npm](https://img.shields.io/npm/v/@kehsihba_dev/medium-common)](https://www.npmjs.com/package/@kehsihba_dev/medium-common)

**Why?** — To learn how shared packages work in a **monorepo / workspace** setup. Both the `Backend` and `Frontend` import validation schemas and inferred TypeScript types from this single source of truth, exactly like a Turborepo shared package.

### What's inside the package?

- **Zod schemas** for input validation (`signUpSchema`, `signInSchema`, `newBlogSchema`, `editBlogSchema`)
- **Inferred TypeScript types** exported for type-safe usage across the stack

---

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Frontend   | React 19, Vite, Tailwind CSS                  |
| Backend    | Express 5, TypeScript, JWT, bcrypt            |
| Database   | PostgreSQL via Prisma ORM                     |
| Validation | Zod (shared through `@kehsihba_dev/medium-common`) |

---

## API Routes

All routes are prefixed with `/api/v1`.

### Auth

| Method | Endpoint  | Auth | Description          |
| ------ | --------- | ---- | -------------------- |
| POST   | `/signup` | ✗    | Register a new user  |
| POST   | `/signin` | ✗    | Login & get JWT      |
| GET    | `/me`     | ✓    | Get current user     |

### Blogs

| Method | Endpoint           | Auth | Description           |
| ------ | ------------------ | ---- | --------------------- |
| GET    | `/bulk`            | ✓    | Fetch all blogs       |
| POST   | `/new`             | ✓    | Create a new blog     |
| PUT    | `/edit`            | ✓    | Edit an existing blog |
| GET    | `/single/:blogId`  | ✓    | Get a single blog     |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- PostgreSQL database

### Setup

```bash
# Clone the repo
git clone https://github.com/Abhishek8841/Medium.git
cd medium

# Backend
cd Backend
npm install
# create a .env with DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npx tsx src/index.ts

# Frontend
cd ../Frontend
npm install
npm run dev
```

---

## Learning Goals

This project was built to understand:

- How **shared packages** work across a monorepo (importing `@kehsihba_dev/medium-common` in both backend & frontend)
- Publishing a scoped package to **npm** and consuming it via `npm install`
- The same patterns used by **Turborepo workspaces** — single source of truth for types & validation
- End-to-end **type safety** from Zod schemas → inferred types → API handlers → frontend forms

---