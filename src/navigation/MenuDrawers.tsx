// import { createDrawerNavigator } from '@react-navigation/drawer';
// import React from 'react';
// import { Dimensions, View } from 'react-native';
// import AboutIcon from '../common/icons/menuAbout.svg';
// import CatalogIcon from '../common/icons/menuCatalog.svg';
// import KidIcon from '../common/icons/menuChildIcon.svg';
// import PrivacyIcon from '../common/icons/menuPrivacy.svg';
// import SettingsIcon from '../common/icons/menuSettings.svg';
// import VoiceIcon from '../common/icons/menuVioce.svg';
// import { globalStyles } from '../common/styles/globalStyles';
// import { menuColors } from '../staticData/staticData';
// import AboutStackNav from '../views/about/AboutStack';
// import CatalogsStackNav from '../views/catalogList/CatalogsStack';
// import ChangeUserStackNav from '../views/changeUserMode/changeUserModeStack';
// import DashboardStackNav from '../views/dashboard/DashboardStack';
// import IntroductionSceneStack from '../views/intruduction/introductionScene';
// import PrivacyStackNav from '../views/privacy/PrivacyStack';
// import SettingsStackNav from '../views/settings/SettingsStack';
// import VoiceRecordsStackNav from '../views/voiceRecords/VoiceRecordsStack';
// import Sidebar from './Sidebar';


// const {width: vw} = Dimensions.get('window');
// const {RED_COLOR, YELLOW_COLOR} = menuColors;

// export const passIconElement = (
//   element: JSX.Element,
//   backgroundColor: string | undefined,
// ) => {
//   return (
//     <View style={[globalStyles.menuIcon, {backgroundColor: backgroundColor}]}>
//       {element}
//     </View>
//   );
// };

// export const ParentDrawer = createDrawerNavigator(
//   {
//     KidPanel: {
//       screen: ChangeUserStackNav,
//       navigationOptions: {
//         drawerIcon: () => passIconElement(<KidIcon />, RED_COLOR),
//         drawerLabel: 'PANEL DZIECKA',
//       },
//     },
//     Catalogs: {
//       screen: CatalogsStackNav,
//       navigationOptions: {
//         drawerIcon: () => passIconElement(<CatalogIcon />, YELLOW_COLOR),
//         drawerLabel: 'KATALOGI',
//       },
//     },
//     VoiceRecords: {
//       screen: VoiceRecordsStackNav,
//       navigationOptions: {
//         drawerIcon: () => passIconElement(<VoiceIcon />, YELLOW_COLOR),
//         drawerLabel: 'NAGRANIA GŁOSOWE',
//       },
//     },
//     Settings: {
//       screen: SettingsStackNav,
//       navigationOptions: {
//         drawerIcon: () => passIconElement(<SettingsIcon />, YELLOW_COLOR),
//         drawerLabel: 'USTAWIENIA',
//       },
//     },
//     AboutApp: {
//       screen: AboutStackNav,
//       navigationOptions: {
//         drawerIcon: () => passIconElement(<AboutIcon />, YELLOW_COLOR),
//         drawerLabel: 'O APLIKACJI',
//       },
//     },
//     PrivacyPolicy: {
//       screen: PrivacyStackNav,
//       navigationOptions: {
//         drawerIcon: () => passIconElement(<PrivacyIcon />, YELLOW_COLOR),
//         drawerLabel: 'POLITYKA PRYWATNOŚCI',
//       },
//     },
//     FirstLogin: {
//       screen: DashboardStackNav,
//     },
//   },
//   {
//     contentComponent: props => <Sidebar {...props} />,
//     drawerWidth: vw * 1,
//     hideStatusBar: false,
//     drawerType: 'slide',
//     drawerPosition: 'left',
//     contentOptions: {
//       itemStyle: {
//         alignItems: 'center',
//         alignSelf: 'center',
//         textAlign: 'center',
//         width: vw * 1,
//         marginHorizontal: 5,
//         paddingVertical: 10,
//         paddingLeft: 30,
//       },
//       itemsContainerStyle: {
//         marginTop: 16,
//         marginBottom: 0,
//         padding: 0,
//       },
//       activeTintColor: '#000',
//       inactiveTintColor: '#000',
//       iconContainerStyle: {
//         opacity: 1,
//       },
//     },
//   },
// );

// export const ChildDrawer = createDrawerNavigator({
//   'Panel rodzica': DashboardStackNav,
//   Notifications: IntroductionSceneStack,
// });
