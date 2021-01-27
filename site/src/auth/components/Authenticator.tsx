import { PropsWithChildren } from 'react';
import { AuthContext, AuthContextValue } from '../context';
import useAuthenticationFlow from '../hooks/useAuthenticationFlow';

export default function Authenticator({ children }: PropsWithChildren<{}>) {
  const authentication = useAuthenticationFlow();
  const { refreshAuthSession, isAuthenticating } = authentication;

  if (isAuthenticating) {
    return null;
  }

  const contextValue: AuthContextValue = authentication.isAuthenticated ? {
    isAuthenticated: true,
    refreshAuthSession,
    signOut: authentication.signOut
  } : {
    isAuthenticated: false,
    refreshAuthSession
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
