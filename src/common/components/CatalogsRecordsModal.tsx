import * as React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {globalStyles} from '../styles/globalStyles';
import {inputData} from '../../staticData/staticData';

const {width: vw} = Dimensions.get('window');

interface ModalPropsTypes {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  submitFunction: () => any;
  cancelFunction: () => any;
  headerText: string;
  contentText?: string;
  inputValue?: string;
  setInputValue?: (inputValue: string) => void;
  isTextInputVisible: boolean;
  submitText: string;
}

const CatalogsRecordsModal = (props: ModalPropsTypes) => {
  const {placeholderTextGrayColor} = inputData;
  const {
    isModalVisible,
    submitFunction,
    cancelFunction,
    headerText,
    contentText,
    inputValue,
    setInputValue,
    isTextInputVisible,
    submitText,
  } = props;

  return (
    <View>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.3}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <View style={{flex: 1}}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>{headerText}</Text>
            </View>
            <View style={styles.inputWrapper}>
              {isTextInputVisible ? (
                <TextInput
                  keyboardType="email-address"
                  style={[globalStyles.input, styles.input]}
                  placeholder="Wprowadź nazwę"
                  placeholderTextColor={placeholderTextGrayColor}
                  onChangeText={text => setInputValue && setInputValue(text)}
                  value={inputValue}
                />
              ) : (
                <Text>{contentText}</Text>
              )}
            </View>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity onPress={() => cancelFunction()}>
                <Text style={[styles.buttonText, styles.buttonOne]}>
                  ANULUJ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => submitFunction()}>
                <Text style={[styles.buttonText, styles.buttonTwo]}>
                  {submitText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    width: '100%',
  },
  modalHeader: {
    backgroundColor: '#074782',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 18,
    paddingBottom: 18,
  },
  inputWrapper: {
    height: 0.29 * vw,
    backgroundColor: 'white',
    borderWidth: 0.25,
    borderColor: '#074782',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 0.043 * vw,
  },
  input: {
    paddingLeft: 5,
    fontSize: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(231, 47, 47, 0.7)',
  },
  buttonsWrapper: {
    height: 0.15 * vw,
    backgroundColor: '#e1e9f0',
    borderWidth: 0.25,
    borderColor: '#074782',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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

export default CatalogsRecordsModal;
