import dotenv from 'dotenv';
import path from 'path';
import { app } from './app.js';
import { connectDB } from './db/db.js';
dotenv.config({}); // Load environment variables

const PORT = process.env.PORT || 3000;

// Connect to the database
connectDB()
  .then(() => {
    // After connecting to the database, start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to the database: ', error);
  });
