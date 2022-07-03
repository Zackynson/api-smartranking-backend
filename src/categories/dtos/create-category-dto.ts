import { CategoryEvent } from '../entities/category';

export class CreateCategoryDTO {
  name: string;
  description: string;
  events: Array<CategoryEvent>;
}
