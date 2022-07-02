import { Schema } from 'mongoose';

export const PlayerSchema = new Schema(
  {
    email: { type: String, unique: true },
    name: { type: String },
    phoneNumber: { type: String },
    avatarUrl: { type: String },
    ranking: { type: String },
    rankingPosition: { type: Number },
  },
  { timestamps: true, collection: 'players' },
);
