import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextInput, ScrollView} from 'react-native-gesture-handler';

import {globalStyles} from '../../common/styles/globalStyles';
import {dismissKeyboard} from '../../common/utils.global';
import GotAccountQuestion from './components/GotAccountQuestion';
import PicbyLogo from '../../common/images/PICBY.svg';
import EmailLogo from './icons/envelope.svg';
import ErrorLogo from './icons/exclamationMark.svg';
import KeyLogo from './icons/key.svg';
import FlatButton from '../../common/components/Button';
import {
  useHandlePopupAnimation,
  ENABLE_BUTTONS_DELAY_TIME,
} from './hooks/useHandlePopupAnimation';
import PopUp from '../auth/components/Popup';
import {
  registerMessages,
  buttonsData,
  inputData,
  introHeaderText,
} from '../../staticData/staticData';
import {NavigationStackProp} from 'react-navigation-stack';
import {useStoreState, useStoreActions} from '../../easyPeasy/hooks';
import {useMutation} from '@apollo/react-hooks';
import {REGISTER_USER} from '../../apollo/mutations/mutations';

const {width: vw} = Dimensions.get('window');

type NavTypes = {
  navigation: NavigationStackProp;
};

interface CredentialTypes {
  email: string;
  password: string;
}

interface ActionTypes {
  resetForm: () => void;
}

