import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import PicbyLogo from '../../common/images/PICBY.svg';
import {NavigationStackProp} from 'react-navigation-stack';
import {useQuery} from '@apollo/react-hooks';
import {ME_QUERY} from '../../apollo/queries/queries';
import client from '../../../apollo.config';

const {width: vw} = Dimensions.get('window');

type Props = {
  navigation: NavigationStackProp;
};

const LoadingScreen: React.FC<Props> = ({navigation}) => {
  const navigateToOtherScreen = (screenName: string) => {
    navigation.navigate({routeName: screenName});
  };

  const {error, data} = useQuery(ME_QUERY, {
    onError: () => {
      console.log(error);
    },
    onCompleted: () => {
      const userId = data?.me;
      if (userId) {
        navigateToOtherScreen('Catalogs');
      } else {
        client.cache.reset();
        navigateToOtherScreen('Intro');
      }
    },
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerWrapperThirdScreen}>
          <Text style={[styles.headerText, styles.headerTextThirdScreen]}>
            {'ŚWIAT OCZAMI DZIECKA'}
          </Text>
          <PicbyLogo style={[styles.logo, styles.logoThirdScreen]} />
        </View>
        <View style={styles.content}>
          <ActivityIndicator size={120} color={'#3180AE'} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 0.134 * vw,
  },
  headerWrapperThirdScreen: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'OpenSans-Bold',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 0.056 * vw,
    lineHeight: 0.078 * vw,
    textAlign: 'center',
    color: '#074782',
    letterSpacing: 0.7,
  },
  headerTextThirdScreen: {
    marginTop: 0.0262 * vw,
  },
  logo: {
    minWidth: 0.65 * vw,
    minHeight: 0.21 * vw,
    resizeMode: 'contain',
    marginTop: 0.0562 * vw,
  },
  logoThirdScreen: {
    marginTop: 0.03 * vw,
  },
  text: {},
  content: {
    maxWidth: 0.9 * vw,
    minHeight: 0.331 * vw,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0.2 * vw,
  },
});

export default LoadingScreen;
