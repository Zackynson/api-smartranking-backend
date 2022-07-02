import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player-dto';
import { Player } from './entities/Player';
import { PlayersService } from './players.service';
import { CreatePlayerValidationPipe } from './pipes/create-player-validation.pipe';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(
    @Body(CreatePlayerValidationPipe) createPlayerDTO: CreatePlayerDTO,
  ): Promise<void> {
    await this.playersService.create(createPlayerDTO);
  }

  @Get()
  async find(): Promise<Player[]> {
    const players = await this.playersService.find();

    return players;
  }
}
