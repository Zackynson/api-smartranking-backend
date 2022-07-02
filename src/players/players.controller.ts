import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player-dto';
import { Player } from './entities/Player';
import { PlayersService } from './players.service';
import { CreatePlayerValidationPipe } from './pipes/create-player-validation.pipe';
import { UpdatePlayerDTO } from './dtos/update-player-dto';
import { UpdatePlayerDataValidationPipe } from './pipes/update-player-data-validation.pipe';
import { PlayerIdParamValidationPipe } from './pipes/player-id-param-validation.pipe';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(
    @Body(CreatePlayerValidationPipe) createPlayerDTO: CreatePlayerDTO,
  ): Promise<void> {
    await this.playersService.create(createPlayerDTO);
  }

  @Put(':id')
  async updatePlayer(
    @Param('id', PlayerIdParamValidationPipe) id: string,
    @Body(UpdatePlayerDataValidationPipe) updatePlayerDTO: UpdatePlayerDTO,
  ): Promise<void> {
    console.log(id);
    await this.playersService.update({ id, data: updatePlayerDTO });
  }

  @Get()
  async find(): Promise<Player[]> {
    const players = await this.playersService.find();

    return players;
  }

  @Get(':id')
  async findById(
    @Param('id', PlayerIdParamValidationPipe) id: string,
  ): Promise<Player> {
    const player = await this.playersService.findById(id);

    return player;
  }
}
