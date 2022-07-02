import { BadRequestException, PipeTransform } from '@nestjs/common';

import * as Joi from 'joi';

export class PlayerIdParamValidationPipe implements PipeTransform {
  transform(value: string) {
    /** readonly name: string;
        readonly phoneNumber: string;
        readonly avatarUrl: string;
        readonly ranking: string;
        readonly rankingPosition: number; 
      */
    const schema = Joi.string().uuid().required();

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
