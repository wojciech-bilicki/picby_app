import * as React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';
import {dismissKeyboard} from '../../common/utils.global';
import {globalStyles} from '../../common/styles/globalStyles';
import GotAccountQuestion from './components/GotAccountQuestion';
import FlatButton from '../../common/components/Button';
import PicbyLogo from '../../common/images/PICBY.svg';
import EmailLogo from './icons/envelope.svg';
import KeyLogo from './icons/key.svg';
import ErrorLogo from './icons/exclamationMark.svg';
import {
  useHandlePopupAnimation,
  ENABLE_BUTTONS_DELAY_TIME,
} from './hooks/useHandlePopupAnimation';
import PopUp from '../auth/components/Popup';
import {
  introHeaderText,
  buttonsData,
  inputData,
  loginMessages,
  userLoginErrorCodes,
} from '../../staticData/staticData';
import {NavigationStackProp} from 'react-navigation-stack';
import {useStoreState, useStoreActions} from '../../easyPeasy/hooks';
import {useMutation} from '@apollo/react-hooks';
import {LOGIN_USER, CONFIRM_USER} from '../../apollo/mutations/mutations';

const {width: vw} = Dimensions.get('window');

type LoginScreenProps = {
  navigation: NavigationStackProp;
};

interface handleLoginRequest {
  email: string;
  password: string;
  resetForm: () => void;
}

interface CredentialTypes {
  email: string;
  password: string;
}

interface ActionTypes {
  resetForm: () => void;
}

