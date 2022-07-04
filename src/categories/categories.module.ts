import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategorySchema } from './entities/category.schema';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

import { PlayersModule } from 'src/players/players.module';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    PlayersModule,
  ],
})
export class CategoriesModule {}
