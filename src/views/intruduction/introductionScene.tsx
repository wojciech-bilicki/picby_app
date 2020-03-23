import React from 'react';
import {View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Introduction from './introductionSingleView';
import CustomBottomTab from './customBottomTab';
import {NavigationStackProp} from 'react-navigation-stack';
import {introductionTextContent} from '../../staticData/staticData';
import {useStoreState} from '../../easyPeasy/hooks';

type Props = {
  navigation: NavigationStackProp;
  contentText?: string;
  headerText?: string;
};

const firstView: React.FC<Props> = ({navigation}) => {
  const {firstScreenContentText, firstScreenTitle} = introductionTextContent;
  return (
    <View>
      <Introduction
        navigation={navigation}
        headerText={firstScreenTitle}
        contentText={firstScreenContentText}
      />
    </View>
  );
};
const secondView: React.FC<Props> = ({navigation}) => {
  const {secondScreenContentText, secondScreenTitle} = introductionTextContent;
  return (
    <View>
      <Introduction
        navigation={navigation}
        headerText={secondScreenTitle}
        contentText={secondScreenContentText}
      />
    </View>
  );
};
const thirdView: React.FC<Props> = ({navigation}) => {
  const {activeScreenNumber} = useStoreState(state => state.IntroductionModel);
  const {thirdScreenTitle} = introductionTextContent;

  return (
    <View>
      <Introduction
        navigation={navigation}
        headerText={thirdScreenTitle}
        activeScreenNumber={activeScreenNumber}
      />
    </View>
  );
};

const IntroductionSceneStack = createBottomTabNavigator(
  {
    first: firstView,
    second: secondView,
    third: thirdView,
  },
  {
    tabBarComponent: props => <CustomBottomTab {...props} />,
  },
);

export default IntroductionSceneStack;
