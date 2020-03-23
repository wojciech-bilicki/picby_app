import React, {useContext, ReactNode} from 'react';
import {StyleSheet, View, TouchableOpacity, Dimensions} from 'react-native';
import ClosedEye from './images/eyeClosed.svg';
import OpenEye from './images/eyeOpen.svg';
import {IntroductionContext} from './introductionContext';
import {NavigationStackProp} from 'react-navigation-stack';

let {width: vw} = Dimensions.get('window');

interface EyeComponentProps {
  screenOrder: string;
  screenNumber: number;
}
type Props = {
  navigation: NavigationStackProp;
};
const CustomBottomTab: React.FC<Props> = ({navigation: {navigate}}) => {
  const {activeScreenNumber, setActiveScreenNumber} = useContext(
    IntroductionContext,
  );

  const EyeComponent: React.FC<EyeComponentProps> = ({
    screenNumber,
    screenOrder,
  }) => {
    const navigateToOtherScreen = () => {
      navigate(screenOrder);
      setActiveScreenNumber(screenNumber);
    };
    return (
      <TouchableOpacity onPress={navigateToOtherScreen}>
        {activeScreenNumber === screenNumber ? (
          <OpenEye style={styles.eyeIcon} />
        ) : (
          <ClosedEye style={styles.eyeIcon} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.eyesWrapper}>
      <EyeComponent screenOrder={'first'} screenNumber={1} />
      <EyeComponent screenOrder={'second'} screenNumber={2} />
      <EyeComponent screenOrder={'third'} screenNumber={3} />
    </View>
  );
};

const styles = StyleSheet.create({
  eyesWrapper: {
    marginTop: vw * 0.07,
    minHeight: 40,
    width: vw * 0.625,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: vw * 0.07,
  },
  eyeIcon: {
    minWidth: vw * 0.09,
    minHeight: vw * 0.09,
    resizeMode: 'contain',
  },
});

export default CustomBottomTab;
