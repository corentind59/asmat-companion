import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import { getConfig } from './config';

export default function mongoDB(): RequestHandler {
  let connected = false;
  return (req, res, next) => {
    if (!connected) {
      return getConfig()
        .then(({ databaseURL }) => connectToDatabase(databaseURL))
        .then(() => {
          connected = true;
          next();
        })
        .catch(e => next(e));
    } else {
      return next();
    }
  };
}

function connectToDatabase(databaseURL: string) {
  return mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}
