import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from 'react';
import ChildDashboard from "./ChildDashboard";
import ModeContext from "./ModeContext";
import ParentDashboard from './ParentDashboard';

type DashboardStackParamList = {
  ChildDashboard: undefined,
  ParentDashboard: undefined
}

const DashboardStack = createStackNavigator<DashboardStackParamList>()


const DashboardNavigation = () => {
  const [isChildMode, setIsChildMode] = useState(true)

  const modeContext = React.useMemo(() => ({
    onSwitchMode: () => {
    
      setIsChildMode(!isChildMode) 
    }
  }), [isChildMode])

  return (
    <ModeContext.Provider value={modeContext}>
  <DashboardStack.Navigator headerMode="none">
  
    {isChildMode ? (
      <DashboardStack.Screen name="ChildDashboard" component={ChildDashboard}/>

    ) : (
      <DashboardStack.Screen name="ParentDashboard" component={ParentDashboard} />

    )}

  </DashboardStack.Navigator>
  </ModeContext.Provider>
)

}

  export default DashboardNavigation;