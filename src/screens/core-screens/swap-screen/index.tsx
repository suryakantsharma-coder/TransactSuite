import {StyleSheet, View} from 'react-native';
import SwapComponent from '../../../components/swap/Swap';

const SwapScreen = () => {
  return (
    <View style={styles.root}>
      <SwapComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
  },
});

export default SwapScreen;
