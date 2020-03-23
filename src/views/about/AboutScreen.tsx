import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen: React.FC = props => {
  return (
    <View style={styles.wrapper}>
      <Text>About Screen</Text>
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

export default AboutScreen;
