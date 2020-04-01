import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {catalogsData, commonColors} from '../../staticData/staticData';
import {globalStyles} from '../../common/styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useStoreState} from '../../easyPeasy/hooks';

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
      {userCatalogsArray.map((element: {name: string; id: string}) => {
        return (
          <View key={element.id}>
            <Text>{element.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CatalogsView;
