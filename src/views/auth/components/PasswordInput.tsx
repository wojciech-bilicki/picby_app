import React, { ChangeEvent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { globalStyles } from '../../../common/styles/globalStyles';
import KeyIcon from '../icons/key.svg';
import { ErrorLabel } from './ErrorLabel';


const {width: vw} = Dimensions.get('window');

interface PasswordInputProps {
  password: string;
  onChange: (e: string | ChangeEvent<TextInput>) => void;
  touchedPassword: Maybe<boolean>;
  errorPassword: Maybe<string>;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({onChange, password, touchedPassword, errorPassword}) => {
    return (
      <View style={styles.formInputWrapper}>
      <View style={styles.inputWrapper}>
                    <KeyIcon style={globalStyles.keyLogo} />
                    <TextInput
                      secureTextEntry={true}
                      style={globalStyles.input}
                      placeholder="Hasło"
                      onChangeText={onChange}
                      value={password}
                    />
                        
                  </View>
                  {touchedPassword && errorPassword && <ErrorLabel error={errorPassword}/>}
                  </View>
    );
}

const styles = StyleSheet.create({
  formInputWrapper: {
    flexDirection: "column",
  },
  inputWrapper: {
    height: 0.093 * vw,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(242, 143, 174, 0.68)',
    borderBottomWidth: 2,
    borderRadius: 0,
    textAlign: 'center',
    paddingHorizontal: 5,
    width: vw * 0.8,
  },
})