import { AxiosResponse } from 'axios';
import { createContext, FC, useEffect, useState } from 'react';

import {
  THandleError,
  TLoginData,
  TLoginResponse,
  TSession,
} from '../react-app-env';

import api from '../connections/api';

interface AuthProviderData {
  session: TSession;
  signIn(user: TLoginData, callbackFn: THandleError): void; //AxiosResponse<TLoginResponse>
  signOut(): void;
  updateSession(): void;
}

const AuthContext = createContext<AuthProviderData>({} as AuthProviderData);

export const AuthProvider: FC = ({ children }) => {
  const [session, setSession] = useState<TSession>(
    JSON.parse(localStorage.getItem('session') || '{ "authenticated": false }')
  );

  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session));
  }, [session]);

  async function signIn(user: TLoginData, callbackFn: THandleError) {
    try {
      const response: AxiosResponse<TLoginResponse> = await api.post(
        'profile/login',
        user
      );
      setSession({ ...response.data, authenticated: true });
    } catch (error: any) {
      callbackFn(error);
    }
  }

  function signOut() {
    setSession({ authenticated: false } as TSession);
  }

  async function updateSession() {
    const response: AxiosResponse<TLoginResponse> = await api.get(
      `profile/session/${session.user.id}`
    );

    setSession(({ authenticated }) => ({ ...response.data, authenticated }));
  }

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, updateSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
