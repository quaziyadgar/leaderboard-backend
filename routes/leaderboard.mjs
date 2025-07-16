import express from 'express';
import * as leaderboardController from '../controllers/leaderboardController.mjs';

const router = express.Router();

router.post('/users', leaderboardController.addUser);
router.post('/claim', leaderboardController.claimPoints);
router.get('/leaderboard', leaderboardController.getLeaderboard);
router.get('/history', leaderboardController.getClaimHistory);

export default router;