import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {
  firstLoginDashboard,
  buttonsData,
  commonColors,
} from '../../staticData/staticData';
import PicbyLogo from '../../common/images/PICBY.svg';
import {globalStyles} from '../../common/styles/globalStyles';
import FlatButton from '../../common/components/Button';
import {NavigationStackProp} from 'react-navigation-stack';

const {width: vw} = Dimensions.get('window');
const {orangeRed, lightBlue} = commonColors;

type LoginScreenProps = {
  navigation: NavigationStackProp;
};

const DashboardScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const {navigate} = navigation;
  const {buttonText, headerText, subtitle, contentText} = firstLoginDashboard;
  const {textColorWhite} = buttonsData;

  return (
    <View style={globalStyles.screenWrapper}>
      <Text style={styles.header}>{headerText}</Text>
      <PicbyLogo style={styles.logo} />
      <View style={styles.subtitleWrapper}>
        <Text style={styles.subtitle}>
          Znajdujesz się w{' '}
          <Text style={styles.subtitleRed}>TRYBIE RODZICA</Text>
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <Text style={[styles.subtitle, styles.content]}>{contentText}</Text>
      <FlatButton
        textColor={textColorWhite}
        onPress={() => navigate('Settings')}
        textValue={buttonText}
        colorVariantIndex={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0.084 * vw,
    fontFamily: 'OpenSans-Bold',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 0.056 * vw,
    lineHeight: 0.078 * vw,
    textAlign: 'center',
    color: '#074782',
    letterSpacing: 0.7,
  },
  logo: {
    minWidth: 0.65 * vw,
    minHeight: 0.21 * vw,
    resizeMode: 'contain',
    marginTop: 0.075 * vw,
  },
  subtitleWrapper: {marginTop: 0.075 * vw},
  subtitle: {
    fontSize: 0.05 * vw,
    textAlign: 'center',
    lineHeight: 0.0685 * vw,
  },
  subtitleRed: {color: orangeRed, fontWeight: 'bold'},
  content: {color: lightBlue, marginTop: 0.075 * vw, marginBottom: 0.075 * vw},
});

export default DashboardScreen;
