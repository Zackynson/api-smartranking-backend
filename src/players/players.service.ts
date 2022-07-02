import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { v4 } from 'uuid';

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

  async create(createPlayerDTO: CreatePlayerDTO): Promise<void> {
    const player: Player = {
      ...createPlayerDTO,
      avatarUrl: '',
      id: v4(),
      ranking: 'A',
      rankingPosition: 1,
    };

    new Logger(PlayersService.name).log({ player });

    this.players.push(player);
  }

  async update({ id, data }: UpdateParams): Promise<void> {
    const foundPlayerIndex = this.players.findIndex((p) => p.id === id);

    if (foundPlayerIndex < 0) {
      throw new NotFoundException('Player not found');
    }

    new Logger(PlayersService.name).log({
      originalPlayer: this.players[foundPlayerIndex],
    });

    this.players[foundPlayerIndex] = {
      ...this.players[foundPlayerIndex],
      ...data,
    };

    new Logger(PlayersService.name).log({
      updatedPlayer: this.players[foundPlayerIndex],
    });
  }

  async find(): Promise<Player[]> {
    return this.players;
  }

  async findById(id: string): Promise<Player> {
    const foundPlayer = this.players.find((p) => p.id === id);

    if (!foundPlayer) {
      throw new NotFoundException('Player not found');
    }

    return foundPlayer;
  }

  async deleteById(id: string): Promise<void> {
    const foundPlayerIndex = this.players.findIndex((p) => p.id === id);

    if (foundPlayerIndex < 0) {
      throw new NotFoundException('Player not found');
    }

    this.players.splice(foundPlayerIndex, 1);
  }
}
