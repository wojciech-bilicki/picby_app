import {
  createStackNavigator,
  NavigationStackProp,
} from 'react-navigation-stack';
import VoiceRecordsScreen from './VioceRecordsScreen';
import Header from '../../navigation/Header';
import React from 'react';
import {DrawerActions} from 'react-navigation-drawer';

type nav = NavigationStackProp;

const screens = {
  Welcome: {
    screen: VoiceRecordsScreen,
    navigationOptions: ({navigation}: {navigation: nav}) => {
      return {
        header: () => (
          <Header
            title="NAGRANIA GŁOSOWE"
            openMenu={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        ),
      };
    },
  },
};
const VoiceRecordsStackNav = createStackNavigator(screens);

export default VoiceRecordsStackNav;
