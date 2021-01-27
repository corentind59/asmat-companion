import Amplify from '@aws-amplify/core';

export default function configure() {
  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: 'eu-west-1',
      userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID
    }
  });
}
