import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import MenuIcon from '../common/icons/hamburger.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ArrowBackIcon from '../common/icons/arrowBack.svg';

const {width: vw, height: vh} = Dimensions.get('window');

interface Props {
  title: string;
  showBackIcon?: boolean;
  showMenuIcon?: boolean;
  showEditIcon?: boolean;
  openMenu?: () => boolean;
}

const Header: React.FC<Props> = props => {
  const {
    title,
    openMenu,
    showBackIcon = false,
    showMenuIcon = true,
    showEditIcon = false,
  } = props;
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconWrapper} onPress={openMenu}>
        {showMenuIcon && <MenuIcon style={{minWidth: 24, minHeight: 20}} />}
        {showBackIcon && (
          <ArrowBackIcon style={{minWidth: 24, minHeight: 20}} />
        )}
      </TouchableOpacity>

      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: vw,
    height: 0.1 * vh,
    marginHorizontal: 0,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3180AE',
    padding: 0,
  },
  headerText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 18,
    letterSpacing: 1,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 0.05 * vw,
    marginRight: 0.03 * vw,
    minHeight: 0.068 * vw,
    minWidth: 0.068 * vw,
  },
  icon: {
    minHeight: 0.068 * vw,
    minWidth: 0.068 * vw,
    borderWidth: 1,
  },
});

export default Header;
