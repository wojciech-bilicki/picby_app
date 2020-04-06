import React, {ReactNode, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {catalogsData, commonColors} from '../../staticData/staticData';
import {globalStyles} from '../../common/styles/globalStyles';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {useStoreState} from '../../easyPeasy/hooks';
import CatalogTile from './components/catalogTile/CatalogTile';
import ModalSettings from './components/modalSettings/ModalSettings';
import PlusButton from './components/plusButton/PlusButton';

const {width: vw, height: vh} = Dimensions.get('window');

interface userCatalogs {
  id: string;
  name: string;
}

const CatalogsView: React.FC = props => {
  const {userCatalogs} = useStoreState(state => state.CatalogsModel);

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
