import {Action, action, thunk, Thunk} from 'easy-peasy';

export interface RegisterStoreModel {
  isEmailAlreadyTaken: boolean;
  isItServerError: boolean;
  areRegisterButtonsDisabled: boolean;
  isRegisterSuccess: boolean;
  messagePopUpText: string;
  setIsEmailAlreadyTaken: Action<RegisterStoreModel, boolean>;
  setIsItServerError: Action<RegisterStoreModel, boolean>;
  setAreRegisterButtonsDisabled: Action<RegisterStoreModel, boolean>;
  setIsRegisterSuccess: Action<RegisterStoreModel, boolean>;
  setMessagePopUpText: Action<RegisterStoreModel, string>;
  setRegisterScreenStateToDefault: Thunk<RegisterStoreModel, boolean>;
}
const RegisterModel: RegisterStoreModel = {
  //   state   //
  isEmailAlreadyTaken: false,
  isItServerError: false,
  areRegisterButtonsDisabled: false,
  isRegisterSuccess: false,
  messagePopUpText: '',
  //   actions //
  setIsEmailAlreadyTaken: action((state, payload) => {
    state.isEmailAlreadyTaken = payload;
  }),
  setIsItServerError: action((state, payload) => {
    state.isItServerError = payload;
  }),
  setAreRegisterButtonsDisabled: action((state, payload) => {
    state.areRegisterButtonsDisabled = payload;
  }),
  setIsRegisterSuccess: action((state, payload) => {
    state.isRegisterSuccess = payload;
  }),
  setMessagePopUpText: action((state, payload) => {
    state.messagePopUpText = payload;
  }),
  setRegisterScreenStateToDefault: thunk(actions => {
    actions.setAreRegisterButtonsDisabled(false),
      actions.setIsEmailAlreadyTaken(false),
      actions.setIsItServerError(false),
      actions.setIsRegisterSuccess(false),
      actions.setMessagePopUpText('');
  }),
};

export default RegisterModel;
