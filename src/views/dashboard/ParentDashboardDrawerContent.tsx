import { useMutation } from '@apollo/react-hooks';
import { DrawerContentComponentProps, DrawerContentOptions, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Button, Text } from 'native-base';
import React, { useContext } from 'react';
import { LOGOUT_USER } from '../../apollo/mutations/mutations';
import { AuthContext } from '../../navigation/authContext';
import ModeContext from './ModeContext';




type DrawerContentProps = DrawerContentComponentProps<DrawerContentOptions>


export const ParentDashboardDrawerContent: React.FC<DrawerContentProps> = (props) => {
    const {navigation} = props;
    const [logoutUser] = useMutation(LOGOUT_USER)
    const {onSwitchMode} = useContext(ModeContext)
    const {signOut} = useContext(AuthContext)
    return (
      <DrawerContentScrollView {...props} >
        <Button onPress={onSwitchMode}>
            <Text>Tryb dziecka</Text>
        </Button>
        <DrawerItemList {...props} />
        <Button onPress={async () => {
          await logoutUser()
          signOut()
        }}>
          <Text>Wyloguj</Text>
        </Button>
      </DrawerContentScrollView>
    );
}