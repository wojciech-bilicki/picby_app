import React, {useState, Dispatch, SetStateAction} from 'react';
import {Keyboard} from 'react-native';

export interface AuthProps {
  registerContextData: {
    isEmailAlreadyTaken: boolean;
    setIsEmailAlreadyTaken: Dispatch<SetStateAction<boolean>>;
    isItServerError: boolean;
    isRegisterSuccess: boolean;
    handleRegisterRequestAndErrors: (
      email: string,
      password: string,
      resetForm: () => void,
    ) => Promise<void>;
    setAreRegisterButtonsDisabled: Dispatch<SetStateAction<boolean>>;
    areRegisterButtonsDisabled: boolean;
  };
  dismissKeyboard: () => void;
  loginContextData: {
    isPasswordBad: boolean;
    isServerNotResponding: boolean;
    isLoginSuccess: boolean;
    isUserLoggedInFirstTime: boolean;
    setIsPasswordBad: Dispatch<SetStateAction<boolean>>;
    areButtonsDisabled: boolean;
    setAreButtonsDisabled: Dispatch<SetStateAction<boolean>>;
    handleLoginRequestAndErrors: (
      email: string,
      password: string,
      resetForm: () => void,
    ) => Promise<void>;
  };
}

export interface Values {
  password: string;
  email: string;
  passwordRepeat: string;
}

export const AuthContext = React.createContext<AuthProps>({} as AuthProps);

const AuthContextProvider: React.FC = ({children}) => {
  //////// beginning of login logic /////////////
  const [isPasswordBad, setIsPasswordBad] = useState<boolean>(false);
  const [isServerNotResponding, setIsServerNotResponding] = useState<boolean>(
    false,
  );
  const [isLoginSuccess, setIsLoginSuccess] = useState<boolean>(false);
  const [isUserLoggedInFirstTime, setIsUserLoggedInFirstTime] = useState<
    boolean
  >(false);

  const [areButtonsDisabled, setAreButtonsDisabled] = useState<boolean>(false);

  const loginGraphQLQuery = async () => {
    try {
      await fetch('https://pokeapi.co/api/v2/pokemon/asdasd').then(response => {
        if (response.status > 400) {
          throw new Error();
          //add else if with different status to pass error to catch
        }
        return response;
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('2');
    }
  };

  const handleLoginRequestAndErrors = async (
    email: string,
    password: string,
    resetForm: () => void,
  ) => {
    try {
      setAreButtonsDisabled(true);
      await setIsServerNotResponding(false);
      await loginGraphQLQuery();
      setIsLoginSuccess(true);
      resetForm();
    } catch (error) {
      // console.log(error.message);
      setIsServerNotResponding(true);
      // setIsPasswordBad(true);
    } finally {
      console.log('request zakonczony');
      setIsLoginSuccess(false);
      setIsServerNotResponding(false);
    }
  };

  const loginContextData = {
    isPasswordBad,
    isServerNotResponding,
    isLoginSuccess,
    isUserLoggedInFirstTime,
    setIsPasswordBad,
    areButtonsDisabled,
    setAreButtonsDisabled,
    handleLoginRequestAndErrors,
  };

  ////////////  end of login logic //////////////
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  /////////// start of register logic //////////////

  const [isEmailAlreadyTaken, setIsEmailAlreadyTaken] = useState<boolean>(
    false,
  );
  const [isItServerError, setIsItServerError] = useState<boolean>(false);
  const [areRegisterButtonsDisabled, setAreRegisterButtonsDisabled] = useState<
    boolean
  >(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState<boolean>(false);

  const registerGraphQLQuery = async () => {
    try {
      //to have good response delete /"random string" after /pokemon/
      await fetch('https://pokeapi.co/api/v2/pokemon').then(response => {
        if (response.status > 400) {
          throw new Error();
          //add else if with different status to pass error to catch
        }
        return response;
      });
    } catch (error) {
      console.log(error.message);
      throw new Error('2');
    }
  };

  const handleRegisterRequestAndErrors = async (
    email: string,
    password: string,
    resetForm: () => void,
  ) => {
    try {
      setAreRegisterButtonsDisabled(true);
      await setIsItServerError(false);
      await registerGraphQLQuery();
      await setIsRegisterSuccess(true);
      resetForm();
    } catch (error) {
      // console.log(error.message);
      setIsItServerError(true);
      // setIsEmailAlreadyTaken(true);
    } finally {
      setIsRegisterSuccess(false);
      setIsItServerError(false);
      setIsRegisterSuccess(false);
      console.log('register request finished');
    }
  };

  const registerContextData = {
    isEmailAlreadyTaken,
    isRegisterSuccess,
    isItServerError,
    handleRegisterRequestAndErrors,
    setAreRegisterButtonsDisabled,
    areRegisterButtonsDisabled,
    setIsEmailAlreadyTaken,
  };

  ////////// end of reigster logic ////////////////

  return (
    <AuthContext.Provider
      value={{
        registerContextData,
        dismissKeyboard,
        loginContextData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
