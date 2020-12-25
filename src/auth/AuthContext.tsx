import { User } from './types';
import { createContext } from 'react';

type AuthContextType = {
  user: User | null;
  login: Function;
  logout: Function;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
