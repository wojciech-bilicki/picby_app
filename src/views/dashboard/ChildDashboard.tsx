import { Fab, Icon } from 'native-base';
import React, { useContext } from 'react';
import { View } from 'react-native';
import ModeContext from './ModeContext';


 const ChildDashboard: React.FC= () => {
   const {onSwitchMode} = useContext(ModeContext)
  return (
    <View>
      <Fab position="topRight" onPress={onSwitchMode}>
        <Icon  name="md-lock"  />
      </Fab>
    </View>
  )
  }

  export default ChildDashboard