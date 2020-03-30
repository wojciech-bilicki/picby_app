import {Action, action, thunk, Thunk} from 'easy-peasy';

export interface ForgotFormStoreModel {
  isEmailSendSuccess: boolean;
  areForgotFormButtonsDisabled: boolean;
  isItForgotFormServerError: boolean;
  messagePopUpText: string;
  setIsEmailSendSuccess: Action<ForgotFormStoreModel, boolean>;
  setAreForgotFormButtonsDisabled: Action<ForgotFormStoreModel, boolean>;
  setIsItForgotFormServerError: Action<ForgotFormStoreModel, boolean>;
  setMessagePopUpText: Action<ForgotFormStoreModel, string>;
  setForgotFormStateToDefault: Thunk<ForgotFormStoreModel, boolean>;
}
const ForgotFormModel: ForgotFormStoreModel = {
  isEmailSendSuccess: false,
  areForgotFormButtonsDisabled: false,
  isItForgotFormServerError: false,
  messagePopUpText: '',
  setIsEmailSendSuccess: action((state, payload) => {
    state.isEmailSendSuccess = payload;
  }),
  setAreForgotFormButtonsDisabled: action((state, payload) => {
    state.areForgotFormButtonsDisabled = payload;
  }),
  setIsItForgotFormServerError: action((state, payload) => {
    state.isItForgotFormServerError = payload;
  }),
  setMessagePopUpText: action((state, payload) => {
    state.messagePopUpText = payload;
  }),
  setForgotFormStateToDefault: thunk((actions, payload) => {
    actions.setAreForgotFormButtonsDisabled(false);
    actions.setIsEmailSendSuccess(false);
    actions.setIsItForgotFormServerError(false);
    actions.setMessagePopUpText('');
  }),
};

export default ForgotFormModel;
