import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import IntroductionSceneStack from '../views/intruduction/introductionScene';
import AuthStackNav from '../views/auth/AuthStackNav';
import {ParentDrawer, ChildDrawer} from './MenuDrawers';
import LoadingScreen from '../views/loading/LoadingScreen';

const switchContainer = createSwitchNavigator({
  Loading: {
    screen: LoadingScreen,
  },
  Intro: {
    screen: IntroductionSceneStack,
  },
  Auth: {
    screen: AuthStackNav,
    path: '',
  },
  ParentDashboard: {
    screen: ParentDrawer,
  },
  ChildDashboard: {
    screen: ChildDrawer,
  },
});

export default createAppContainer(switchContainer);
