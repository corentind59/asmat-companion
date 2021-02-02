import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { BadRequest } from '@corentind/expressive';

export const EMAIL_VALIDATOR = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/;
export const TEL_VALIDATOR = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

export const handleMongooseError: () => ErrorRequestHandler = () => (err, req, res, next) => {
  if (err instanceof mongoose.Error && ['ValidationError', 'CastError'].includes(err.name)) {
    return next(new BadRequest({
      code: 'validation-error',
      message: err.message
    }));
  }
  next(err);
};
