import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {globalStyles} from '../../common/styles/globalStyles';
import {useStoreActions, useStoreState} from '../../easyPeasy/hooks';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {CATALOGS_QUERY} from '../../apollo/queries/queries';
import CatalogEmptyScreen from './CatalogsEmptyView';
import CatalogsView from './CatalogsView';
import CatalogsRecordsModal from '../../common/components/CatalogsRecordsModal';
import {ADD_CATALOG} from '../../apollo/mutations/mutations';

const CatalogsScreen: React.FC = props => {
  const {
    setUserCatalogs,
    toggleIsAddNewCatalogModalVisible,
    setNewAlbumName,
  } = useStoreActions(actions => actions.CatalogsModel);
  const {
    userCatalogs,
    isAddNewCatalogModalVisible,
    newAlbumName,
  } = useStoreState(state => state.CatalogsModel);

  const handleAddNewCatalog = async () => {
    if (newAlbumName.length > 1) {
      try {
        await addCatalog({variables: {name: newAlbumName}});
        setNewAlbumName('');
        toggleIsAddNewCatalogModalVisible(false);
      } catch {
        throw new Error();
      }
    }
  };
  const handleCancelAddNewCatalog = async () => {
    await setNewAlbumName('');
    toggleIsAddNewCatalogModalVisible(false);
  };

  const [addCatalog] = useMutation(ADD_CATALOG, {
    onError: error => {
      console.log(error);
    },
    onCompleted: data => {
      console.log(data.addCatalog, 'dodano katalog');
      const newCatalog = data.addCatalog;
      setUserCatalogs([...userCatalogs, newCatalog]);
    },
  });
  const {error, loading} = useQuery(CATALOGS_QUERY, {
    onError: () => {
      console.log(error);
    },
    onCompleted: data => {
      console.log(data);
      const catalogs = data.catalogs;
      setUserCatalogs(catalogs);
    },
  });

  return (
    <View style={[globalStyles.screenWrapper]}>
      <CatalogsRecordsModal
        isModalVisible={isAddNewCatalogModalVisible}
        setIsModalVisible={toggleIsAddNewCatalogModalVisible}
        submitFunction={handleAddNewCatalog}
        cancelFunction={handleCancelAddNewCatalog}
        headerText={'Wprowadź nazwę nowego albumu'}
        inputValue={newAlbumName}
        setInputValue={setNewAlbumName}
        isTextInputVisible={true}
        submitText={'OK'}
      />
      {loading ? (
        <ActivityIndicator size={120} />
      ) : userCatalogs.length ? (
        <CatalogsView />
      ) : (
        <CatalogEmptyScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CatalogsScreen;
