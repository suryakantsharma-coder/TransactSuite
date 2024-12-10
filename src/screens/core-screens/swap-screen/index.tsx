import {StyleSheet, Text, View} from 'react-native';

const SwapScreen = () => {
  return (
    <View style={styles.root}>
      <Text style={styles.headingH1}>Swap</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
  },

  headingH1: {
    fontSize: 22,
    fontWeight: 800,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
});

export default SwapScreen;
