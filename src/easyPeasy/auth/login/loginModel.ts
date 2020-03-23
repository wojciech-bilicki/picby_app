import {Action, action, Thunk, thunk} from 'easy-peasy';

export interface LoginStoreModel {
  isUserConfirmedSuccess: boolean;
  isPasswordBad: boolean;
  isServerNotResponding: boolean;
  isLoginSuccess: boolean;
  isUserLoggedInFirstTime: boolean;
  areLoginButtonsDisabled: boolean;
  messagePopUpText: string;
  isUserNotConfirmed: boolean;
  setIsUserConfirmedSuccess: Action<LoginStoreModel, boolean>;
  setIsPasswordBad: Action<LoginStoreModel, boolean>;
  setIsServerNotResponding: Action<LoginStoreModel, boolean>;
  setIsLoginSuccess: Action<LoginStoreModel, boolean>;
  setIsUserLoggedInFirstTime: Action<LoginStoreModel, boolean>;
  setAreLoginButtonsDisabled: Action<LoginStoreModel, boolean>;
  setIsUserNotConfirmed: Action<LoginStoreModel, boolean>;
  setLoginScreenStateToDefault: Thunk<LoginStoreModel, boolean>;
  setMessagePopUpText: Action<LoginStoreModel, string>;
}
const LoginModel: LoginStoreModel = {
  //   state   //
  isUserConfirmedSuccess: false,
  isPasswordBad: false,
  isServerNotResponding: false,
  isLoginSuccess: false,
  isUserLoggedInFirstTime: true,
  areLoginButtonsDisabled: false,
  isUserNotConfirmed: false,
  messagePopUpText: '',
  //   actions //
  setIsUserConfirmedSuccess: action((state, payload) => {
    state.isUserConfirmedSuccess = payload;
  }),
  setIsPasswordBad: action((state, payload) => {
    state.isPasswordBad = payload;
  }),
  setIsServerNotResponding: action((state, payload) => {
    state.isServerNotResponding = payload;
  }),
  setIsLoginSuccess: action((state, payload) => {
    state.isLoginSuccess = payload;
  }),
  setIsUserLoggedInFirstTime: action((state, payload) => {
    state.isUserLoggedInFirstTime = payload;
  }),
  setAreLoginButtonsDisabled: action((state, payload) => {
    state.areLoginButtonsDisabled = payload;
  }),
  setIsUserNotConfirmed: action((state, payload) => {
    state.isUserNotConfirmed = payload;
  }),
  setMessagePopUpText: action((state, payload) => {
    state.messagePopUpText = payload;
  }),
  setLoginScreenStateToDefault: thunk((actions, payload) => {
    actions.setAreLoginButtonsDisabled(false);
    actions.setIsUserConfirmedSuccess(false);
    actions.setIsLoginSuccess(false);
    actions.setIsUserConfirmedSuccess(false);
    actions.setIsServerNotResponding(false);
    actions.setIsPasswordBad(false);
    actions.setIsUserNotConfirmed(false);
    actions.setMessagePopUpText('');
  }),
};

export default LoginModel;
