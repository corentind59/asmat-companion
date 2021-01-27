import CognitoExpress from 'cognito-express';
import express from 'express';
import { Unauthorized } from '@corentind/expressive';

const cognito = new CognitoExpress({
  region: 'eu-west-1',
  cognitoUserPoolId: process.env.EXPRESS_COGNITO_USER_POOL_ID!,
  tokenUse: 'access'
});

export default function cognitoProtected(): express.RequestHandler {
  return (req, res, next) => {
    const authorization = req.header('Authorization') ?? '';
    const token = authorization.replace('Bearer ', '');
    if (!token) {
      return next(new Unauthorized({
        code: 'unauthorized',
        message: 'Provide an Amazon Cognito access token to access this resource.'
      }));
    }
    cognito.validate(token, (error) => {
      if (error) {
        const errorMessage = (error instanceof Error && error.message) || error.toString();
        return next(new Unauthorized({
          code: 'unauthorized',
          message: errorMessage
        }));
      }
      return next();
    });
  };
}
