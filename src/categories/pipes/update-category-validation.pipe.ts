import { BadRequestException, PipeTransform } from '@nestjs/common';
import * as Joi from 'joi';
import mongoose from 'mongoose';

import { UpdateCategoryDTO } from '../dtos/update-category-dto';

export class UpdateCategoryValidationPipe implements PipeTransform {
  transform(value: UpdateCategoryDTO) {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      events: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          operation: Joi.string().trim().required(),
          value: Joi.number().required(),
        }),
      ),
      players: Joi.array().items(Joi.string()),
    }).required();

    const result = schema.validate(value, {
      allowUnknown: true,
      stripUnknown: true,
      convert: false,
    });

    if (result.error) {
      throw new BadRequestException(result.error.message);
    }

    if (
      value?.players?.some(
        (playerId) => !mongoose.isObjectIdOrHexString(playerId),
      )
    ) {
      throw new BadRequestException(
        'players array must contain valid playerIds only',
      );
    }

    return result.value;
  }
}
