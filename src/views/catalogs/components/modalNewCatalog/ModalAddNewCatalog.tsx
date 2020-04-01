import * as React from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useStoreState, useStoreActions} from '../../../../easyPeasy/hooks';
import {TextInput} from 'react-native-gesture-handler';
import {globalStyles} from '../../../../common/styles/globalStyles';
import {inputData} from '../../../../staticData/staticData';
import {useState} from 'react';
import {ADD_CATALOG} from '../../../../apollo/mutations/mutations';
import {useMutation} from '@apollo/react-hooks';

const {width: vw} = Dimensions.get('window');

const ModalAddNewCatalog = () => {
  const {placeholderTextGrayColor} = inputData;

  const {toggleIsAddNewCatalogModalVisible} = useStoreActions(
    actions => actions.CatalogsModel,
  );
  const {isAddNewCatalogModalVisible} = useStoreState(
    state => state.CatalogsModel,
  );
  const [newCatalogName, setNewCatalogName] = useState('');

  const [addCatalog] = useMutation(ADD_CATALOG, {
    onError: error => {
      console.log(error);
    },
    onCompleted: data => {
      console.log(data.addCatalog, 'dodano katalog');
      //add to catalogs state//
    },
  });

  const handleCancelPress = () => {
    toggleIsAddNewCatalogModalVisible(false);
    setNewCatalogName('');
  };

  const handleOkPress = async (albumName: string) => {
    if (albumName.length > 1) {
      try {
        await addCatalog({variables: {name: albumName}});
        toggleIsAddNewCatalogModalVisible(false);
      } catch {
        throw new Error();
      }
    }
  };
  return (
    <View>
      <Modal
        isVisible={isAddNewCatalogModalVisible}
        backdropOpacity={0.3}
        animationIn="slideInLeft"
        animationOut="slideOutRight">
        <View style={{flex: 1}}>
          <View style={styles.modalWrapper}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>
                Wprowadź nazwę nowego katalogu
              </Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                keyboardType="email-address"
                style={[globalStyles.input, styles.input]}
                placeholder="Wprowadź nazwę"
                placeholderTextColor={placeholderTextGrayColor}
                onChangeText={text => setNewCatalogName(text)}
                value={newCatalogName}
              />
            </View>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity onPress={handleCancelPress}>
                <Text style={[styles.buttonText, styles.buttonOne]}>
                  ANULUJ
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleOkPress(newCatalogName)}>
                <Text style={[styles.buttonText, styles.buttonTwo]}>OK</Text>
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

export default ModalAddNewCatalog;
