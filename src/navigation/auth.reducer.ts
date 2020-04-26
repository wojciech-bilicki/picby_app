
interface AuthState {
  userToken: Maybe<string>;
  isLoading: boolean;
  isSignOut: boolean;
  error: Maybe<AuthError>
}

export const AuthInitialState: AuthState = {
  isLoading: true,
  isSignOut: true,
  userToken: null,
  error: null
}

export interface Action {
  type: string
}

export enum ActionTypes {
  SIGN_IN = 'SIGN_IN',
  SET_ERROR = 'SET_ERROR'
}

enum AuthError {
  WrongUserOrPassword = "wrong_user_or_password",
  UserNotConfirmed = "user_not_confirmed"
}

export interface SignInAction extends Action {
  token: string
}

export interface SetErrorAction extends Action {
  error: AuthError;
}

type Actions = SignInAction | SetErrorAction;

function isSignInAction(action: Actions): action is SignInAction {
  return action.type === ActionTypes.SIGN_IN;
}

function isSetErrorAction(action: Actions): action is SetErrorAction {
  return action.type ===ActionTypes.SET_ERROR
}


export const authReducer = (authState: AuthState, action: Actions):AuthState => {
  if(isSignInAction(action)) {
    return  {
      ...authState,
      userToken: action.token,
      isLoading: false
    }
  } else if(isSetErrorAction(action)) {
    return {
      ...authState,
      userToken: null,
      isLoading: false,
      error: action.error
    }
  }

  return authState
}
