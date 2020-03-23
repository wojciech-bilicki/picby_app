import {StyleSheet, Dimensions} from 'react-native';
import {StatusBar} from 'react-native';

const statusBarHeight = StatusBar.currentHeight;

const {width: vw, height: vh} = Dimensions.get('window');

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    minHeight: statusBarHeight && vh - statusBarHeight,
  },
  errorTextWrapper: {
    marginTop: 3,
    flexDirection: 'row',
    marginHorizontal: 5,
    alignItems: 'center',
    marginBottom: 10,
    minHeight: 0.0625 * vw,
    paddingHorizontal: 2,
  },
  errorExlamationMark: {
    maxWidth: 0.0625 * vw,
    maxHeight: 0.0625 * vw,
    marginRight: 0.063 * vw,
  },
  errorText: {
    color: '#CC1919',
    letterSpacing: 0.1,
    fontSize: 14,
  },
  emailLogo: {
    minWidth: 0.0625 * vw,
    marginRight: 0.0062 * vw,
    minHeight: 0.05 * vw,
    maxHeight: 0.05 * vw,
    maxWidth: 0.0625 * vw,
  },
  keyLogo: {
    minWidth: 0.0687 * vw,
    minHeight: 0.0375 * vw,
  },
  input: {
    paddingLeft: 0.053 * vw,
    width: 0.72 * vw,
    margin: 0,
    padding: 0,
    letterSpacing: 0.3,
    fontSize: 16,
    color: 'rgba(7, 71, 130, 0.68)',
  },
  menuIcon: {
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
