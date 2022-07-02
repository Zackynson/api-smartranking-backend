import { Injectable, Logger } from '@nestjs/common';
import { v4 } from 'uuid';

import { CreatePlayerDTO } from './dtos/create-player-dto';
import { Player } from './entities/Player';

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

  async find(): Promise<Player[]> {
    return this.players;
  }
}
