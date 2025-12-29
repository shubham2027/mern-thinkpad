# MERN Thinkpad

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- 📝 Create, read, and manage notes
- ⚡ Fast and responsive UI with Vite
- 🎨 Beautiful UI with Tailwind CSS and DaisyUI
- 🔐 Rate limiting to prevent abuse
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

- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

## Rate Limiting

The API is protected with rate limiting (100 requests per 60 seconds) using Upstash Redis to prevent abuse.

