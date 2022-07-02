import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreatePlayerDTO } from './dtos/create-player-dto';
import { UpdatePlayerDTO } from './dtos/update-player-dto';
import { Player } from './entities/Player';

type UpdateParams = {
  id: string;
  data: UpdatePlayerDTO;
};

@Injectable()
export class PlayersService {
  private players: Player[] = [];

  constructor(
    @InjectModel('player') private readonly playerModel: Model<Player>,
  ) {}

  async create(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const foundPlayer = await this.playerModel.findOne({
      email: createPlayerDTO.email,
    });

    if (foundPlayer?._id) {
      throw new ForbiddenException('Player already registered');
    }

    const player: Player = await new this.playerModel(createPlayerDTO).save();

    new Logger(PlayersService.name).log({ player });
  }

  async update({ id, data }: UpdateParams): Promise<void> {
    const foundPlayer = await this.playerModel.findById(id);

    if (!foundPlayer?._id) {
      throw new NotFoundException('Player not found');
    }

    new Logger(PlayersService.name).log({
      originalPlayer: foundPlayer,
    });

    const updatedPlayer = await this.playerModel.findOneAndUpdate(
      { _id: id },
      {
        ...data,
      },
    );

    new Logger(PlayersService.name).log({
      updatedPlayer,
    });
  }

  async find(): Promise<Player[]> {
    return this.playerModel.find();
  }

  async findById(id: string): Promise<Player> {
    const foundPlayer = await this.playerModel.findById(id);

    if (!foundPlayer) {
      throw new NotFoundException('Player not found');
    }

    return foundPlayer;
  }

  async deleteById(id: string): Promise<void> {
    const foundPlayer = await this.playerModel.findById(id);

    if (!foundPlayer) {
      throw new NotFoundException('Player not found');
    }

    await this.playerModel.deleteOne({ _id: id });
  }
}
