import {Dimensions, Animated} from 'react-native';
import {useState, useContext} from 'react';
import {AuthContext} from '../authContext';

const {width: vw} = Dimensions.get('window');

export const useHandlePopupAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(-1 * vw));
  const HIDE_VALUE = -1;
  const SHOW_VALUE = 0;
  const ANIMATION_DURATION = 300;
  const ANIMATION_SHORT_DELAY = 300;
  const ANIMATION_LONG_DELAY = 4000;
  const {
    loginContextData: {setAreButtonsDisabled},
    registerContextData: {setAreRegisterButtonsDisabled},
  } = useContext(AuthContext);

  const handlePopUpAnimation = (redirectFunction?: () => void | undefined) => {
    const functionFiredAfterAnimationEnds = () => {
      setAreButtonsDisabled(false);
      setAreRegisterButtonsDisabled(false);
      redirectFunction && redirectFunction();
    };

    const animate = (value: number, callback: void) =>
      Animated.timing(fadeAnim, {
        toValue: value * vw,
        duration: ANIMATION_DURATION,
      }).start(() => callback);

    setTimeout(() => animate(SHOW_VALUE, undefined), ANIMATION_SHORT_DELAY);
    setTimeout(
      () => animate(HIDE_VALUE, functionFiredAfterAnimationEnds()),
      ANIMATION_LONG_DELAY,
    );
  };

  return {
    handlePopUpAnimation,
    fadeAnim,
  };
};
