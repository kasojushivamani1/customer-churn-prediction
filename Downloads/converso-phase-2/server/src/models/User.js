import { Schema, model } from 'mongoose';

/**
 * One document per person. `roles` is an array (not a single value) because the
 * same person may later be both a seeker and a Practice Partner. Onboarding adds
 * the first role; a profile setting can add the second one in a later phase.
 */
const userSchema = new Schema(
  {
    firebaseUid: { type: String, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    name: { type: String, trim: true, default: '' },
    photoUrl: { type: String, default: '' },
    phone: { type: String, trim: true, default: '' },
    roles: {
      type: [{ type: String, enum: ['seeker', 'partner', 'admin'] }],
      default: [],
    },
    timezone: { type: String, default: 'Asia/Kolkata' },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 });

export const User = model('User', userSchema);
