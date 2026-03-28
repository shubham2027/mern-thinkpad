# MERN Thinkpad

Full-stack note-taking app built with MongoDB, Express, React, and Node.js.

## Features

- Notes CRUD with per-user ownership
- JWT auth (email/password)
- Google Sign-In auth
- Protected frontend routes
- Axios auth interceptor with auto Bearer token
- Upstash Redis rate limiting
- Tailwind + DaisyUI UI

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- React Hot Toast
- Tailwind CSS + DaisyUI
- @react-oauth/google

### Backend

- Node.js + Express
- MongoDB + Mongoose
- jsonwebtoken
- bcryptjs
- google-auth-library
- Upstash Redis rate limiting

## Project Structure

```text
mern-thinkpad/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |-- controllers/
|   |   |-- middleware/
|   |   |-- models/
|   |   |-- routes/
|   |   `-- server.js
|   `-- package.json
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- lib/
|   |   |-- pages/
|   |   |-- App.jsx
|   |   `-- main.jsx
|   `-- package.json
`-- package.json
```

## Environment Variables

### Backend (.env)

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
JWT_SECRET=your_jwt_secret

UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

## Local Development

Install dependencies:

```bash
npm install --prefix backend
npm install --prefix frontend
```

Run backend:

```bash
cd backend
npm run dev
```

Run frontend:

```bash
cd frontend
npm run dev
```

Default ports:

- Backend: http://localhost:5001
- Frontend: http://localhost:5173

Note: Vite may move to 5174/5175 if 5173 is already in use.

## Root Scripts

From repository root:

```bash
npm run build
npm run start
```

- build: installs backend + frontend dependencies and builds frontend
- start: starts backend service

## API Endpoints

### Auth

- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/google
- GET /api/auth/me

### Notes (protected)

- GET /api/notes
- POST /api/notes
- GET /api/notes/:id
- PUT /api/notes/:id
- DELETE /api/notes/:id

Protected routes require:

```http
Authorization: Bearer <jwt_token>
```

## Authentication Behavior

- Email/password auth issues a JWT token valid for 7 days
- Google Sign-In verifies Google ID token on backend and returns app JWT
- Token is stored in localStorage (mindscribe_token)
- Axios adds Authorization header automatically
- On 401, frontend logs out and redirects to /login (except on auth pages)

## Database Models

### User

- email (unique, required)
- passwordHash (nullable for Google-only users)
- googleId (unique, sparse, nullable)
- name (nullable)
- picture (nullable)

### Note

- userId (ObjectId ref User, required)
- title (required)
- content (required)

## Rate Limiting

Upstash sliding window limiter is enabled globally in backend middleware.

## Deployment (Render)

Set all backend environment variables in Render:

- MONGO_URI
- JWT_SECRET
- UPSTASH_REDIS_REST_URL
- UPSTASH_REDIS_REST_TOKEN
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- FRONTEND_URL
- NODE_ENV=production

If frontend is hosted separately, also set VITE_GOOGLE_CLIENT_ID in the frontend service.

Update Google OAuth configuration in Google Cloud Console:

- Authorized JavaScript origins: your local and production frontend URLs
- Authorized redirect URIs: add only if using callback flow

## Common Troubleshooting

- Google token missing: ensure frontend sends idToken and backend expects idToken
- OAuth origin errors: verify Google Cloud Console origins match deployed domain
- EADDRINUSE: free occupied local ports before running dev servers

