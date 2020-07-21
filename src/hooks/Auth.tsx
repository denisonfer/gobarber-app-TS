import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  usuario: object;
}
interface SigInCredentials {
  email: string;
  senha: string;
}

interface AuthContextDTO {
  usuario: object;
  loading: boolean;
  sigIn(credentials: SigInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextDTO>({} as AuthContextDTO);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, usuario] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:usuario',
      ]);

      if (token[1] && usuario[1]) {
        setData({ token: token[1], usuario: JSON.parse(usuario[1]) });
      }
      setLoading(false);
    }

    loadStorageData();
  }, []);

  const sigIn = useCallback(async ({ email, senha }) => {
    const response = await api.post('/sessoes', {
      email,
      senha,
    });

    const { usuario, token } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:usuario', JSON.stringify(usuario)],
    ]);

    setData({ token, usuario });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:usuario']);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ usuario: data.usuario, loading, sigIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextDTO {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth precisa de um AuthProvider');
  }

  return context;
}
