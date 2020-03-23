import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import IntroductionSceneStack from '../views/intruduction/introductionScene';
import AuthStackNav from '../views/auth/AuthStackNav';
import {ParentDrawer, ChildDrawer} from './MenuDrawers';

const switchContainer = createSwitchNavigator(
  {
    Intro: IntroductionSceneStack,
    Auth: AuthStackNav,
    ParentDashboard: ParentDrawer,
    ChildDashboard: ChildDrawer,
  },
  {
    initialRouteName: 'Intro',
  },
);

export default createAppContainer(switchContainer);
