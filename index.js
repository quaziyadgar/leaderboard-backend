import express from 'express';
import connectDB from './config/db.mjs';
import leaderboardRoutes from './routes/leaderboard.mjs';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));