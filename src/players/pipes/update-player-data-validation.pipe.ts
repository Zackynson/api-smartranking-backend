import { BadRequestException, PipeTransform } from '@nestjs/common';

import * as Joi from 'joi';
import { UpdatePlayerDTO } from '../dtos/update-player-dto';

export class UpdatePlayerDataValidationPipe implements PipeTransform {
  transform(value: UpdatePlayerDTO) {
    /** readonly name: string;
        readonly phoneNumber: string;
        readonly avatarUrl: string;
        readonly ranking: string;
        readonly rankingPosition: number; 
      */
    const schema = Joi.object({
      name: Joi.string(),
      phoneNumber: Joi.string(),
      avatarUrl: Joi.string(),
      ranking: Joi.string(),
      rankingPosition: Joi.number(),
    }).required();

    const result = schema.validate(value, {
      allowUnknown: true,
      stripUnknown: true,
      convert: false,
    });

    if (result.error) {
      throw new BadRequestException(result.error.message);
    }

    return result.value;
  }
}
