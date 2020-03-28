import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';

import {dismissKeyboard} from '../../common/utils.global';
import eyePic from '../../common/images/bigEye.png';
import FlatButton from '../../common/components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import PasswordVisibleIcon from '../../common/icons/passwordShownEye.svg';
import PasswordInvisibleIcon from '../../common/icons/passwordHiddenEye.svg';
import ErrorLogo from './icons/exclamationMark.svg';
import {
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {globalStyles} from '../../common/styles/globalStyles';
import {
  useHandlePopupAnimation,
  ENABLE_BUTTONS_DELAY_TIME,
} from './hooks/useHandlePopupAnimation';
import PopUp from './components/Popup';
import {
  forgotPasswordMessages,
  inputData,
  buttonsData,
} from '../../staticData/staticData';
import {NavigationStackProp} from 'react-navigation-stack';
import {useStoreActions, useStoreState} from '../../easyPeasy/hooks';
import {registerMessages} from '../../staticData/staticData';
import KeyLogo from './icons/key.svg';

const {width: vw, height: vh} = Dimensions.get('window');
const {messagePasswordNotSimilar, messageFieldRequired} = registerMessages;

const reviewSchema = yup.object({
  password: yup
    .string()
    .required()
    .min(8),
  passwordRepeat: yup
    .string()
    .required(messageFieldRequired)
    .oneOf([yup.ref('password'), null], messagePasswordNotSimilar),
});

type Props = {
  navigation: NavigationStackProp;
};

interface InputValueType {
  email: string;
}

interface ActionTypes {
  resetForm: () => void;
}

const ForgotPasswordFormScreen: React.FC<Props> = ({navigation}) => {
  const {navigate} = navigation;
  const {handlePopUpAnimation, fadeAnim} = useHandlePopupAnimation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    setAreForgotPassButtonsDisabled,
    setIsEmailNotFound,
    setIsEmailSendSuccess,
    setIsItForgotPassServerError,
    setForgotScreenStateToDefault,
    setMessagePopUpText,
  } = useStoreActions(actions => actions.ForgotPassModel);

  const {
    areForgotPassButtonsDisabled,
    isEmailNotFound,
    isEmailSendSuccess,
    isItForgotPassServerError,
    messagePopUpText,
  } = useStoreState(state => state.ForgotPassModel);

  const {
    messageBadMail,
    messageEmailNotFound,
    messageSendSuccess,
    changePasswordHeader,
    contentHeader,
    messageServerError,
  } = forgotPasswordMessages;

  const {placeholderTextBlueColor} = inputData;
  const {textColorWhite, textColorBlue, sendText, goBackText} = buttonsData;

  const forgotPassGraphQLQuery = async () => {
    //that query gonna change once forgotpass form is ready
    try {
      //to have good response delete /"random string" after /pokemon/
      await fetch('https://pokeapi.co/api/v2/pokemon/asdasd').then(response => {
        if (response.status > 400) {
          throw new Error();
          //add else if with different status to pass error to catch
        }
        return response;
      });
    } catch (error) {
      throw new Error('2');
    }
  };

  const handleForgotPasswordRequestAndErrors = async (
    email: string,
    resetForm: () => void,
  ) => {
    try {
      setAreForgotPassButtonsDisabled(true);
      await setIsItForgotPassServerError(false);
      await forgotPassGraphQLQuery();
      await setIsEmailSendSuccess(true);
      resetForm();
    } catch (error) {
      // setIsEmailNotFound(true);
      setIsItForgotPassServerError(true);
    } finally {
      // setIsEmailNotFound(false);
      setIsItForgotPassServerError(false);
      setIsEmailSendSuccess(false);
      setTimeout(
        () => setAreForgotPassButtonsDisabled(false),
        ENABLE_BUTTONS_DELAY_TIME,
      );
    }
  };
  React.useEffect(() => {
    return () => {
      !navigation.isFocused() && setForgotScreenStateToDefault(true);
    };
  }, []);

  // handle popup notifications //
  React.useEffect(() => {
    if (isEmailSendSuccess) {
      setMessagePopUpText(messageSendSuccess);
      handlePopUpAnimation();
    } else if (isItForgotPassServerError) {
      setMessagePopUpText(messageServerError);
      handlePopUpAnimation();
    }
  }, [isItForgotPassServerError, isEmailSendSuccess]);

  const sendReminderEmail = async (
    values: InputValueType,
    actions: ActionTypes,
  ) => {
    const {email} = values;
    const {resetForm} = actions;
    handleForgotPasswordRequestAndErrors(email, resetForm);
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView keyboardVerticalOffset={100}>
        <TouchableWithoutFeedback
          onPress={dismissKeyboard}
          style={styles.wrapper}>
          <View style={styles.container}>
            <PopUp popUpText={messagePopUpText} fadeAnim={fadeAnim} />
            <View>
              <Image style={styles.bigEye} source={eyePic} />
              <Text style={styles.headerText}>{changePasswordHeader}</Text>
            </View>
            <View>
              <Formik
                validationSchema={reviewSchema}
                initialValues={{password: '', passwordRepeat: ''}}
                onSubmit={(values, actions) => {
                  console.log('submit');
                }}>
                {formikProps => {
                  return (
                    <View>
                      <View style={styles.inputWrapper}>
                        <KeyLogo style={globalStyles.keyLogo} />
                        <TextInput
                          secureTextEntry={!isPasswordVisible}
                          keyboardType="default"
                          style={styles.input}
                          placeholder="Wpisz nowe hasło"
                          placeholderTextColor={placeholderTextBlueColor}
                          onChangeText={formikProps.handleChange('password')}
                          value={formikProps.values.password}
                          onBlur={formikProps.handleBlur('password')}
                          onFocus={() => {
                            if (isEmailNotFound) {
                              setIsEmailNotFound(false);
                              setAreForgotPassButtonsDisabled(false);
                            }
                          }}
                        />
                      </View>
                      <View style={globalStyles.errorTextWrapper}>
                        {(formikProps.touched.password &&
                          formikProps.errors.password) ||
                        isEmailNotFound ? (
                          <ErrorLogo style={globalStyles.errorExlamationMark} />
                        ) : null}
                        <Text style={globalStyles.errorText}>
                          {formikProps.touched.password &&
                            formikProps.errors.password &&
                            messageBadMail}
                          {isEmailNotFound && messageEmailNotFound}
                        </Text>
                      </View>
                      <View style={styles.inputWrapper}>
                        <KeyLogo style={globalStyles.keyLogo} />
                        <TextInput
                          secureTextEntry={!isPasswordVisible}
                          keyboardType="default"
                          style={styles.input}
                          placeholder="Powtórz hasło"
                          placeholderTextColor={placeholderTextBlueColor}
                          onChangeText={formikProps.handleChange(
                            'passwordRepeat',
                          )}
                          value={formikProps.values.passwordRepeat}
                          onBlur={formikProps.handleBlur('passwordRepeat')}
                          onFocus={() => {
                            if (isEmailNotFound) {
                              setIsEmailNotFound(false);
                              setAreForgotPassButtonsDisabled(false);
                            }
                          }}
                        />
                        <TouchableOpacity
                          onPress={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }>
                          {isPasswordVisible ? (
                            <PasswordVisibleIcon
                              style={globalStyles.emailLogo}
                            />
                          ) : (
                            <PasswordInvisibleIcon
                              style={globalStyles.emailLogo}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={globalStyles.errorTextWrapper}>
                        {(formikProps.touched.passwordRepeat &&
                          formikProps.errors.passwordRepeat) ||
                        isEmailNotFound ? (
                          <ErrorLogo style={globalStyles.errorExlamationMark} />
                        ) : null}
                        <Text style={globalStyles.errorText}>
                          {formikProps.touched.passwordRepeat &&
                            formikProps.errors.passwordRepeat &&
                            messageBadMail}
                          {isEmailNotFound && messageEmailNotFound}
                        </Text>
                      </View>
                      <View style={styles.buttonsWrapper}>
                        <FlatButton
                          textValue={sendText}
                          onPress={formikProps.handleSubmit}
                          colorVariantIndex={0}
                          textColor={textColorWhite}
                          disabled={areForgotPassButtonsDisabled}
                        />
                        <View style={styles.singleButtonWrapper}>
                          <FlatButton
                            textValue={goBackText}
                            onPress={() => navigate('Login')}
                            colorVariantIndex={2}
                            textColor={textColorBlue}
                            disabled={
                              areForgotPassButtonsDisabled && !isEmailNotFound
                            }
                          />
                        </View>
                      </View>
                    </View>
                  );
                }}
              </Formik>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#FBB114',
    minHeight: vh * 1,
    position: 'relative',
    zIndex: 2,
  },
  container: {
    alignItems: 'center',
    textAlign: 'center',
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 0.056 * vw,
    lineHeight: 0.078 * vw,
    textAlign: 'center',
    color: '#074782',
    letterSpacing: 0.7,
    marginBottom: 0.1 * vw,
  },
  singleButtonWrapper: {
    marginTop: 0.03 * vw,
  },
  buttonsWrapper: {
    marginTop: 0.1 * vw,
  },
  bigEye: {
    minWidth: vw * 0.5,
    resizeMode: 'contain',
    minHeight: vw * 0.25,
    marginTop: vw * 0.23,
    marginBottom: vw * 0.168,
  },
  input: {
    paddingLeft: 0.053 * vw,
    width: 0.65 * vw,
    margin: 0,
    padding: 0,
    letterSpacing: 0.3,
    fontSize: 16,
    color: 'rgba(7, 71, 130, 0.68)',
  },
  inputWrapper: {
    height: 0.093 * vw,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#EB5F34',
    borderBottomWidth: 2,
    borderRadius: 0,
    textAlign: 'center',
    paddingHorizontal: 5,
    width: 0.8 * vw,
    maxWidth: 0.8 * vw,
  },
});

export default ForgotPasswordFormScreen;