const RegisterScreen: React.FC<NavTypes> = ({navigation}) => {
  const {navigate} = navigation;

  const {
    areRegisterButtonsDisabled,
    isEmailAlreadyTaken,
    isItServerError,
    isRegisterSuccess,
    messagePopUpText,
  } = useStoreState(state => state.RegisterModel);

  const {
    setAreRegisterButtonsDisabled,
    setIsEmailAlreadyTaken,
    setMessagePopUpText,
    setRegisterScreenStateToDefault,
    setIsItServerError,
    setIsRegisterSuccess,
  } = useStoreActions(actions => actions.RegisterModel);

  const {handlePopUpAnimation, fadeAnim} = useHandlePopupAnimation();

  const {
    messageBadEmail,
    messageEmailAlreadyTaken,
    messagePasswordError,
    messageRegisterSuccess,
    messagePasswordNotSimilar,
    messageFieldRequired,
    messageServerError,
  } = registerMessages;

  const {
    registerText,
    registerWithGoogle,
    textColorBlue,
    textColorWhite,
  } = buttonsData;

  const {placeholderTextBlueColor} = inputData;
  const {registerHeaderTextTwo, registerHeaderTextOne} = introHeaderText;

  const reviewSchema = yup.object({
    email: yup
      .string()
      .required()
      .email(),
    password: yup
      .string()
      .required()
      .min(8),
    passwordRepeat: yup
      .string()
      .required(messageFieldRequired)
      .oneOf([yup.ref('password'), null], messagePasswordNotSimilar),
  });
  const handleRegisterRequestAndErrors = async (
    email: string,
    password: string,
    resetForm: () => void,
  ) => {
    const lowerCaseEmail: string = email.toLowerCase();
    try {
      setAreRegisterButtonsDisabled(true);
      await setIsItServerError(false);
      await registerGraphQLQuery({email: lowerCaseEmail, password});
      await setIsRegisterSuccess(true);
      resetForm();
    } catch (error) {
      let errorCode = error.message;
      Number(errorCode) == 23505
        ? setIsEmailAlreadyTaken(true)
        : setIsItServerError(true);
    } finally {
      setIsRegisterSuccess(false);
      setIsItServerError(false);
      setTimeout(
        () => setAreRegisterButtonsDisabled(false),
        ENABLE_BUTTONS_DELAY_TIME,
      );
    }
  };
  const registerGraphQLQuery = async ({email, password}: CredentialTypes) => {
    try {
      await registerUser({variables: {email, password}});
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const [registerUser, {error}] = useMutation(REGISTER_USER, {
    onError: errorData => {
      const [extensions] = errorData.graphQLErrors;
      const errorCode = extensions.extensions?.exception.code;
      throw new Error(errorCode);
    },
    onCompleted: data => {
      console.log(data);
    },
  });
  const sendRegisterRequest = async (
    values: CredentialTypes,
    actions: ActionTypes,
  ) => {
    const {email, password} = values;
    const {resetForm} = actions;
    handleRegisterRequestAndErrors(email, password, resetForm);
  };
  React.useEffect(() => {
    return () => {
      !navigation.isFocused() && setRegisterScreenStateToDefault(true);
    };
  }, []);

  React.useEffect(() => {
    if (isItServerError) {
      setMessagePopUpText(messageServerError);
      handlePopUpAnimation();
    }
  }, [isItServerError]);
  React.useEffect(() => {
    if (isRegisterSuccess) {
      setMessagePopUpText(messageRegisterSuccess);
      handlePopUpAnimation();
    }
  }, [isRegisterSuccess]);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={globalStyles.screenWrapper}>
          <PopUp fadeAnim={fadeAnim} popUpText={messagePopUpText} />
          <View style={styles.gotAccountQuestion}>
            <GotAccountQuestion
              questionText={registerHeaderTextTwo}
              actionText={registerHeaderTextOne}
              onPress={() => navigate('Login')}
            />
          </View>
          <PicbyLogo style={styles.logo} />
          <View>
            <Formik
              validationSchema={reviewSchema}
              initialValues={{email: '', password: '', passwordRepeat: ''}}
              onSubmit={(values, actions) => {
                sendRegisterRequest(values, actions);
              }}>
              {formikProps => (
                <View>
                  <View style={styles.inputWrapper}>
                    <EmailLogo style={globalStyles.emailLogo} />
                    <TextInput
                      keyboardType="email-address"
                      style={globalStyles.input}
                      placeholder="E-mail"
                      placeholderTextColor={placeholderTextBlueColor}
                      onChangeText={formikProps.handleChange('email')}
                      value={formikProps.values.email}
                      onBlur={formikProps.handleBlur('email')}
                      onFocus={() => {
                        if (isEmailAlreadyTaken) {
                          setIsEmailAlreadyTaken(false);
                          setAreRegisterButtonsDisabled(false);
                        }
                      }}
                    />
                  </View>
                  <View style={globalStyles.errorTextWrapper}>
                    {(formikProps.touched.email && formikProps.errors.email) ||
                    isEmailAlreadyTaken ? (
                      <ErrorLogo style={globalStyles.errorExlamationMark} />
                    ) : null}
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.email &&
                        formikProps.errors.email &&
                        messageBadEmail}
                      {isEmailAlreadyTaken && messageEmailAlreadyTaken}
                    </Text>
                  </View>
                  <View style={styles.inputWrapper}>
                    <KeyLogo style={globalStyles.keyLogo} />
                    <TextInput
                      secureTextEntry={true}
                      style={globalStyles.input}
                      placeholder="Hasło"
                      placeholderTextColor={placeholderTextBlueColor}
                      onChangeText={formikProps.handleChange('password')}
                      value={formikProps.values.password}
                      onBlur={formikProps.handleBlur('password')}
                    />
                  </View>
                  <View style={globalStyles.errorTextWrapper}>
                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <ErrorLogo style={globalStyles.errorExlamationMark} />
                      )}
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.password &&
                        formikProps.errors.password &&
                        messagePasswordError}
                    </Text>
                  </View>
                  <View style={styles.inputWrapper}>
                    <KeyLogo style={globalStyles.keyLogo} />
                    <TextInput
                      secureTextEntry={true}
                      style={globalStyles.input}
                      placeholder="Powtórz hasło"
                      placeholderTextColor={placeholderTextBlueColor}
                      onChangeText={formikProps.handleChange('passwordRepeat')}
                      value={formikProps.values.passwordRepeat}
                    />
                  </View>
                  <View style={globalStyles.errorTextWrapper}>
                    {formikProps.touched.passwordRepeat &&
                      formikProps.errors.passwordRepeat && (
                        <ErrorLogo style={globalStyles.errorExlamationMark} />
                      )}
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.passwordRepeat &&
                        formikProps.errors.passwordRepeat}
                    </Text>
                  </View>
                  <View style={styles.googleButtonWrapper}>
                    <FlatButton
                      onPress={formikProps.handleSubmit}
                      colorVariantIndex={1}
                      textValue={registerWithGoogle}
                      textColor={textColorBlue}
                      icon={true}
                      disabled={areRegisterButtonsDisabled}
                      googleButton={true}
                    />
                  </View>
                  <FlatButton
                    onPress={formikProps.handleSubmit}
                    colorVariantIndex={0}
                    textValue={registerText}
                    textColor={textColorWhite}
                    disabled={areRegisterButtonsDisabled}
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  gotAccountQuestion: {
    alignSelf: 'flex-start',
    marginLeft: 0.1 * vw,
    marginTop: 0.05 * vw,
  },
  logo: {
    minWidth: 0.65 * vw,
    minHeight: 0.21 * vw,
    resizeMode: 'contain',
    marginTop: 0.112 * vw,
    marginBottom: 0.112 * vw,
  },
  inputWrapper: {
    height: 0.093 * vw,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(242, 143, 174, 0.68)',
    borderBottomWidth: 2,
    borderRadius: 0,
    textAlign: 'center',
    paddingHorizontal: 5,
    width: vw * 0.8,
  },
  googleButtonWrapper: {
    marginTop: vw * 0.0625,
    marginBottom: vw * 0.05,
  },
});

export default RegisterScreen;
