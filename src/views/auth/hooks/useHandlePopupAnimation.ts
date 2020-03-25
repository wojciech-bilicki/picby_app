import {Dimensions, Animated} from 'react-native';
import {useState} from 'react';

const {width: vw} = Dimensions.get('window');

export const ENABLE_BUTTONS_DELAY_TIME = 4600;

export const useHandlePopupAnimation = () => {
  const [fadeAnim] = useState(new Animated.Value(-1 * vw));
  const HIDE_VALUE = -1;
  const SHOW_VALUE = 0;
  const ANIMATION_DURATION = 300;
  const ANIMATION_SHORT_DELAY = 300;
  const ANIMATION_LONG_DELAY = 4000;

  const handlePopUpAnimation = (redirectFunction?: () => void | undefined) => {
    console.log('animacja odpalona');
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
