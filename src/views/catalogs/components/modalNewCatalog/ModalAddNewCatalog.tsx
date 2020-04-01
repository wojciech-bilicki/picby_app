import * as React from 'react';
import Modal from 'react-native-modal';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useStoreState, useStoreActions} from '../../../../easyPeasy/hooks';

const ModalAddNewCatalog = () => {
  const {toggleIsAddNewCatalogModalVisible} = useStoreActions(
    actions => actions.CatalogsModel,
  );
  const {isAddNewCatalogModalVisible} = useStoreState(
    state => state.CatalogsModel,
  );
  return (
    <View>
      <Modal isVisible={isAddNewCatalogModalVisible} backdropOpacity={0.3}>
        <View style={{flex: 1}}>
          <Text>I am the modal content!</Text>
          <Button
            title="closeModal"
            onPress={() => toggleIsAddNewCatalogModalVisible(false)}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModalAddNewCatalog;
