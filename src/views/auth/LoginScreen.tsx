import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as yup from 'yup';
import FlatButton from '../../common/components/Button';
import { AuthContext, RootStackParamList, SignInData } from '../../navigation/authContext';
import { AuthWrapper } from './AuthWrapper';
import { EmailInput } from './components/EmailInput';
import { ErrorLabel } from './components/ErrorLabel';
import GotAccountQuestion from './components/GotAccountQuestion';
import { PasswordInput } from './components/PasswordInput';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>
type LoginScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp,
  route: LoginScreenRouteProp
}

const {width: vw} = Dimensions.get('window');

const validationSchema = yup.object({
  email: yup
    .string()
    .required()
    .email(),
  password: yup.string().required(),
});


export const LoginScreen: React.FC<LoginScreenProps> = ({navigation: {navigate}, route }) => {

    const {signIn} = useContext(AuthContext)
    const [signInError, setSignInError] = useState<Maybe<string>>(null)
    const { params  } = route;

    const onSubmit = async (data: SignInData) =>{
      try {
        await signIn!(data)
      } catch (e) {
        console.log(e)
        setSignInError(e?.graphQLErrors[0].message)
      }
    }
    return (<AuthWrapper>
       <View style={styles.gotAccountQuestion}>
            <GotAccountQuestion
              questionText="Nie masz jeszcze konta?"
              actionText="Zarejestruj się"
              onPress={() => navigate('RegisterScreen')}
            />
          </View>
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={onSubmit}
      >{({handleSubmit, isSubmitting, values: {email, password}, handleChange, handleBlur, touched, errors}) => (
        <>
        <EmailInput
          onChange={handleChange('email')} 
          email={email}
          errorEmail={errors.email} 
          touchedEmail={touched.email} 
          />
          
        <PasswordInput 
          onChange={handleChange('password')}
          password={password}
          errorPassword={errors.password}
          touchedPassword={touched.password}
        />
        
        {   //TODO: translate codes to something we can display to user
        !!signInError && !!touched.email && !!touched.password && <ErrorLabel error={signInError}/>}
        <FlatButton
            onPress={handleSubmit}
            colorVariantIndex={0}
            label="Login"
            disabled={isSubmitting}
        />
      </>
      )}</Formik>
      
      {//TODO: use material ui snackbar to present this information
       params && params.shouldShowConfirmationPopup && <Text>Sprawdź skrzynkę mailową i potwierdź swoje konto</Text>}
    </AuthWrapper>);
}


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
