import { Auth } from '@aws-amplify/auth';
import { useState } from 'react';
import { useAuthSession } from '../context';

export type LoginResult =  true | 'NEW_PASSWORD_REQUIRED';

export default function useLoginFlow() {
  const [user, setUser] = useState<any>(null);
  const { refreshAuthSession } = useAuthSession();

  const login = async (username: string, password: string): Promise<LoginResult> => {
    try {
      const authUser = await Auth.signIn(username, password);
      if (authUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setUser(authUser);
        return 'NEW_PASSWORD_REQUIRED';
      }
      refreshAuthSession();
      return true;
    } catch (e: any) {
      if (e.code === 'NotAuthorizedException') {
        throw new Error('Nom d\'utilisateur ou mot de passe incorrect.');
      }
      throw e;
    }
  };

  const setNewPassword = async (newPassword: string): Promise<true> => {
    if (!user) {
      throw new Error('Cannot change new password for not logged in user.');
    }
    await Auth.completeNewPassword(user, newPassword);
    refreshAuthSession();
    return true;
  }

  return {
    login,
    setNewPassword
  };
}
