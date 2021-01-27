import { useEffect, useState } from 'react';
import { Auth } from '@aws-amplify/auth';
import { AuthContextValue } from '../context';

type UseAuthorizationFlowResult = AuthContextValue & {
  isAuthenticating: boolean
};

export default function useAuthenticationFlow(): UseAuthorizationFlowResult {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  const refreshAuthSession = () => setAuthenticating(true);
  const authenticate = async () => {
    setAuthenticated(false);
    try {
      await Auth.currentSession();
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
      signOut: () => Auth.signOut()
    }
  }

  return result;
}
