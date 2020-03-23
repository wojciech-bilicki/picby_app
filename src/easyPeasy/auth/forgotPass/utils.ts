import {useStoreActions} from '../../hooks';

export const setForgotScreenStateToDefault: () => void = () => {
  const {
    setAreForgotPassButtonsDisabled,
    setIsEmailNotFound,
    setIsEmailSendSuccess,
    setIsItForgotPassServerError,
  } = useStoreActions(actions => actions.ForgotPassModel);
  setAreForgotPassButtonsDisabled(false);
  setIsEmailNotFound(false);
  setIsEmailSendSuccess(false);
  setIsItForgotPassServerError(false);
};

export const handleForgotPasswordRequestAndErrors = async (
  email: string,
  resetForm: () => void,
) => {
  const {
    setAreForgotPassButtonsDisabled,
    setIsEmailNotFound,
    setIsEmailSendSuccess,
    setIsItForgotPassServerError,
  } = useStoreActions(actions => actions.ForgotPassModel);
  try {
    setAreForgotPassButtonsDisabled(true);
    await setIsItForgotPassServerError(false);
    //   await forgotPassGraphQLQuery();
    await setIsEmailSendSuccess(true);
    resetForm();
  } catch (error) {
    setIsEmailNotFound(true);
    // setIsItForgotPassServerError(true);
  } finally {
    // setIsEmailNotFound(false);
    setIsItForgotPassServerError(false);
    setIsEmailSendSuccess(false);
  }
};
