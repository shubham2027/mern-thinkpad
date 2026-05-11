# MERN Thinkpad Frontend

React-based frontend for a full-stack note-taking application with integrated drawing capabilities.

## Features

- User authentication (JWT + Google OAuth)
- Create, read, update, delete notes
- Integrated drawing editor with Tldraw
- Search and filter notes
- Pin/unpin notes
- Responsive UI with Tailwind CSS + DaisyUI
- Real-time toast notifications

## Tech Stack

- React 19
- Vite (build tool)
- React Router (routing)
- Axios (HTTP client)
- Tailwind CSS + DaisyUI (styling)
- Tldraw (drawing editor)
- React Hot Toast (notifications)
- @react-oauth/google (Google Sign-In)

## Setup

```bash
npm install
```

### Environment Variables

Create `.env.local` in the frontend directory:

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

## Development

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/      # Reusable React components
│   ├── TldrawEditor.jsx
│   ├── NoteCard.jsx
│   ├── ProtectedRoute.jsx
│   └── ...
├── pages/          # Page components
│   ├── Create.jsx
│   ├── Home.jsx
│   ├── NoteDetail.jsx
│   └── ...
├── lib/            # Utilities and helpers
│   ├── axios.js
│   ├── auth.js
│   └── googleAuth.js
├── App.jsx
└── main.jsx
```

## Key Components

- **TldrawEditor**: Integrated drawing editor for visual note-taking
- **ProtectedRoute**: Route guard for authenticated pages
- **NoteCard**: Individual note display component
- **Navbar**: Navigation and user menu

## Authentication

- Email/password login
- Google Sign-In
- JWT token stored in localStorage
- Automatic token attachment to API requests via Axios interceptor
