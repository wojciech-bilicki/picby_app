import { useMutation } from '@apollo/react-hooks';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationStackProp } from 'react-navigation-stack';
import * as yup from 'yup';
import client from '../../../apollo.config';
import { CHANGE_PASSWORD } from '../../apollo/mutations/mutations';
import FlatButton from '../../common/components/Button';
import PasswordInvisibleIcon from '../../common/icons/passwordHiddenEye.svg';
import PasswordVisibleIcon from '../../common/icons/passwordShownEye.svg';
import eyePic from '../../common/images/bigEye.png';
import { globalStyles } from '../../common/styles/globalStyles';
import { dismissKeyboard } from '../../common/utils.global';
import { useStoreActions, useStoreState } from '../../easyPeasy/hooks';
import { buttonsData, forgotPasswordMessages, inputData, registerMessages } from '../../staticData/staticData';
import PopUp from './components/Popup';
import { ENABLE_BUTTONS_DELAY_TIME, useHandlePopupAnimation } from './hooks/useHandlePopupAnimation';
import ErrorLogo from './icons/exclamationMark.svg';
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
  password: string;
}

interface ActionTypes {
  resetForm: () => void;
}

type userTokenType = string | undefined;

const ForgotPasswordFormScreen: React.FC<Props> = ({navigation}) => {
  const {navigate} = navigation;
  const {handlePopUpAnimation, fadeAnim} = useHandlePopupAnimation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [userTokenValue, setUserTokenValue] = useState("");

  const {
    setAreForgotFormButtonsDisabled,
    setIsEmailSendSuccess,
    setIsItForgotFormServerError,
    setForgotFormStateToDefault,
    setMessagePopUpText,
  } = useStoreActions(actions => actions.ForgotFormModel);

  const {
    areForgotFormButtonsDisabled,
    isEmailSendSuccess,
    isItForgotFormServerError,
    messagePopUpText,
  } = useStoreState(state => state.ForgotFormModel);

  const {
    passwordChangeSuccess,
    changePasswordHeader,
    messageServerError,
  } = forgotPasswordMessages;

  const {messagePasswordError, messagePasswordNotSimilar} = registerMessages;

  const {placeholderTextBlueColor} = inputData;
  const {textColorWhite, textColorBlue, sendText, goBackText} = buttonsData;

  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onError: errorData => {
      const [extensions] = errorData?.graphQLErrors;
      const errorString = extensions.message;
      throw new Error(errorString);
    },
  });

  const changePassGraphQLQuery = async ({
    password,
    token,
  }: {
    password: string;
    token: string;
  }) => {
    try {
      await changePassword({variables: {password, token}});
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const handleNewPasswordRequestAndErrors = async (
    password: string,
    resetForm: () => void,
  ) => {
    try {
      setAreForgotFormButtonsDisabled(true);
      await setIsItForgotFormServerError(false);
      await changePassGraphQLQuery({password, token: userTokenValue!});
      await setIsEmailSendSuccess(true);
      setTimeout(() => {
        setAreForgotFormButtonsDisabled(false);
        resetForm();
      }, ENABLE_BUTTONS_DELAY_TIME);
    } catch (error) {
      setIsItForgotFormServerError(true);
    } finally {
      setIsItForgotFormServerError(false);
      setIsEmailSendSuccess(false);
      client.cache.reset();
    }
  };

  useEffect(() => {
    return () => {
      !navigation.isFocused() && setForgotFormStateToDefault(true);
    };
  }, []);

  useEffect(() => {
    if (isEmailSendSuccess) {
      setMessagePopUpText(passwordChangeSuccess);
      handlePopUpAnimation();
    } else if (isItForgotFormServerError) {
      setMessagePopUpText(messageServerError);
      handlePopUpAnimation();
    }
  }, [isItForgotFormServerError, isEmailSendSuccess]);

  const handleSubmit = async (values: InputValueType, actions: ActionTypes) => {
    const {password} = values;
    const {resetForm} = actions;
    handleNewPasswordRequestAndErrors(password, resetForm);
  };

  useEffect(() => {
    const userToken: userTokenType = navigation.getParam('token');
    console.log(userToken);
    userToken && setUserTokenValue(userToken);
  }, []);

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
                  handleSubmit(values, actions);
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
                        />
                      </View>
                      <View style={globalStyles.errorTextWrapper}>
                        {formikProps.touched.password &&
                        formikProps.errors.password ? (
                          <ErrorLogo style={globalStyles.errorExlamationMark} />
                        ) : null}
                        <Text style={globalStyles.errorText}>
                          {formikProps.touched.password &&
                            formikProps.errors.password &&
                            messagePasswordError}
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
                        {formikProps.touched.passwordRepeat &&
                        formikProps.errors.passwordRepeat ? (
                          <ErrorLogo style={globalStyles.errorExlamationMark} />
                        ) : null}
                        <Text style={globalStyles.errorText}>
                          {formikProps.touched.passwordRepeat &&
                            formikProps.errors.passwordRepeat &&
                            messagePasswordNotSimilar}
                        </Text>
                      </View>
                      <View style={styles.buttonsWrapper}>
                        <FlatButton
                          textValue={sendText}
                          onPress={formikProps.handleSubmit}
                          colorVariantIndex={0}
                          textColor={textColorWhite}
                          disabled={areForgotFormButtonsDisabled}
                        />
                        <View style={styles.singleButtonWrapper}>
                          <FlatButton
                            textValue={goBackText}
                            onPress={() => navigate('Login')}
                            colorVariantIndex={2}
                            textColor={textColorBlue}
                            disabled={areForgotFormButtonsDisabled}
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
