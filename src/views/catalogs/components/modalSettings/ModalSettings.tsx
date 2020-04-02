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
const {width: vw, height: vh} = Dimensions.get('window');

const ModalSettings = () => {
  const {placeholderTextGrayColor} = inputData;

  const {toggleIsSettingsModalOpen} = useStoreActions(
    actions => actions.CatalogsModel,
  );
  const {isSettingsModalOpen} = useStoreState(state => state.CatalogsModel);

  const handleCancelPress = () => {
    toggleIsSettingsModalOpen(false);
  };

  return (
    <View>
      <Modal
        isVisible={isSettingsModalOpen}
        backdropOpacity={0.3}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <TouchableOpacity style={styles.modalWrapper}>
          <View>
            <TouchableWithoutFeedback style={styles.buttonsWrapper}>
              <Text>Elo</Text>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    borderWidth: 2,
    backgroundColor: 'white',
  },
  buttonsWrapper: {
    height: 0.15 * vw,
    backgroundColor: '#e1e9f0',
    borderWidth: 0.25,
    borderColor: '#074782',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: 'rgba(7, 71, 130, 0.9)',
    letterSpacing: 0.9,
  },
  buttonOne: {
    marginRight: 0.143 * vw,
  },
  buttonTwo: {
    marginRight: 0.0843 * vw,
    fontWeight: 'bold',
  },
});

export default ModalSettings;
