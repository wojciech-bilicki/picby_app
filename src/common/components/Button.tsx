import React from 'react';
import {StyleSheet, TouchableOpacity, Text, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GoogleIcon from '../../views/auth/icons/googleIcon.svg';
import {buttonsData} from '../../staticData/staticData';

let {width: vw} = Dimensions.get('window');

interface ButtonProps {
  onPress: () => void;
  colorVariantIndex: number;
  textColor: object;
  textValue: string;
  icon?: boolean;
  disabled?: boolean;
  googleButton?: boolean;
}

const FlatButton: React.FC<ButtonProps> = props => {
  const {
    textValue,
    onPress,
    colorVariantIndex,
    textColor,
    icon = false,
    disabled = false,
    googleButton = false,
  } = props;

  const {backgroundColorVariants} = buttonsData;

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <LinearGradient
        useAngle={true}
        angle={33}
        start={{x: -0.13, y: 0}}
        end={{x: 0.7, y: 0}}
        colors={backgroundColorVariants[colorVariantIndex]}
        style={
          disabled
            ? [styles.linearGradient, {opacity: 0.5}]
            : googleButton
            ? [styles.linearGradient, styles.googleButton]
            : [styles.linearGradient]
        }>
        {icon && <GoogleIcon style={styles.icon} />}
        <Text style={[styles.buttonText, textColor]}>{textValue}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    opacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderRadius: 2,
    minHeight: 0.125 * vw,
    maxHeight: 0.125 * vw,
    minWidth: 0.8 * vw,
    maxWidth: 0.8 * vw,
  },
  googleButton: {
    borderWidth: 2,
    borderColor: 'rgba(49, 128, 174, 0.1)',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    elevation: 1,
    shadowOpacity: 0.12,
  },
  buttonText: {
    fontSize: 0.043 * vw,
    lineHeight: 20,
    letterSpacing: 0.7,
    fontFamily: 'OpenSans-Bold',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  icon: {
    minWidth: 0.075 * vw,
    minHeight: 0.075 * vw,
    marginRight: 0.0312 * vw,
  },
});

export default FlatButton;
