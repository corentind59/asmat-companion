import express from 'express';
import expressive, { handle, Ok } from '@corentind/expressive';
import cognitoProtected from './auth/cognito-middleware';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/public', handle(() => new Ok({ message: 'success' })));
app.get('/private', cognitoProtected(), handle(() => new Ok({ message: 'success' })));

app.use(expressive());

module.exports = app;
