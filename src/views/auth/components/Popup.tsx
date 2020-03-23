import * as React from 'react';
import {Animated, Text, Dimensions, StyleSheet} from 'react-native';

const {width: vw, height: vh} = Dimensions.get('window');

interface Props {
  fadeAnim: Animated.Value;
  popUpText: string;
}

const PopUp: React.FC<Props> = props => {
  const {popUpText, fadeAnim} = props;
  return (
    <Animated.View
      style={[styles.popUp, {transform: [{translateX: fadeAnim}]}]}>
      <Text style={styles.popUpText}>{popUpText}</Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  popUp: {
    backgroundColor: '#074782',
    color: 'white',
    width: 0.95 * vw,
    paddingHorizontal: 0.0312 * vw,
    paddingVertical: 0.02 * vw,
    position: 'absolute',
    top: 0.84 * vh,
    borderRadius: 2,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    minHeight: 0.15 * vw,
  },
  popUpText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    letterSpacing: 0.5,
  },
});
export default PopUp;
