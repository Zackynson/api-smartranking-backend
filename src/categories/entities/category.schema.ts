import { Schema } from 'mongoose';

export const CategorySchema = new Schema(
  {
    name: String,
    description: String,
    events: [
      {
        name: String,
        operation: String,
        value: Number,
      },
    ],
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