type userTokenType = string | undefined;

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
  const {badEmailOrPasswordCode, userNotConfirmedCode} = userLoginErrorCodes;

  useEffect(() => {
    navigation.addListener('didBlur', () => setLoginScreenStateToDefault(true));
  }, []);
  const {
    setIsUserNotConfirmed,
    setIsServerNotResponding,
    setIsLoginSuccess,
    setIsPasswordBad,
    setAreLoginButtonsDisabled,
    setIsUserConfirmedSuccess,
    setLoginScreenStateToDefault,
    setMessagePopUpText,
  } = useStoreActions(actions => actions.LoginModel);

  const {
    isLoginSuccess,
    isServerNotResponding,
    isPasswordBad,
    isUserLoggedInFirstTime,
    isUserConfirmedSuccess,
    isUserNotConfirmed,
    areLoginButtonsDisabled,
    messagePopUpText,
  } = useStoreState(state => state.LoginModel);

  const handleLoginRequestAndErrors = async ({
    email,
    password,
    resetForm,
  }: handleLoginRequest) => {
    try {
      setAreLoginButtonsDisabled(true);
      await setIsServerNotResponding(false);
      await loginGraphQLQuery({email, password});
      setIsLoginSuccess(true);
      resetForm();
    } catch (error) {
      let errorCode = error.message;
      if (errorCode == badEmailOrPasswordCode) {
        setIsPasswordBad(true);
      } else if (errorCode == userNotConfirmedCode) {
        setIsUserNotConfirmed(true);
      } else setIsServerNotResponding(true);
    } finally {
      setIsLoginSuccess(false);
      setIsServerNotResponding(false);
      setIsUserNotConfirmed(false);
      setTimeout(
        () => setAreLoginButtonsDisabled(false),
        ENABLE_BUTTONS_DELAY_TIME,
      );
    }
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    onError: errorData => {
      const [extensions] = errorData.graphQLErrors;
      const errorString = extensions.message;
      throw new Error(errorString);
    },
    onCompleted: data => {
      console.log(data.login.id);
    },
  });

  const loginGraphQLQuery = async ({email, password}: CredentialTypes) => {
    const emailLowerCase = email.toLowerCase();

    try {
      await loginUser({variables: {email: emailLowerCase, password}});
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {loginHeaderTextTwo, loginHeaderTextOne} = introHeaderText;

  const {
    messageBadEmail,
    messageBadPassword,
    messageLoginSuccess,
    forgotPasswordText,
    messageServerError,
    messageEmailConfirmation,
    messageUserNotConfirmed,
  } = loginMessages;

  const {placeholderTextBlueColor} = inputData;
  const [userTokenValue, setUserTokenValue] = useState<userTokenType>(
    undefined,
  );

  const {
    loginText,
    loginWithGoogle,
    textColorBlue,
    textColorWhite,
  } = buttonsData;

  const reviewSchema = yup.object({
    email: yup
      .string()
      .required()
      .email(),
    password: yup.string().required(),
  });

  useEffect(() => {
    const userToken: userTokenType = navigation.getParam('token');
    userToken && setUserTokenValue(userToken);
  });

  useEffect(() => {
    userTokenValue && handleConfirmUserAndHandleErrors(userTokenValue);
  }, [userTokenValue]);

  // handle errors // podzielic na kilka useeffect
  useEffect(() => {
    if (isServerNotResponding) {
      setMessagePopUpText(messageServerError);
      handlePopUpAnimation();
    } else if (isLoginSuccess && isUserLoggedInFirstTime) {
      setMessagePopUpText(messageLoginSuccess);
      handlePopUpAnimation(redirectToFirstLoginDashboard);
    } else if (isLoginSuccess && !isUserLoggedInFirstTime) {
      setMessagePopUpText(messageLoginSuccess);
      handlePopUpAnimation(redirectToDashboard);
    } else if (isUserConfirmedSuccess) {
      setMessagePopUpText(messageEmailConfirmation);
      handlePopUpAnimation();
    } else if (isUserNotConfirmed) {
      setMessagePopUpText(messageUserNotConfirmed);
      handlePopUpAnimation();
    }
  }, [
    isLoginSuccess,
    isServerNotResponding,
    isPasswordBad,
    isUserLoggedInFirstTime,
    isUserConfirmedSuccess,
    isUserNotConfirmed,
  ]);

  const redirectToFirstLoginDashboard = () => {
    navigation.dangerouslyGetParent()?.navigate('FirstLogin');
  };

  const redirectToDashboard = () => {
    navigation.dangerouslyGetParent()?.navigate('Catalogs');
  };

  const {handlePopUpAnimation, fadeAnim} = useHandlePopupAnimation();

  const sendLoginRequest = async (
    values: CredentialTypes,
    actions: ActionTypes,
  ) => {
    const {email, password} = values;
    const {resetForm} = actions;
    await handleLoginRequestAndErrors({email, password, resetForm});
  };

  const [confirmUser] = useMutation(CONFIRM_USER, {
    onError: errorData => {
      const [extensions] = errorData.graphQLErrors;
      const errorCode = extensions?.extensions?.exception.code;
      throw new Error(errorCode);
    },
    onCompleted: returnedData => {
      console.log(returnedData);
    },
  });

  const confirmUserRequest = async (userToken: string) => {
    try {
      await confirmUser({variables: {token: userToken}});
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleConfirmUserAndHandleErrors = async (userToken: string) => {
    try {
      setAreLoginButtonsDisabled(true);
      await setIsServerNotResponding(false);
      await confirmUserRequest(userToken);
      setIsUserConfirmedSuccess(true);
    } catch (error) {
      setIsServerNotResponding(true);
    } finally {
      setIsServerNotResponding(false);
      setTimeout(
        () => setAreLoginButtonsDisabled(false),
        ENABLE_BUTTONS_DELAY_TIME,
      );
    }
  };

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={globalStyles.screenWrapper}>
          <PopUp popUpText={messagePopUpText} fadeAnim={fadeAnim} />
          <View style={styles.gotAccountQuestion}>
            <GotAccountQuestion
              questionText={loginHeaderTextTwo}
              actionText={loginHeaderTextOne}
              onPress={() => navigate('Register')}
            />
          </View>
          <PicbyLogo style={styles.logo} />
          <View>
            <Formik
              enableReinitialize={true}
              validationSchema={reviewSchema}
              initialValues={{email: '', password: ''}}
              onSubmit={(values, actions) => {
                sendLoginRequest(values, actions);
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
                    />
                  </View>
                  <View style={globalStyles.errorTextWrapper}>
                    {formikProps.touched.email && formikProps.errors.email && (
                      <ErrorLogo style={globalStyles.errorExlamationMark} />
                    )}
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.email &&
                        formikProps.errors.email &&
                        messageBadEmail}
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
                      onFocus={() => {
                        if (isPasswordBad) {
                          setIsPasswordBad(false);
                          setAreLoginButtonsDisabled(false);
                        }
                      }}
                    />
                  </View>
                  <View style={globalStyles.errorTextWrapper}>
                    {isPasswordBad && (
                      <ErrorLogo style={globalStyles.errorExlamationMark} />
                    )}
                    <Text style={globalStyles.errorText}>
                      {isPasswordBad && messageBadPassword}
                    </Text>
                  </View>

                  <View style={styles.googleButtonWrapper}>
                    <FlatButton
                      onPress={formikProps.handleSubmit}
                      colorVariantIndex={1}
                      textValue={loginWithGoogle}
                      textColor={textColorBlue}
                      icon={true}
                      disabled={areLoginButtonsDisabled}
                      googleButton={true}
                    />
                  </View>
                  <FlatButton
                    onPress={formikProps.handleSubmit}
                    colorVariantIndex={0}
                    textValue={loginText}
                    textColor={textColorWhite}
                    disabled={areLoginButtonsDisabled}
                  />
                </View>
              )}
            </Formik>
          </View>
          <TouchableOpacity onPress={() => navigate('ForgotPass')}>
            <Text style={styles.forgotPassword}>{forgotPasswordText}</Text>
          </TouchableOpacity>
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
    marginTop: 0.2187 * vw,
    marginBottom: 0.2187 * vw,
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
  forgotPassword: {
    textDecorationLine: 'underline',
    color: '#000',
    marginTop: 0.04 * vw,
  },
});

export default LoginScreen;
