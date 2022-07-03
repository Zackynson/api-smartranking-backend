import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dtos/create-category-dto';
import { UpdateCategoryDTO } from './dtos/update-category-dto';
import { Category } from './entities/category';
import { CategoryIdParamValidationPipe } from './pipes/category-id-param-validation.pipe';
import { CreateCategoryValidationPipe } from './pipes/create-category-validation.pipe';
import { UpdateCategoryValidationPipe } from './pipes/update-category-validation.pipe';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body(CreateCategoryValidationPipe) createCategoryDTO: CreateCategoryDTO,
  ): Promise<void> {
    await this.categoriesService.create(createCategoryDTO);
  }

  @Get()
  async list(): Promise<Category[]> {
    const categories = await this.categoriesService.list();

    return categories;
  }

  @Get(':id')
  async findById(
    @Param('id', CategoryIdParamValidationPipe) id: string,
  ): Promise<Category> {
    const category = await this.categoriesService.findById(id);
    return category;
  }

  @Delete(':id')
  async delete(
    @Param('id', CategoryIdParamValidationPipe) id: string,
  ): Promise<void> {
    await this.categoriesService.delete(id);
  }

  @Put(':id')
  async update(
    @Param('id', CategoryIdParamValidationPipe) id: string,
    @Body(UpdateCategoryValidationPipe) updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<void> {
    await this.categoriesService.update({ id, data: updateCategoryDTO });
  }
}
