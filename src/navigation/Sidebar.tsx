import React from 'react';
import {View, StyleSheet, ScrollView, Text, Dimensions} from 'react-native';
import {
  DrawerNavigatorItems,
  DrawerContentComponentProps,
  DrawerActions,
} from 'react-navigation-drawer';
import LogoutIcon from '../common/icons/menuSignOut.svg';
import {globalStyles} from '../common/styles/globalStyles';
import {menuColors} from '../staticData/staticData';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from './Header';

const {YELLOW_COLOR} = menuColors;
const {width: vw} = Dimensions.get('window');

const Sidebar = (
  props: React.PropsWithChildren<DrawerContentComponentProps>,
) => {
  const {navigation} = props;
  return (
    <View>
      <Header
        title="MENU"
        openMenu={() => navigation.dispatch(DrawerActions.closeDrawer())}
        showBackIcon={true}
        showMenuIcon={false}
      />
      <ScrollView>
        <View style={styles.liWrapper}>
          <DrawerNavigatorItems {...props} />
        </View>
        <TouchableOpacity style={styles.elementWrapper}>
          <View
            style={[globalStyles.menuIcon, {backgroundColor: YELLOW_COLOR}]}>
            <LogoutIcon />
          </View>
          <Text style={styles.logOutText}>Wyloguj</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  liWrapper: {
    paddingTop: 10,
  },
  elementWrapper: {
    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    width: vw * 1,
    marginHorizontal: 5,
    paddingVertical: 12,
    paddingLeft: 40,
  },
  logOutText: {
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    marginLeft: 28,
  },
});

export default Sidebar;
