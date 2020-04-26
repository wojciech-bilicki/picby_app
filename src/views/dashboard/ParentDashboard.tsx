import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text } from 'react-native';
import CatalogsScreen from '../catalogList/CatalogsScreen';
import { ParentDashboardDrawerContent } from './ParentDashboardDrawerContent';


interface ParentDashboardProps {

}

const ParentDashboardDrawer = createDrawerNavigator()

const VoiceRecords = () => <Text>VoiceRecords</Text>

const ParentDashboard: React.FC<ParentDashboardProps> = ({}) => {
    return (
      <ParentDashboardDrawer.Navigator 
      drawerContent={props => <ParentDashboardDrawerContent {...props}/>}
      drawerStyle={{
        width: '100%'
      }}>
        <ParentDashboardDrawer.Screen name="Catalogs" component={CatalogsScreen} />
        <ParentDashboardDrawer.Screen name="VoiceRecords" component={VoiceRecords} /> 
      </ParentDashboardDrawer.Navigator>
    );
}

export default ParentDashboard;
