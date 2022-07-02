import { Document } from 'mongoose';

export interface Player extends Document {
  name: string;
  phoneNumber: string;
  avatarUrl: string;
  email: string;
  ranking: string;
  rankingPosition: number;
}
