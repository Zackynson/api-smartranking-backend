import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CreateCategoryDTO } from './dtos/create-category-dto';
import { UpdateCategoryDTO } from './dtos/update-category-dto';
import { Category } from './entities/category';

type UpdateParams = {
  id: string;
  data: UpdateCategoryDTO;
};

type AddPlayerParams = {
  categoryId: string;
  playerId: string;
};
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async list(): Promise<Category[]> {
    return this.categoryModel.find();
  }

  async findById(id: string): Promise<Category> {
    const populatedFields = {
      _id: 1,
      email: 1,
      name: 1,
      phoneNumber: 1,
    };

    const category = await this.categoryModel
      .findById(id)
      .populate('players', populatedFields);

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

  async addPlayer({ categoryId, playerId }: AddPlayerParams): Promise<void> {
    const category = await this.categoryModel.findById(categoryId);
    if (!category?._id) {
      throw new NotFoundException('Category not found');
    }

    const player = await this.playersService.findById(playerId);

    new Logger(CategoriesService.name).log({ category, player });

    if (category.players.includes(playerId)) {
      throw new ForbiddenException('Player is already in this category');
    }

    await category.update({
      $set: { players: [...category.players, playerId] },
    });
  }
}
