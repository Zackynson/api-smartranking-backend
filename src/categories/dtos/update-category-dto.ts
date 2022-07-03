import { CategoryEvent } from '../entities/category';

export class UpdateCategoryDTO {
  name: string;
  description: string;
  events: Array<CategoryEvent>;
  players: Array<string>;
}
