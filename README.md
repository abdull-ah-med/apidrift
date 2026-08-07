# APIDrift

**Semantic API Contract Change Detector**

Paste two API responses (or OpenAPI specs), get a semantic diff that classifies every change as Breaking / Non-Breaking / Deprecation, generates migration snippets, and exports a markdown Migration Guide.

## Stack

| Layer | Tech |
|-------|------|
| Web | Next.js 16 App Router, React 19, Tailwind CSS 4, shadcn/ui, Tailark Mist, React Bits, driver.js, assistant-ui |
| API | FastAPI, Pydantic, deepdiff, openapi-spec-validator |
| Chat | OpenAI via Vercel AI SDK when `OPENAI_API_KEY` is set; otherwise DiffAware local answers |

Official docs referenced during build:

- https://nextjs.org/docs
- https://ui.shadcn.com/docs/installation/next
- https://tailark.com/docs/quick-setup
- https://reactbits.dev/get-started/installation
- https://driverjs.com/docs/installation
- https://www.assistant-ui.com/docs/installation
- https://fastapi.tiangolo.com/
- https://www.oasdiff.com/docs/breaking-changes (classification rule reference)

## Monorepo layout

```
apps/web   — Next.js frontend
apps/api   — FastAPI backend
examples/  — sample JSON + OpenAPI fixtures
.githooks/ — identity + no-push guards
```

## Prerequisites

- Node.js ≥ 20.9
- pnpm 10+
- Python 3.12+
- [uv](https://docs.astral.sh/uv/)

On some networks Node may hang on IPv6. Prefer:

```bash
export NODE_OPTIONS="--dns-result-order=ipv4first --no-network-family-autoselection"
```

## Setup

```bash
./scripts/bootstrap-git.sh   # Abdullah Ahmed identity + hooks (never push)
pnpm install
cd apps/api && uv sync
```

Optional chat:

```bash
cp .env.example apps/web/.env.local
# set OPENAI_API_KEY=...
```

## Run

```bash
# terminal 1 — API
pnpm dev:api
# or: cd apps/api && uv run fastapi dev --host 127.0.0.1 --port 8000

# terminal 2 — Web
pnpm dev:web
```

- Landing: http://localhost:3000
- Workspace: http://localhost:3000/app
- Health: http://127.0.0.1:8000/health
- Browser API calls use `/backend/*` → FastAPI (Next rewrites)

## Tests

```bash
pnpm test:api
cd apps/web && pnpm exec playwright test
```

## Git policy (non-negotiable)

- Author: `Abdullah Ahmed <contactabdullahahmed@gmail.com>`
- GitHub account: `abdull-ah-med`
- **Never push** — `pre-push` hook always fails

## License

See [LICENSE](LICENSE).
