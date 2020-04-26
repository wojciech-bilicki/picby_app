import React from 'react';


export interface SignInData {
  password: string;
  email: string;
}


export interface SignUpData {
  password: string;
  email: string;
  repeatPassword: string;
}

export interface SignUpResponse {
  id: string;
  email: string;
}

interface AuthContextType {
  signIn: (data: SignInData) => Promise<void>;
  signUp: (data: SignUpData) => Promise<SignUpResponse | undefined>;
  signOut: () => void;
}

export type RootStackParamList = {
  ErrorScreen: undefined,
  LoadingScreen: undefined,
  HomeScreen: undefined,
  LoginScreen: {
    shouldShowConfirmationPopup?: boolean 
  };
  Dupa: undefined;
  RegisterScreen: undefined
};


export const AuthContext = React.createContext<Partial<AuthContextType>>({});