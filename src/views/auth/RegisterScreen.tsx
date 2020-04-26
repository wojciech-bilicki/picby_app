import { StackNavigationProp } from '@react-navigation/stack';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import * as yup from 'yup';
import FlatButton from '../../common/components/Button';
import { AuthContext, RootStackParamList, SignUpData } from '../../navigation/authContext';
import { AuthWrapper } from './AuthWrapper';
import { EmailInput } from './components/EmailInput';
import { ErrorLabel } from './components/ErrorLabel';
import GotAccountQuestion from './components/GotAccountQuestion';
import { PasswordInput } from './components/PasswordInput';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'RegisterScreen'
>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}
const {width: vw} = Dimensions.get('window');

const validationSchema = yup.object({
  email: yup.string().required().email(),
  password: yup.string().required().min(8),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], "passwords must match")
});

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation: {navigate},
}) => {

  const {signUp} = useContext(AuthContext)
  const [signUpError, setSignUpError] = useState<Maybe<string>>(null)

  const onSubmit = async (data: SignUpData) => {
    try {
      const response = await signUp!(data)
      if(response && response.id) {
        navigate('LoginScreen', {
          shouldShowConfirmationPopup: true
        })
      }
    } catch (e) {
      console.log(e)
      setSignUpError(e?.graphQLErrors[0].message)
    }

  }
  return (
    <AuthWrapper>
      <View style={styles.gotAccountQuestion}>
        <GotAccountQuestion
          questionText="Masz już konto? Doskonale"
          actionText="Zaloguj się"
          onPress={() => navigate('LoginScreen')}
        />
      </View>
      <Formik
        enableReinitialize={true}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={{email: '', password: '', repeatPassword: ''}}>
        {({
          values: {email, password, repeatPassword},
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
        }) => (
          <>
            <EmailInput
              email={email}
              errorEmail={errors.email}
              onChange={handleChange('email')}
              touchedEmail={touched.email}
            />
            <PasswordInput
              password={password}
              errorPassword={errors.password}
              onChange={handleChange('password')}
              touchedPassword={touched.password}
            />
            <PasswordInput
              password={repeatPassword}
              errorPassword={errors.repeatPassword}
              onChange={handleChange('repeatPassword')}
              touchedPassword={touched.repeatPassword}
            />
         
            {   //TODO: translate codes to something we can display to user
              !!signUpError && !!touched.email && !!touched.password && <ErrorLabel error={signUpError}/>}
            <FlatButton
              onPress={handleSubmit}
              //TODO: change that to an reasonable enum
              colorVariantIndex={0}
              label="Register"
              disabled={isSubmitting}
            />
          </>
        )}
      </Formik>
    </AuthWrapper>
  );
};

const styles = StyleSheet.create({
  gotAccountQuestion: {
    alignSelf: 'flex-start',
    marginLeft: 0.1 * vw,
    marginTop: 0.05 * vw,
  },
});
