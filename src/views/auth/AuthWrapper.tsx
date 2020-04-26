import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PicbyLogo from '../../common/images/PICBY.svg';
import { globalStyles } from '../../common/styles/globalStyles';

const {width: vw} = Dimensions.get('window');

interface AuthWrapperProps {

}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({children}) => {
    return (<ScrollView>
      <View style={globalStyles.screenWrapper}>
         <PicbyLogo/> 
         <View>
           {children}
         </View>
         </View>
    </ScrollView>);
}

const styles = StyleSheet.create({
  logo: {
    minWidth: 0.65 * vw,
    minHeight: 0.21 * vw,
    resizeMode: 'contain',
    marginTop: 0.2187 * vw,
    marginBottom: 0.2187 * vw,
  },
})

