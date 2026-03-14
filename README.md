# MERN Thinkpad

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 📝 Create, read, and manage notes
- 🔐 JWT authentication (signup, login, protected routes)
- 👤 User-scoped notes (each user can only access their own notes)
- ⚡ Fast and responsive UI with Vite
- 🎨 Beautiful UI with Tailwind CSS and DaisyUI
- 🚦 API rate limiting to prevent abuse
- 📱 Responsive design
- 🔄 Real-time API integration with Axios

## Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool
- **React Router** 7.11.0 - Client-side routing
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **DaisyUI** 5.5.14 - Tailwind CSS component library
- **Axios** 1.13.2 - HTTP client
- **React Hot Toast** 2.6.0 - Notifications
- **Lucide React** 0.562.0 - Icon library

### Backend
- **Node.js** with **Express** 4.18.2 - Server framework
- **MongoDB** - Database
- **Mongoose** 8.14.3 - ODM for MongoDB
- **JWT (jsonwebtoken)** - Access token authentication
- **bcryptjs** - Password hashing
- **Upstash Redis** - Rate limiting service
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-thinkpad
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file with:
   ```env
   MONGO_URI=your_mongodb_uri
   PORT=5001
   JWT_SECRET=your_super_secret_jwt_key
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
App runs on `http://localhost:5173`

### Production Build

**Frontend:**
```bash
npm run build
npm run preview
```

## Project Structure

```
mern-thinkpad/
├── backend/
│   ├── src/
│   │   ├── server.js           # Express server
│   │   ├── config/
│   │   │   ├── db.js           # MongoDB connection
│   │   │   └── upstash.js      # Rate limiter config
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   └── middleware/         # Custom middleware
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/         # React components
    │   ├── pages/              # Page components
    │   ├── lib/                # Utilities (axios)
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

## API Endpoints

### Auth

- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user profile (protected)

### Notes (Protected)

- `GET /api/notes` - Get all notes for the authenticated user
- `POST /api/notes` - Create a new note for the authenticated user
- `GET /api/notes/:id` - Get one of the authenticated user's notes
- `PUT /api/notes/:id` - Update one of the authenticated user's notes
- `DELETE /api/notes/:id` - Delete one of the authenticated user's notes

All notes endpoints require a Bearer token in the Authorization header:

```http
Authorization: Bearer <jwt_token>
```

## Authentication Flow

1. User signs up or logs in from the frontend (`/signup` or `/login`).
2. Backend validates credentials and returns a JWT token.
3. Frontend stores the token in localStorage.
4. Axios request interceptor automatically attaches `Authorization: Bearer <token>`.
5. Protected frontend routes redirect unauthenticated users to `/login`.
6. If API returns `401`, frontend removes token and redirects to `/login`.

## Rate Limiting

The API is protected with Upstash Redis rate limiting middleware to prevent abuse and excessive request bursts.

