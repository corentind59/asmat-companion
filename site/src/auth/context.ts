import { createContext, useContext } from 'react';
import { UserInfo } from './models/user-info';

type CommonAuthContextValue = {
  refreshAuthSession: () => void
}

type AuthenticationInfo = {
  userInfo: UserInfo
}
type AuthenticatedAuthContextValue = CommonAuthContextValue & {
  isAuthenticated: true,
  authenticationInfo: AuthenticationInfo
}

type UnauthenticatedAuthContextValue = CommonAuthContextValue & {
  isAuthenticated: false
}

export type AuthContextValue = AuthenticatedAuthContextValue | UnauthenticatedAuthContextValue;

export const AuthContext = createContext<AuthContextValue>(null as unknown as any);

export function useAuthContext() {
  return useContext(AuthContext);
}
