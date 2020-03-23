import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import ForgotPasswordScreen from './ForgotPassScreen';

const screens = {
  Login: LoginScreen,
  ForgotPass: ForgotPasswordScreen,
  Register: RegisterScreen,
};
const AuthStackNav = createStackNavigator(screens, {
  headerMode: 'none',
});

export default AuthStackNav;
