import { BadRequestException, PipeTransform } from '@nestjs/common';

import * as Joi from 'joi';
import * as mognoose from 'mongoose';

export class PlayerIdParamValidationPipe implements PipeTransform {
  transform(value: string) {
    const schema = Joi.string().trim().required();

    const result = schema.validate(value, {
      allowUnknown: true,
      stripUnknown: true,
      convert: false,
    });

    if (result.error || !mognoose.isObjectIdOrHexString(value)) {
      throw new BadRequestException('Invalid Player ID');
    }

    return result.value;
  }
}
