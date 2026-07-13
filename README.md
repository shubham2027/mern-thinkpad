# MERN Thinkpad (MindScribe)

Full-stack note-taking app built with MongoDB, Express, React, and Node.js.

## Features

- Notes CRUD with per-user ownership
- Search notes by words in title/content
- Text notes and drawing notes powered by Excalidraw
- Pin/unpin notes and keep pinned notes on top
- Notes filter (All, Pinned, Unpinned)
- Dark Luxury UI with glassmorphism and ambient background gradients
- Fully responsive layout for mobile and desktop screens
- Toggle between Text notes and Drawing notes
- Integrated Excalidraw drawing editor for visual note-taking
- Save and load drawing snapshots with notes
- JWT auth (email/password)
- Google Sign-In auth
- Protected frontend routes
- Axios auth interceptor with auto Bearer token
- Account Settings page with profile details
- Feedback form in Account Settings (currently simulated)
- Upstash Redis rate limiting
- Tailwind + DaisyUI UI

## Tech Stack

### Frontend

- React 19
- Vite
- React Router
- Axios
- React Hot Toast
- Tailwind CSS 4 + DaisyUI 5
- GSAP (animations)
- Three.js / React Three Fiber / OGL (3D graphics)
- @react-oauth/google
- Excalidraw (drawing editor)
- Web3Forms (HTTP API integration)

### Backend

- Node.js + Express
- MongoDB + Mongoose
- jsonwebtoken
- bcryptjs
- google-auth-library
- Upstash Redis rate limiting

## Project Structure

```
mern-thinkpad/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExcalidrawEditor.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ...other components
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json
```

## Environment Variables

### Backend (`.env`)

```
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

### Frontend (`.env.local`)

```
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

- Backend: `http://localhost:5001`
- Frontend: `http://localhost:5173`

> Note: Vite may move to `5174`/`5175` if `5173` is already in use.

## Root Scripts

From repository root:

```bash
npm run build
npm run start
```

- `build`: installs backend + frontend dependencies and builds frontend
- `start`: starts backend service

## API Endpoints

### Auth

```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/google
GET  /api/auth/me
```

### Notes (protected)

```
GET    /api/notes
POST   /api/notes
GET    /api/notes/:id
PATCH  /api/notes/:id/pin
PUT    /api/notes/:id
DELETE /api/notes/:id
```

`GET /api/notes` query params:

- `q` (string): search in title and content
- `pinned` (`all` | `true` | `false`): filter by pin status

### Feedback (protected)

```
POST /api/feedback
```

> Note: The Account Settings page feedback form is currently simulated in the frontend to avoid strict antivirus false-positive blocking. The backend feedback endpoint is available for future integration.

Protected routes require:

```
Authorization: Bearer <jwt_token>
```

## Authentication Behavior

- Email/password auth issues a JWT token valid for 7 days
- Google Sign-In verifies the Google ID token on the backend and returns an app JWT
- Token is stored in `localStorage` under `mindscribe_token`
- Axios adds the `Authorization` header automatically
- On a 401 response, the frontend logs out and redirects to `/login` (except on auth pages)

## Frontend Routes

| Route | Description |
|---|---|
| `/` | Home (protected) |
| `/create` | Create note with optional drawing (protected) |
| `/note/:id` | Note detail/edit with drawing support (protected) |
| `/settings` | Account Settings + feedback (protected) |
| `/login` | Login |
| `/signup` | Sign up |

## Excalidraw Drawing Feature

The application integrates [Excalidraw](https://excalidraw.com/), a web-based drawing tool, for visual note-taking:

- **Create notes with drawings** — use the drawing editor on the Create page to draw and annotate notes
- **Edit drawings** — load and modify existing drawings when editing notes
- **Drawing snapshots** — all drawings are stored as JSON snapshots attached to note content
- **Persistent storage** — drawing data is saved with the note in MongoDB

Usage:

1. Navigate to `/create` to start a new note with a drawing
2. Use the Excalidraw toolbar for drawing shapes, text, and other elements
3. Click "Save" to save your drawing
4. Edit existing notes to view and modify drawings

## Database Models

### User

- `email` (unique, required)
- `passwordHash` (nullable for Google-only users)
- `googleId` (unique, sparse, nullable)
- `name` (nullable)
- `picture` (nullable)

### Note

- `userId` (ObjectId ref `User`, required)
- `title` (required)
- `noteType` (enum: `'text'`, `'drawing'`, default `'text'`)
- `content` (string, optional — used for text notes)
- `drawingData` (object, optional — used for drawing notes)
- `pinned` (boolean, default `false`)

### Feedback

- `userId` (ObjectId ref `User`, required)
- `email` (required)
- `subject` (required)
- `message` (required)

## Rate Limiting

An Upstash sliding-window limiter is enabled globally in backend middleware.

## Deployment (Render)

Set all backend environment variables in Render:

```
MONGO_URI
JWT_SECRET
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
FRONTEND_URL
NODE_ENV=production
```

If the frontend is hosted separately, also set `VITE_GOOGLE_CLIENT_ID` in the frontend service.

Frontend env vars to set in deployment:

```
VITE_GOOGLE_CLIENT_ID
VITE_WEB3FORMS_ACCESS_KEY
```

Update Google OAuth configuration in Google Cloud Console:

- **Authorized JavaScript origins**: your local and production frontend URLs
- **Authorized redirect URIs**: add only if using a callback flow

## Common Troubleshooting

- **Google token missing** — ensure the frontend sends `idToken` and the backend expects `idToken`
- **OAuth origin errors** — verify Google Cloud Console origins match the deployed domain
- **EADDRINUSE** — free the occupied local port before running dev servers