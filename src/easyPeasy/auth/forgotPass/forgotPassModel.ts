import {Action, action, thunk, Thunk} from 'easy-peasy';

export interface ForgotPassStoreModel {
  isEmailNotFound: boolean;
  isEmailSendSuccess: boolean;
  areForgotPassButtonsDisabled: boolean;
  isItForgotPassServerError: boolean;
  messagePopUpText: string;
  setIsEmailNotFound: Action<ForgotPassStoreModel, boolean>;
  setIsEmailSendSuccess: Action<ForgotPassStoreModel, boolean>;
  setAreForgotPassButtonsDisabled: Action<ForgotPassStoreModel, boolean>;
  setIsItForgotPassServerError: Action<ForgotPassStoreModel, boolean>;
  setMessagePopUpText: Action<ForgotPassStoreModel, string>;
  setForgotScreenStateToDefault: Thunk<ForgotPassStoreModel, boolean>;
}
const ForgotPassModel: ForgotPassStoreModel = {
  isEmailNotFound: false,
  isEmailSendSuccess: false,
  areForgotPassButtonsDisabled: false,
  isItForgotPassServerError: false,
  messagePopUpText: '',
  setIsEmailNotFound: action((state, payload) => {
    state.isEmailNotFound = payload;
  }),
  setIsEmailSendSuccess: action((state, payload) => {
    state.isEmailSendSuccess = payload;
  }),
  setAreForgotPassButtonsDisabled: action((state, payload) => {
    state.areForgotPassButtonsDisabled = payload;
  }),
  setIsItForgotPassServerError: action((state, payload) => {
    state.isItForgotPassServerError = payload;
  }),
  setMessagePopUpText: action((state, payload) => {
    state.messagePopUpText = payload;
  }),
  setForgotScreenStateToDefault: thunk((actions, payload) => {
    actions.setAreForgotPassButtonsDisabled(false);
    actions.setIsEmailSendSuccess(false);
    actions.setIsItForgotPassServerError(false);
    actions.setIsEmailNotFound(false);
    actions.setMessagePopUpText('');
  }),
};

export default ForgotPassModel;
