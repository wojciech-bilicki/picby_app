import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import AboutScreen from './AboutScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  About: {
    screen: AboutScreen,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="O APLIKACJI "
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const AboutStackNav = createStackNavigator(screens);

export default AboutStackNav;
