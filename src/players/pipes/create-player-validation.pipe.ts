import { BadRequestException, PipeTransform } from '@nestjs/common';

import * as Joi from 'joi';
import { CreatePlayerDTO } from '../dtos/create-player-dto';

export class CreatePlayerValidationPipe implements PipeTransform {
  transform(value: CreatePlayerDTO) {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().email().trim().required(),
      phoneNumber: Joi.string().trim().required(),
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
