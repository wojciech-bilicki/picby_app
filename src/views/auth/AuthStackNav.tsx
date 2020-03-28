import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
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
    path: 'forgotPasswordForm',
  },
};
const AuthStackNav = createStackNavigator(screens, {
  headerMode: 'none',
});

export default AuthStackNav;
