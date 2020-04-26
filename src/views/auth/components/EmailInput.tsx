import React, { ChangeEvent } from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { globalStyles } from '../../../common/styles/globalStyles';
import EmailLogo from '../icons/envelope.svg';
import { ErrorLabel } from './ErrorLabel';

const {width: vw} = Dimensions.get('window');

interface EmailInputProps {
  email: string;
  onChange: ((e: string | ChangeEvent<TextInput>) => void);
  touchedEmail: Maybe<boolean>;
  errorEmail: Maybe<string>;
}

export const EmailInput: React.FC<EmailInputProps> = ({errorEmail, email, onChange, touchedEmail}) => {
    return ( 
    <View style={styles.formInputWrapper}>
    <View style={styles.inputWrapper}>
      <EmailLogo style={globalStyles.emailLogo} />
      <TextInput
        keyboardType="email-address"
        style={globalStyles.input}
        placeholder="E-mail"
        onChangeText={onChange}
        value={email}
        
      />
    </View>
    {touchedEmail && errorEmail && <ErrorLabel error={errorEmail}/>}
    </View>);
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