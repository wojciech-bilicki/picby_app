import {Dimensions, Animated} from 'react-native';
import {useState} from 'react';

export const ENABLE_BUTTONS_DELAY_TIME = 4600;

const {width: vw} = Dimensions.get('window');
const HIDE_VALUE = -1;
const SHOW_VALUE = 0;
const ANIMATION_DURATION = 300;
const ANIMATION_SHORT_DELAY = 300;
const ANIMATION_LONG_DELAY = 4000;

export const useHandlePopupAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(-1 * vw));

  const handlePopUpAnimation = (redirectFunction?: () => void | undefined) => {
    const functionFiredAfterAnimationEnds = () => {
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
