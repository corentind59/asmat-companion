import { createContext, useContext } from 'react';

export const AuthContext = createContext<{
  isAuthenticated: boolean,
  reloadAuth: () => void
}>(null as unknown as any);

export function useAuth() {
  return useContext(AuthContext);
}
