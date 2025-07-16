import mongoose from 'mongoose';

const claimHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    points: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.model('ClaimHistory', claimHistorySchema);