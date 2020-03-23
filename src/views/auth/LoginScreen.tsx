import * as React from 'react';
import {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {Formik} from 'formik';
import * as yup from 'yup';

import {globalStyles} from '../../common/styles/globalStyles';
import {AuthContext} from './authContext';
import GotAccountQuestion from './components/GotAccountQuestion';
import FlatButton from '../../common/components/Button';
import PicbyLogo from '../../common/images/PICBY.svg';
import EmailLogo from './icons/envelope.svg';
import KeyLogo from './icons/key.svg';
import ErrorLogo from './icons/exclamationMark.svg';
import {useHandlePopupAnimation} from './hooks/useHandlePopupAnimation';
import PopUp from '../auth/components/Popup';
import {
  introHeaderText,
  buttonsData,
  inputData,
  loginMessages,
} from '../../staticData/staticData';
import {NavigationStackProp} from 'react-navigation-stack';

const {width: vw} = Dimensions.get('window');

type LoginScreenProps = {
  navigation: NavigationStackProp;
};

interface CredentialTypes {
  email: string;
  password: string;
}

interface ActionTypes {
  resetForm: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {navigate} = navigation;

  const {
    loginContextData: {
      isLoginSuccess,
      isServerNotResponding,
      isPasswordBad,
      isUserLoggedInFirstTime,
      handleLoginRequestAndErrors,
      setIsPasswordBad,
      areButtonsDisabled,
      setAreButtonsDisabled,
    },
    dismissKeyboard,
  } = useContext(AuthContext);

  const {loginHeaderTextTwo, loginHeaderTextOne} = introHeaderText;

  const {
    messageBadEmail,
    messageBadPassword,
    messageLoginSuccess,
    forgotPasswordText,
    messageServerError,
  } = loginMessages;

  const {placeholderTextBlueColor} = inputData;
  const [messagePopUpText, setMessagePopUpText] = useState('');

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

  // handle errors //
  React.useEffect(() => {
    if (isServerNotResponding) {
      setMessagePopUpText(messageServerError);
      handlePopUpAnimation();
    } else if (isLoginSuccess) {
      setMessagePopUpText(messageLoginSuccess);
      handlePopUpAnimation(redirectToDashboard);
    }
  }, [isLoginSuccess, isServerNotResponding, isPasswordBad]);

  const redirectToDashboard = () => {
    navigation.dangerouslyGetParent()?.navigate('ParentDashboard');
  };
  const {handlePopUpAnimation, fadeAnim} = useHandlePopupAnimation();
  const sendLoginRequest = async (
    values: CredentialTypes,
    actions: ActionTypes,
  ) => {
    const {email, password} = values;
    const {resetForm} = actions;
    await handleLoginRequestAndErrors(email, password, resetForm);
  };

  return (
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
            validationSchema={reviewSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={(values, actions) => {
              sendLoginRequest(values, actions);
            }}>
            {formikProps => {
              return (
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
                          setAreButtonsDisabled(false);
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
                      onPress={() => redirectToDashboard()}
                      colorVariantIndex={1}
                      textValue={loginWithGoogle}
                      textColor={textColorBlue}
                      icon={true}
                      disabled={areButtonsDisabled}
                      googleButton={true}
                    />
                  </View>
                  <FlatButton
                    onPress={formikProps.handleSubmit}
                    colorVariantIndex={0}
                    textValue={loginText}
                    textColor={textColorWhite}
                    disabled={areButtonsDisabled}
                  />
                </View>
              );
            }}
          </Formik>
        </View>
        <TouchableOpacity onPress={() => navigate('ForgotPass')}>
          <Text style={styles.forgotPassword}>{forgotPasswordText}</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
