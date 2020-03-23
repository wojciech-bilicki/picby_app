import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface Props {
  questionText: string;
  actionText: string;
  onPress: () => void;
}

const GotAccountQuestion: React.FC<Props> = props => {
  const {questionText, actionText, onPress} = props;
  return (
    <View style={styles.gotAccountQuestion}>
      <Text>{questionText}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.actionText}>{actionText}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  gotAccountQuestion: {
    flexDirection: 'row',
  },
  actionText: {
    color: '#3180AE',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 4,
    letterSpacing: 0.3,
  },
});

export default GotAccountQuestion;
