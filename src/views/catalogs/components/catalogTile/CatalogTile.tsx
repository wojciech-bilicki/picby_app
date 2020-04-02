import React, {Fragment} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ThreeDots from '../../../../common/icons/settingsThreeDots';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface TileProps {
  name: string;
  id: string;
}

const {width: vw} = Dimensions.get('window');

const CatalogTile = ({name, id}: TileProps) => {
  const catalogId = id;
  return (
    <View style={styles.tileWrapper}>
      <TouchableOpacity style={styles.catalogTouchArea}>
        <Text style={styles.tileText}>{name}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingsTouchArea}>
        <View style={styles.numberAndSettings}>
          <Text style={styles.numberOfPhotos}>16</Text>
          <ThreeDots />
        </View>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  tileWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 0.15 * vw,
    borderBottomColor: '#074782',
    borderBottomWidth: 0.25,
    paddingLeft: 0.05 * vw,
    paddingRight: 0.05 * vw,
  },
  tileText: {
    color: 'rgba(7, 71, 130, 0.9)',
  },
  numberAndSettings: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingRight: 0,
  },
  numberOfPhotos: {
    color: 'rgba(7, 71, 130, 0.9)',
    marginRight: 0.06 * vw,
  },
  catalogTouchArea: {
    minWidth: '85%',
    paddingTop: 0.031 * vw,
    paddingBottom: 0.031 * vw,
  },
});

export default CatalogTile;
