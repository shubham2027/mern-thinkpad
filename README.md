# MindScribe (MERN Thinkpad)

MindScribe is a full-stack note-taking and visual diagramming application built with MongoDB, Express, React, and Node.js. It combines Markdown note management with interactive Excalidraw whiteboards into a single, unified workspace.

---

## Features

- **Dual Auth**: Email/password authentication and Google OAuth sign-in.
- **Rich Notes Workspace**: Create, view, edit, search, and delete notes.
- **Excalidraw Integration**: Draw, sketch, and attach visual whiteboards directly to notes.
- **Search & Filtering**: Instant search across titles and content, plus pin/unpin filtering.
- **Account Settings & Profile**: View user profile and submit feedback.
- **Protected Routes**: Secure JWT token persistence and route protection.
- **Dark Theme UI**: Fully responsive, dark-mode glassmorphic user interface.

---

## Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Routing**: React Router
- **Styling**: Tailwind CSS + DaisyUI
- **Icons**: Lucide React
- **Drawing Editor**: Excalidraw (`@excalidraw/excalidraw`)
- **State & HTTP**: Axios + React Hot Toast
- **Auth**: `@react-oauth/google`

### Backend
- **Runtime**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (`jsonwebtoken`) + `bcryptjs` + Google Auth Library
- **Rate Limiting**: Upstash Redis rate limiter

---

## Project Structure

```
mern-thinkpad/
├── backend/
│   ├── src/
│   │   ├── config/          # DB & Redis connection logic
│   │   ├── controllers/     # Controller business logic
│   │   ├── middleware/      # Auth & Rate limiting middleware
│   │   ├── models/          # User, Note, Feedback Mongoose schemas
│   │   ├── routes/          # Express route definitions
│   │   └── server.js        # Server entry point
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (Navbar, NoteCard, ExcalidrawEditor, etc.)
│   │   ├── lib/             # Axios instance & Auth helper utilities
│   │   ├── pages/           # Application views (Home, Login, Signup, Create, NoteDetail, AccountSettings)
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── package.json
```

---

## Environment Variables

### Backend (`backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
JWT_SECRET=your_jwt_secret

UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

FRONTEND_URL=http://localhost:5173
```

### Frontend (`frontend/.env.local`)

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

---

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm
- MongoDB URI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mern-thinkpad.git
   cd mern-thinkpad
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   npm install --prefix backend
   npm install --prefix frontend
   ```

3. Set up environment variables as shown in the section above.

### Running Locally

Run backend server:
```bash
cd backend
npm run dev
```

Run frontend development server:
```bash
cd frontend
npm run dev
```

Default URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5001`

---

## API Endpoints

### Auth
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Sign in with email and password
- `POST /api/auth/google` - Sign in with Google OAuth ID token
- `GET  /api/auth/me` - Fetch authenticated user profile

### Notes (Protected)
- `GET    /api/notes` - Get notes (Query params: `q`, `pinned`)
- `POST   /api/notes` - Create a new text or drawing note
- `GET    /api/notes/:id` - Fetch single note by ID
- `PUT    /api/notes/:id` - Update note content or drawing snapshot
- `PATCH  /api/notes/:id/pin` - Toggle note pinned status
- `DELETE /api/notes/:id` - Delete note by ID

### Feedback (Protected)
- `POST   /api/feedback` - Submit user feedback