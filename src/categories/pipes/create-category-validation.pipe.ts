import { BadRequestException, PipeTransform } from '@nestjs/common';

import * as Joi from 'joi';
import { CreateCategoryDTO } from '../dtos/create-category-dto';

export class CreateCategoryValidationPipe implements PipeTransform {
  transform(value: CreateCategoryDTO) {
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
