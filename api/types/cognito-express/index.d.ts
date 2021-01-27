declare module 'cognito-express' {
  interface CognitoExpressConstructorOpts {
    region: string;
    cognitoUserPoolId: string;
    tokenUse: 'access' | 'id';
    tokenExpiration?: number;
  }

  type ValidateHandler = (error: Error | string | null, response: { [k: string]: any }) => void

  class CognitoExpress {
    constructor(options: CognitoExpressConstructorOpts): this;
    validate(accessTokenFromClient: string, handler: ValidateHandler);
  }

  export default CognitoExpress;
}
