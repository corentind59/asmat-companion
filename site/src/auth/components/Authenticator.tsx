import { PropsWithChildren, useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { AuthContext } from '../context';

export default function Authenticator({ children }: PropsWithChildren<{}>) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isAuthenticating, setAuthenticating] = useState(true);
  useEffect(() => {
    if (isAuthenticating) {
      authenticate();
    }
  }, [isAuthenticating]);

  async function authenticate() {
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
  }
  const reloadAuth = () => setAuthenticating(true);

  if (isAuthenticating) {
    return null;
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, reloadAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
