import { Document } from 'mongoose';

export interface CategoryEvent {
  name: string;
  operation: string;
  value: number;
}

export interface Category extends Document {
  name: string;
  description: string;
  events: Array<CategoryEvent>;
  players: Array<string>;
}
