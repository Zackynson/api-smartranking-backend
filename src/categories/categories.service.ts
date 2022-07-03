import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './dtos/create-category-dto';
import { UpdateCategoryDTO } from './dtos/update-category-dto';
import { Category } from './entities/category';

type UpdateParams = {
  id: string;
  data: UpdateCategoryDTO;
};
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async list(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id);

    if (!category?._id) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(data: CreateCategoryDTO): Promise<void> {
    new Logger(CategoriesService.name).log({ data });

    const cat: Category = new this.categoryModel({ ...data });
    await cat.save();
  }

  async delete(id: string): Promise<void> {
    const category = await this.categoryModel.findById(id);

    if (!category?._id) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryModel.deleteOne({ _id: id });
  }

  async update({ id, data }: UpdateParams): Promise<void> {
    const category = await this.categoryModel.findById(id);

    if (!category?._id) {
      throw new NotFoundException('Category not found');
    }

    new Logger(CategoriesService.name).log({ data });

    await category.update({ ...data });
  }
}
