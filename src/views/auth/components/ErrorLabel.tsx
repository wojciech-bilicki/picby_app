import React from 'react';
import { Text, View } from 'react-native';
import { globalStyles } from '../../../common/styles/globalStyles';
import ErrorLogo from '../icons/exclamationMark.svg';


interface ErrorLabelProps {
error: string;
}

export const ErrorLabel: React.FC<ErrorLabelProps> = ({error}) => {
    return (  <View style={globalStyles.errorTextWrapper}>
      {(
        <ErrorLogo style={globalStyles.errorExclamationMark} />
      )}
      <Text style={globalStyles.errorText}>
          {error}
      </Text>
    </View>);
}