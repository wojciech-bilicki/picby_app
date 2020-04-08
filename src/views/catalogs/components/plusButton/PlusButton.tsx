import * as React from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, View} from 'react-native';
import {commonColors} from '../../../../staticData/staticData';
import PlusIcon from '../../../../common/icons/plus.svg';

const {orangeRed} = commonColors;
const {width: vw} = Dimensions.get('window');

interface ButtonProps {
  onPressHandler: any;
}

const PlusButton = (props: ButtonProps) => {
  const {onPressHandler} = props;

  return (
    <View style={styles.plusIconView}>
      <TouchableOpacity style={styles.plusIconWrapper} onPress={onPressHandler}>
        <PlusIcon />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  plusIconWrapper: {
    minHeight: 0.175 * vw,
    minWidth: 0.175 * vw,
    maxHeight: 0.175 * vw,
    maxWidth: 0.175 * vw,
    borderRadius: 0.0875 * vw,
    backgroundColor: orangeRed,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 8,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  plusIconView: {
    width: vw,
    alignItems: 'flex-end',
    paddingRight: 0.0625 * vw,
    marginTop: 0.05 * vw,
  },
});

export default PlusButton;
