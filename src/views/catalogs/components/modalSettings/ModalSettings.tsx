import * as React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useStoreState, useStoreActions} from '../../../../easyPeasy/hooks';

import {inputData} from '../../../../staticData/staticData';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {useEffect} from 'react';
const {width: vw, height: vh} = Dimensions.get('window');

interface PropsTypes {
  touchCoordinates: number;
}
const ModalSettings = () => {
  const {placeholderTextGrayColor} = inputData;

  const {toggleIsSettingsModalOpen} = useStoreActions(
    actions => actions.CatalogsModel,
  );
  const {isSettingsModalOpen} = useStoreState(state => state.CatalogsModel);

  const handleCancelPress = () => {
    toggleIsSettingsModalOpen(false);
  };
  const handleEditPress = () => {
    console.log('click edit');
  };
  const handleDeletePress = () => {
    console.log('click delete');
  };

  useEffect(() => {
    return () => {
      handleCancelPress();
    };
  }, []);
  return (
    <Modal
      isVisible={isSettingsModalOpen}
      backdropOpacity={0.1}
      animationIn="fadeIn"
      animationOut="fadeOut">
      <TouchableOpacity onPress={handleCancelPress}>
        <View style={styles.wrapper}>
          <View style={[styles.buttonsWrapper]}>
            <TouchableOpacity
              onPress={handleEditPress}
              style={[
                styles.button,
                {borderBottomWidth: 0.25, borderColor: '#074782'},
              ]}>
              <Text style={[styles.buttonText]}>Edytuj</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDeletePress} style={styles.button}>
              <Text style={[styles.buttonText]}>Usuń</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
  },
  buttonsWrapper: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    width: 0.425 * vw,
    borderWidth: 0.25,
    borderColor: '#074782',
    borderRadius: 2,
  },
  button: {
    paddingTop: 0.0437 * vw,
    paddingLeft: 0.05625 * vw,
    paddingBottom: 0.0437 * vw,
  },
  buttonText: {
    color: 'rgba(7, 71, 130, 0.9)',
  },
});

export default ModalSettings;
