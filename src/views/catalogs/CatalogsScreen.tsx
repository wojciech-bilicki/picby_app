import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ManWithBoxLogo from './icons/man.svg';
import {catalogsData, commonColors} from '../../staticData/staticData';
import {globalStyles} from '../../common/styles/globalStyles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PlusIcon from '../../common/icons/plus.svg';

const {darkRed, lightBlue, orangeRed} = commonColors;
const {width: vw} = Dimensions.get('window');

const CatalogsScreen: React.FC = props => {
  const {title, subtitle} = catalogsData;

  return (
    <View style={[globalStyles.screenWrapper]}>
      <ManWithBoxLogo style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.plusIconView}>
        <TouchableOpacity
          style={styles.plusIconWrapper}
          onPress={() => {
            console.log('siema heniu');
          }}>
          <PlusIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    marginTop: 0.15 * vw,
    minWidth: 0.625 * vw,
    minHeight: 0.487 * vw,
  },
  title: {
    color: darkRed,
    fontSize: 0.056 * vw,
    fontWeight: 'bold',
    marginTop: 0.118 * vw,
  },
  subtitle: {
    color: lightBlue,
    textAlign: 'center',
    fontSize: 0.045 * vw,
    marginTop: 0.118 * vw,
    lineHeight: 25,
  },
  plusIconWrapper: {
    minHeight: 0.175 * vw,
    minWidth: 0.175 * vw,
    maxHeight: 0.175 * vw,
    maxWidth: 0.175 * vw,
    borderRadius: 0.0875 * vw,
    backgroundColor: orangeRed,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 8,
      height: 10,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 10,
  },
  plusIcon: {
    maxHeight: 0.175 * vw,
    maxWidth: 0.175 * vw,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  plusIconView: {
    width: vw,
    alignItems: 'flex-end',
    paddingRight: 0.0625 * vw,
    marginTop: 0.076 * vw,
  },
});

export default CatalogsScreen;
