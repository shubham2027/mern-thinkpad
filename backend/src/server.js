import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';


import notesRoutes from './routes/notesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if(process.env.NODE_ENV !== 'production'){
  app.use(cors({
    origin: 'http://localhost:5173',
  })); // enables CORS for all origins
}

app.use(express.json()); // this middleware parses JSON bodies: req.body
app.use(rateLimiter)

app.use("/api/notes", notesRoutes);
app.use("/api/auth", authRoutes);

if(process.env.NODE_ENV === 'production'){ // only for production build
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
  })

}


connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
});


