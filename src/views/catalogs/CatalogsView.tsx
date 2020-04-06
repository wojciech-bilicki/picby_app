import React, {ReactNode, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {catalogsData, commonColors} from '../../staticData/staticData';
import {globalStyles} from '../../common/styles/globalStyles';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {useStoreState, useStoreActions} from '../../easyPeasy/hooks';
import CatalogTile from './components/catalogTile/CatalogTile';
import ModalSettings from './components/modalSettings/ModalSettings';
import PlusButton from './components/plusButton/PlusButton';
import CatalogsRecordsModal from '../../common/components/CatalogsRecordsModal';
import {useMutation} from '@apollo/react-hooks';
import {REMOVE_CATALOG} from '../../apollo/mutations/mutations';

const {width: vw, height: vh} = Dimensions.get('window');

interface userCatalogs {
  id: string;
  name: string;
}

const CatalogsView: React.FC = props => {
  const {userCatalogs, isDeleteModalOpen, settingsCatalogId} = useStoreState(
    state => state.CatalogsModel,
  );
  const {
    setIsDeleteModalOpen,
    setUserCatalogs,
    setSettingsCatalogId,
  } = useStoreActions(actions => actions.CatalogsModel);

  const [deleteCatalog] = useMutation(REMOVE_CATALOG, {
    onError: () => {
      throw new Error();
    },
    onCompleted: () => {
      console.log('usunięto');
      const userCatalogsAfterDelete = userCatalogs.filter(catalog => {
        return catalog.id !== settingsCatalogId;
      });
      setUserCatalogs([...userCatalogsAfterDelete]);
      setSettingsCatalogId(undefined);
      setIsDeleteModalOpen(false);
    },
  });

  const handleCloseDeleteModal = () => {
    setSettingsCatalogId(undefined);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCatalog = async () => {
    try {
      await deleteCatalog({variables: {id: settingsCatalogId}});
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={[globalStyles.screenWrapper]}>
      <ScrollView style={styles.listWrapper}>
        {(userCatalogs as Array<userCatalogs>).map(element => {
          return (
            <CatalogTile
              name={element.name}
              id={element.id}
              key={Math.random()}
            />
          );
        })}
      </ScrollView>
      <PlusButton />
      <ModalSettings />
      <CatalogsRecordsModal
        isModalVisible={isDeleteModalOpen}
        setIsModalVisible={setIsDeleteModalOpen}
        submitFunction={handleDeleteCatalog}
        cancelFunction={handleCloseDeleteModal}
        contentText={'Czy na pewno chcesz usunąć ten katalog?'}
        headerText={'Usuń katalog'}
        isTextInputVisible={false}
        submitText={'USUŃ'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    width: vw,
    maxHeight: 0.7 * vh,
  },
});

export default CatalogsView;
