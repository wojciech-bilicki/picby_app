import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import {globalStyles} from '../../common/styles/globalStyles';
import {useStoreActions, useStoreState} from '../../easyPeasy/hooks';
import {useQuery} from '@apollo/react-hooks';
import {CATALOGS_QUERY} from '../../apollo/queries/queries';
import CatalogEmptyScreen from './CatalogsEmptyView';

const CatalogsScreen: React.FC = props => {
  const {setUserCatalogs} = useStoreActions(actions => actions.CatalogsModel);
  const {userCatalogs} = useStoreState(state => state.CatalogsModel);

  const {error, loading} = useQuery(CATALOGS_QUERY, {
    onError: () => {
      console.log(error);
    },
    onCompleted: data => {
      console.log(data);
      //set catalogs data state
      const catalogs = data.catalogs;
      setUserCatalogs(catalogs);
    },
  });

  return (
    <View style={[globalStyles.screenWrapper]}>
      {loading ? (
        <ActivityIndicator size={120} />
      ) : userCatalogs == [] ? (
        <CatalogEmptyScreen />
      ) : (
        <View>
          <Text>yolo</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CatalogsScreen;
