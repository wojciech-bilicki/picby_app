import { useMutation } from '@apollo/react-hooks';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { REMOVE_CATALOG, UPDATE_CATALOG } from '../../../apollo/mutations/mutations';
import CatalogsRecordsModal from '../../../common/components/CatalogsRecordsModal';
import { globalStyles } from '../../../common/styles/globalStyles';
import { useStoreActions, useStoreState } from '../../../easyPeasy/hooks';
import { sortCatalogsAlphabetically } from '../catalogs.utils';
import CatalogTile from '../components/catalogTile/CatalogTile';
import ModalSettings from '../components/modalSettings/ModalSettings';
import PlusButton from '../components/plusButton/PlusButton';

const {width: vw, height: vh} = Dimensions.get('window');

export interface userCatalog {
  id: string;
  name: string;
}

const CatalogsView: React.FC = props => {
  const {
    userCatalogs,
    isDeleteModalOpen,
    settingsCatalogId,
    isEditModalOpen,
    updateNameValue,
  } = useStoreState(state => state.CatalogsModel);
  const {
    setIsDeleteModalOpen,
    setUserCatalogs,
    setSettingsCatalogId,
    setIsEditModalOpen,
    setUpdateNameValue,
    toggleIsAddNewCatalogModalVisible,
    setNumberOfUserCatalogs,
  } = useStoreActions(actions => actions.CatalogsModel);

  const [deleteCatalog] = useMutation(REMOVE_CATALOG, {
    onError: () => {
      throw new Error();
    },
    onCompleted: () => {
      const userCatalogsAfterDelete = userCatalogs!.filter(catalog => {
        return catalog.id !== settingsCatalogId;
      });
      setUserCatalogs([...userCatalogsAfterDelete]);
      setNumberOfUserCatalogs(userCatalogsAfterDelete.length);
      setSettingsCatalogId(undefined);
      setIsDeleteModalOpen(false);
    },
  });

  const [updateCatalog] = useMutation(UPDATE_CATALOG, {
    onError: error => {
      console.log(error);
    },
    onCompleted: async data => {
      const updatedCatalog = data.updateCatalog;
      const omitOldCatalog = userCatalogs!.filter(
        catalog => catalog.id !== updatedCatalog.id,
      );
      await setUserCatalogs([...omitOldCatalog, updatedCatalog]);
      handleCloseEditModal();
    },
  });

  const handleCloseEditModal = () => {
    setSettingsCatalogId(undefined);
    setUpdateNameValue('');
    setIsEditModalOpen(false);
  };

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

  const handleChangeCatalogName = async () => {
    try {
      await updateCatalog({
        variables: {name: updateNameValue, id: settingsCatalogId},
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    sortCatalogsAlphabetically(userCatalogs!);
  }, [userCatalogs]);

  return (
    <View style={[globalStyles.screenWrapper]}>
      <ScrollView style={styles.listWrapper}>
        {(userCatalogs as Array<userCatalog>).map(element => {
          return (
            <CatalogTile
              name={element.name}
              id={element.id}
              key={Math.random()}
            />
          );
        })}
      </ScrollView>
      <PlusButton
        onPressHandler={() => toggleIsAddNewCatalogModalVisible(true)}
      />
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
      <CatalogsRecordsModal
        isModalVisible={isEditModalOpen}
        setIsModalVisible={setIsEditModalOpen}
        submitFunction={handleChangeCatalogName}
        cancelFunction={handleCloseEditModal}
        headerText={'Zmień nazwę katalogu'}
        isTextInputVisible={true}
        submitText={'OK'}
        inputValue={updateNameValue}
        setInputValue={setUpdateNameValue}
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
