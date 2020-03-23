import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import CatalogsScreen from './CatalogsScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  Welcome: {
    screen: CatalogsScreen,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="KATALOGI"
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const CatalogsStackNav = createStackNavigator(screens);

export default CatalogsStackNav;
