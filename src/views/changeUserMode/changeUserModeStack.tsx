import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import ChangeUserMode from './changeUserModeScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  ChangeUserMode: {
    screen: ChangeUserMode,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="ZMIEŃ TRYB"
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const ChangeUserStackNav = createStackNavigator(screens);

export default ChangeUserStackNav;
