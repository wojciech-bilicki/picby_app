import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './LoginScreena';
import RegisterScreen from './RegisterScreenTemp';
import ForgotPasswordScreen from './ForgotPassScreen';
import ForgotPasswordFormScreen from './ForgotPassFormScreen';

const screens = {
  Login: {
    screen: LoginScreen,
    path: 'login/:token',
  },
  Register: {
    screen: RegisterScreen,
    path: 'register',
  },
  ForgotPass: {
    screen: ForgotPasswordScreen,
    path: 'forgotPassword',
  },
  ForgotPassForm: {
    screen: ForgotPasswordFormScreen,
    path: 'forgotPasswordForm/:token',
  },
};
const AuthStackNav = createStackNavigator(screens, {
  headerMode: 'none',
});

export default AuthStackNav;
