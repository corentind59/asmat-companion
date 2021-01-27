import { createContext, useContext } from 'react';

type CommonAuthContextValue = {
  refreshAuthSession: () => void
}
type AuthenticatedAuthContextValue = CommonAuthContextValue & {
  isAuthenticated: true,
  signOut: () => Promise<void>
}
type UnauthenticatedAuthContextValue = CommonAuthContextValue & {
  isAuthenticated: false
}

export type AuthContextValue = AuthenticatedAuthContextValue | UnauthenticatedAuthContextValue;

export const AuthContext = createContext<AuthContextValue>(null as unknown as any);

export function useAuthSession() {
  return useContext(AuthContext);
}
