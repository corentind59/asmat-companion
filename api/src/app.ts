import express from 'express';
import expressive from '@corentind/expressive';
import cors from 'cors';
import mongoDB from './database';
import { AsmatRoutes } from './asmat/router';
import { handleMongooseError } from './utils/validation';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(mongoDB());

// Routes
app.use(AsmatRoutes);

// Expressive
app.use(handleMongooseError());
app.use(expressive());

module.exports = app;
