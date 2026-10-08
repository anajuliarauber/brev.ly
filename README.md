# 🔗 brev.ly

A full-stack URL shortener built with **React, TypeScript, Fastify, and PostgreSQL**.

Create custom short links, track visits, manage URLs, and export link data through a simple, responsive interface.

## ✨ Features

- **Custom short links** — Create personalized, easy-to-share URLs.
- **Link management** — View, copy, and delete shortened links.
- **Visit tracking** — Track how many times each shortened URL is accessed.
- **CSV export** — Download link data, including original URLs, shortened URLs, and visit counts.
- **Form validation** — Validate URLs and prevent duplicate custom aliases.
- **Responsive design** — A clean interface that works across different screen sizes.

## 🛠️ Tech Stack

**Frontend**
- React 19 & TypeScript
- Vite
- Tailwind CSS
- React Query
- React Hook Form & Zod
- Axios
- Radix UI

**Backend**
- Node.js & Fastify
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod

**Infrastructure**
- Docker
- Cloudflare R2

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- pnpm 10
- Docker and Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/anajuliarauber/brev.ly.git
cd brev.ly
```

### 2. Set up the backend

Navigate to the server directory:

```bash
cd server
pnpm install
```

Create a `.env` file:

```env
DATABASE_PORT=5432
DATABASE_URL=postgresql://postgres:110220@localhost:5432/postgres

# Required for CSV exports
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_BUCKET=
CLOUDFLARE_PUBLIC_URL=
```

The database credentials above match the local Docker configuration. Use different credentials outside local development.

Start PostgreSQL:

```bash
docker compose up -d
```

Run the database migrations:

```bash
pnpm db:migrate
```

Start the development server:

```bash
pnpm dev
```

The API will be available at `http://localhost:3333`.

### 3. Set up the frontend

Open another terminal and navigate to the web directory:

```bash
cd web
pnpm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3333
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:5173` in your browser.

**Note:** Short URLs currently use `localhost:5173` in the frontend and backend implementations. These values need to be configurable before deployment to a production domain.

## 📁 Project Structure

```text
brev.ly/
├── web/
│   └── src/
│       ├── components/   # UI components
│       ├── http/         # API requests and React Query hooks
│       ├── layouts/      # Shared layouts
│       ├── pages/        # Application pages
│       └── utils/        # Utility functions
│
└── server/
    └── src/
        ├── functions/    # Business logic
        ├── infra/
        │   ├── db/       # Database configuration
        │   ├── http/     # API routes
        │   └── storage/  # Cloudflare R2 integration
        └── shared/       # Shared utilities
```

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/links` | Create a shortened URL |
| GET | `/links` | Retrieve all links |
| DELETE | `/links/:id` | Delete a link |
| GET | `/links/resolve/:shortUrl` | Resolve a shortened URL |
| POST | `/links/export` | Export links as CSV |

## 💡 How It Works

When a user creates a shortened URL, the application validates the original URL and custom alias before saving the link in PostgreSQL.

When someone accesses a shortened link, the application retrieves the original destination, increments its visit counter, and redirects the visitor.

Users can also export their saved links as a CSV file. The backend processes the records using streams and uploads the generated file to Cloudflare R2.

---

Built by [Ana Julia Rauber](https://github.com/anajuliarauber).
