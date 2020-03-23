import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import WelcomeDashboard from './DashboardScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  Welcome: {
    screen: WelcomeDashboard,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="PICBY"
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const DashboardStackNav = createStackNavigator(screens);

export default DashboardStackNav;
