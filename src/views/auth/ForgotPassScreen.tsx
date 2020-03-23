import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {AuthContext} from './authContext';

import eyePic from '../../common/images/bigEye.png';
import FlatButton from '../../common/components/Button';
import {Formik} from 'formik';
import * as yup from 'yup';
import EmailLogo from './icons/envelope.svg';
import ErrorLogo from './icons/exclamationMark.svg';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {globalStyles} from '../../common/styles/globalStyles';
import {useHandlePopupAnimation} from './hooks/useHandlePopupAnimation';
import PopUp from './components/Popup';
import {useSubmit} from './hooks/useSubmit';
import {
  forgotPasswordMessages,
  inputData,
  buttonsData,
} from '../../staticData/staticData';
import {NavigationStackProp} from 'react-navigation-stack';

const {width: vw, height: vh} = Dimensions.get('window');

const reviewSchema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
});

type Props = {
  navigation: NavigationStackProp;
};

const ForgotPasswordScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  const {handlePopUpAnimation, fadeAnim} = useHandlePopupAnimation();
  const {dismissKeyboard} = useContext(AuthContext);
  const [emailNotFoundError, setEmailNotFoundError] = useState(false);
  const [serverResponseStatus] = useState(true);
  const {
    messageBadMail,
    messageEmailNotFound,
    popUpText,
    contentText,
    contentHeader,
  } = forgotPasswordMessages;
  const {placeholderTextBlueColor} = inputData;
  const {textColorWhite, textColorBlue, sendText, goBackText} = buttonsData;

  const handleSendEmailRequest = () => {
    let promise = new Promise((res, rej) =>
      setTimeout(() => {
        serverResponseStatus ? res(true) : rej(true);
      }, 3000),
    );
    return promise
      .then(() => {
        handlePopUpAnimation();
      })
      .catch(() => {
        setEmailNotFoundError(true);
      });
  };

  const {handleSubmit, loading} = useSubmit(handleSendEmailRequest);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={styles.wrapper}>
      <View style={styles.container}>
        <PopUp popUpText={popUpText} fadeAnim={fadeAnim} />
        <View style={styles.content}>
          <Image style={styles.bigEye} source={eyePic} />
          <Text style={styles.headerText}>{contentHeader}</Text>
          <Text style={styles.contentText}>{contentText}</Text>
        </View>
        <View>
          <Formik
            validationSchema={reviewSchema}
            initialValues={{email: ''}}
            onSubmit={() => {
              // (values, actions)
              handleSubmit();
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
                      onFocus={() =>
                        emailNotFoundError && setEmailNotFoundError(false)
                      }
                    />
                  </View>
                  <View style={globalStyles.errorTextWrapper}>
                    {(formikProps.touched.email && formikProps.errors.email) ||
                    emailNotFoundError ? (
                      <ErrorLogo style={globalStyles.errorExlamationMark} />
                    ) : null}
                    <Text style={globalStyles.errorText}>
                      {formikProps.touched.email &&
                        formikProps.errors.email &&
                        messageBadMail}
                      {emailNotFoundError && messageEmailNotFound}
                    </Text>
                  </View>
                  <View style={styles.buttonsWrapper}>
                    <FlatButton
                      textValue={sendText}
                      onPress={formikProps.handleSubmit}
                      colorVariantIndex={0}
                      textColor={textColorWhite}
                      disabled={loading}
                    />
                    <View style={styles.singleButtonWrapper}>
                      <FlatButton
                        textValue={goBackText}
                        onPress={() => navigate('Login')}
                        colorVariantIndex={2}
                        textColor={textColorBlue}
                        disabled={loading}
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
  headerWrapperThirdScreen: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 0.187 * vw,
  },
  content: {
    maxWidth: 0.9 * vw,
    minHeight: 0.331 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.187 * vw,
  },
  contentText: {
    fontFamily: 'OpenSans-Regular',
    fontStyle: 'normal',
    color: 'rgba(0,0,0,0.9)',
    textAlign: 'center',
    fontSize: 0.05 * vw,
    lineHeight: 0.0687 * vw,
    marginTop: vw * 0.05,
  },
  singleButtonWrapper: {
    marginTop: vw * 0.03,
  },
  buttonsWrapper: {
    marginTop: vw * 0.084,
  },
  bigEye: {
    minWidth: vw * 0.5,
    resizeMode: 'contain',
    minHeight: vw * 0.25,
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
    marginTop: 0.13 * vw,
  },
});

export default ForgotPasswordScreen;
