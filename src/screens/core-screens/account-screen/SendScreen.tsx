import {StyleSheet, View} from 'react-native';
import SendTransaction from '../../../components/account/sendTransaction';
import BottomSheetDialog from '../../../components/core/BottomSheetDialog';

const SendScreen = () => {
  return (
    <View style={styles.root}>
      <SendTransaction />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },
});

export default SendScreen;
