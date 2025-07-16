import User from '../models/User.mjs';
import ClaimHistory from '../models/ClaimHistory.mjs';

// Add new user
export const addUser = async (req, res) => {
    try {
        const { name } = req.body;
        const user = new User({ name });
        await user.save();
        await updateRankings();
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Claim points for a user
export const claimPoints = async (req, res) => {
    try {
        const { userId } = req.body;
        const points = Math.floor(Math.random() * 10) + 1; // Random points 1-10
        
        // Update user's points
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        
        user.totalPoints += points;
        await user.save();
        
        // Save claim history
        const history = new ClaimHistory({ userId, points });
        await history.save();
        
        // Update rankings
        await updateRankings();
        
        res.json({ user, points, history });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all users with rankings
export const getLeaderboard = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const users = await User.find()
            .sort({ totalPoints: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        
        const total = await User.countDocuments();
        
        res.json({
            users,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get claim history
export const getClaimHistory = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const history = await ClaimHistory.find()
            .populate('userId', 'name')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
            
        const total = await ClaimHistory.countDocuments();
        
        res.json({
            history,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update rankings
const updateRankings = async () => {
    const users = await User.find().sort({ totalPoints: -1 });
    let currentRank = 1;
    
    for (let i = 0; i < users.length; i++) {
        users[i].rank = currentRank;
        await users[i].save();
        if (i < users.length - 1 && users[i].totalPoints > users[i + 1].totalPoints) {
            currentRank++;
        }
    }
};