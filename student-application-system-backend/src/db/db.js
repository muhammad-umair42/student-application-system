import mongoose from 'mongoose';

// Connect to MongoDB
export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}`,
    );

    console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
