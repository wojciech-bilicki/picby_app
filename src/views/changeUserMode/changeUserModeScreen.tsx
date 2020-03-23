import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ChangeModeScreen: React.FC = props => {
  return (
    <View style={styles.wrapper}>
      <Text>Change user mode screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChangeModeScreen;
