import { useEffect, useState } from 'react';
import { Auth } from '@aws-amplify/auth';
import { AuthContextValue } from '../context';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { UserInfo } from '../models/user-info';

type UseAuthorizationFlowResult = AuthContextValue & {
  isAuthenticating: boolean
};

export default function useAuthenticationFlow(): UseAuthorizationFlowResult {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const [session, setSession] = useState<CognitoUserSession | null>(null);
  const refreshAuthSession = () => setAuthenticating(true);

  const authenticate = async () => {
    setAuthenticated(false);
    setSession(null);
    try {
      const currentSession = await Auth.currentSession();
      setSession(currentSession);
      setAuthenticated(true);
    } catch (e: unknown) {
      if (e !== 'No current user') {
        throw e;
      }
    }
    setAuthenticating(false);
  };

  useEffect(() => {
    if (isAuthenticating) {
      authenticate();
    }
  }, [isAuthenticating]);

  let result: UseAuthorizationFlowResult = {
    isAuthenticated: false,
    isAuthenticating,
    refreshAuthSession
  };
  if (isAuthenticated) {
    result = {
      ...result,
      isAuthenticated: true,
      authenticationInfo: {
        userInfo: session!.getIdToken().payload as UserInfo
      }
    }
  }

  return result;
}
