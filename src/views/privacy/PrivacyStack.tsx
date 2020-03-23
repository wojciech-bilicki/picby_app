import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import PrivacyScreen from './PrivacyScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  Welcome: {
    screen: PrivacyScreen,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="POLITYKA PRYWATNOŚCI"
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const PrivacyStackNav = createStackNavigator(screens);

export default PrivacyStackNav;
