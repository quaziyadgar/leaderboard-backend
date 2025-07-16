import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect("mongodb+srv://quaziyadgar:QBw9oEtc1tsM1RXq@cluster0.dlaktet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;