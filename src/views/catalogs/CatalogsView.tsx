import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {catalogsData, commonColors} from '../../staticData/staticData';
import {globalStyles} from '../../common/styles/globalStyles';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {useStoreState} from '../../easyPeasy/hooks';
import CatalogTile from './components/catalogTile/CatalogTile';
import ModalSettings from './components/modalSettings/ModalSettings';

const {width: vw} = Dimensions.get('window');

interface userCatalogs {
  [index: number]: {id: string; name: string};
  map: Function;
}
const CatalogsView: React.FC = props => {
  const {userCatalogs} = useStoreState(state => state.CatalogsModel);
  let userCatalogsArray: userCatalogs = userCatalogs;
  return (
    <View style={[globalStyles.screenWrapper]}>
      <ScrollView style={styles.listWrapper}>
        {/* <ModalSettings />  przerasta mnie to dzis */}
        {userCatalogsArray.map((element: {name: string; id: string}) => {
          return (
            <CatalogTile
              name={element.name}
              id={element.id}
              key={Math.random()}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    width: vw,
  },
});

export default CatalogsView;
