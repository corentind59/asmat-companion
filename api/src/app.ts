import express from 'express';
import expressive from '@corentind/expressive';

const app = express();

app.use(express.json());

app.use(expressive());

module.exports = app;
