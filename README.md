# KnowledgeFlow Frontend

React frontend for KnowledgeFlow. The app talks to the backend through `REACT_APP_API_URL` and also includes a recruiter-friendly demo login that works without registration.

## Demo Login

Recruiters can use the blue **Demo starten** button on the login page.

Optional demo credentials:

```txt
demo@knowledgeflow.app
demo123
```

The demo mode uses local example data in the browser. It does not require a backend account and does not create OpenAI costs.

## Environment

Frontend `.env`:

```txt
REACT_APP_API_URL=https://your-backend.example.com/api
PUBLIC_URL=/
```

OpenAI keys must stay on the backend only. Do not put `OPENAI_API_KEY` into this frontend repo or into Netlify frontend variables that get exposed to the browser.

Backend hosting should define:

```txt
OPENAI_API_KEY=sk-...
JWT_SECRET=...
DATABASE_URL=...
FRONTEND_URL=https://your-netlify-site.netlify.app
```

For Render, Railway, Fly.io or another backend host, add the key in the backend service settings under environment variables. The frontend only needs `REACT_APP_API_URL`, because all OpenAI requests should go through backend routes such as `/api/ai/summarize/:id`, `/api/ai/flashcards/:id`, `/api/ai/topics/:id`, `/api/ai/insights/:id` and `/api/ai/usage-stats`.

## Scripts

```bash
npm start
npm run build
npm test
```
