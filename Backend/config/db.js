const mongoose = require('mongoose');

const connectDB = async () => {
    // Check if the environment variable is set
    if (!process.env.MONGO_URI) {
        console.error('FATAL ERROR: MONGO_URI is not defined in environment variables.');
        process.exit(1);
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Note: useNewUrlParser and useUnifiedTopology are often
            // unnecessary in recent Mongoose versions, but keeping for compatibility.
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.log(1); // Use process.exit(1) if you want to exit on failure
    }
};

module.exports = connectDB;