import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import SettingsScreen from './SettingsScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  Welcome: {
    screen: SettingsScreen,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="USTAWIENIA"
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const SettingsStackNav = createStackNavigator(screens);

export default SettingsStackNav;
