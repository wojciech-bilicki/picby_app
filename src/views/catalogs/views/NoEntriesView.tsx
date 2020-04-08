import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import ManWithBoxLogo from '../icons/man.svg';
import NoPhotosIcon from '../icons/NoPhotosIcon.svg';
import {commonColors} from '../../../staticData/staticData';
import {globalStyles} from '../../../common/styles/globalStyles';
import PlusButton from '../components/plusButton/PlusButton';
import {ActionCreator} from 'easy-peasy';
const {darkRed, lightBlue} = commonColors;
const {width: vw} = Dimensions.get('window');

interface EmptyScreen {
  plusButtonHandler: (payload: boolean) => void;
  title: string;
  subtitle: string;
  logoVariant: logoVariants;
}

export enum logoVariants {
  NoPhotosIcon,
  NoCatalogsIcon,
}
const NoEntriesView = (props: EmptyScreen) => {
  const {plusButtonHandler, title, subtitle, logoVariant} = props;
  return (
    <View style={[globalStyles.screenWrapper]}>
      {logoVariant == logoVariants.NoPhotosIcon ? (
        <NoPhotosIcon style={styles.logo} />
      ) : (
        <ManWithBoxLogo style={styles.logo} />
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <PlusButton onPressHandler={plusButtonHandler} />
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
    marginBottom: 0.05 * vw,
    lineHeight: 25,
  },
});

export default NoEntriesView;
