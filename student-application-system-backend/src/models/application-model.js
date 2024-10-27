import mongoose from 'mongoose';
import { User } from './user-model.js';

// Remarks field is used when admin accepts or rejects the application
const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, // Use ObjectId here
      ref: 'User', // Referencing the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'accepted', 'rejected', 'draft'], // Enum values
      default: 'draft', // Use lowercase matching enum value
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }, // Enables createdAt and updatedAt timestamps
);

// Register the model
export const Application = mongoose.model('Application', applicationSchema);
