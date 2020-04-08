import {useMutation, useQuery} from '@apollo/react-hooks';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {ADD_CATALOG} from '../../apollo/mutations/mutations';
import {CATALOGS_QUERY} from '../../apollo/queries/queries';
import CatalogsRecordsModal from '../../common/components/CatalogsRecordsModal';
import {globalStyles} from '../../common/styles/globalStyles';
import {useStoreActions, useStoreState} from '../../easyPeasy/hooks';
import CatalogsView, {userCatalog} from './views/CatalogsView';
import NoEntriesView, {logoVariants} from './views/NoEntriesView';
import {catalogsData} from '../../staticData/staticData';

export const sortCatalogsAlphabetically = (userCatalogs: userCatalog[]) => {
  userCatalogs.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
};

const CatalogsScreen: React.FC = props => {
  const {
    setUserCatalogs,
    toggleIsAddNewCatalogModalVisible,
    setNewAlbumName,
    setNumberOfUserCatalogs,
  } = useStoreActions(actions => actions.CatalogsModel);

  const {
    userCatalogs,
    isAddNewCatalogModalVisible,
    newAlbumName,
    numberOfUserCatalogs,
  } = useStoreState(state => state.CatalogsModel);

  const [addCatalog] = useMutation(ADD_CATALOG, {
    onError: () => {
      throw new Error();
    },
    onCompleted: data => {
      const newCatalog = data.addCatalog;
      setUserCatalogs([...userCatalogs!, newCatalog]);
    },
  });

  const {error, loading} = useQuery(CATALOGS_QUERY, {
    onError: () => {
      console.log(error);
    },
    onCompleted: async data => {
      const catalogs = data.catalogs;
      await setNumberOfUserCatalogs(catalogs.length);
      await sortCatalogsAlphabetically(catalogs);
      await setUserCatalogs(catalogs);
    },
  });

  const handleAddNewCatalog = async () => {
    if (newAlbumName.length > 1) {
      try {
        await addCatalog({variables: {name: newAlbumName}});
        await setNumberOfUserCatalogs(userCatalogs!.length + 1);
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

  const {title, subtitle} = catalogsData;

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
      {!userCatalogs ? (
        <ActivityIndicator
          size={60}
          style={{marginTop: 60}}
          color={'#3180AE'}
        />
      ) : numberOfUserCatalogs > 0 ? (
        <CatalogsView />
      ) : (
        <NoEntriesView
          plusButtonHandler={() => toggleIsAddNewCatalogModalVisible(true)}
          title={title}
          subtitle={subtitle}
          logoVariant={logoVariants.NoCatalogsIcon}
        />
      )}
    </View>
  );
};

export default CatalogsScreen;
