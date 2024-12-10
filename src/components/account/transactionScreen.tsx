import {
  Alert,
  Button,
  Clipboard,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import useTransactionStateus from '../../hooks/useTransactionState';
import {useEffect} from 'react';
import {getExplorerUrl} from '../../utils/provider';

const progress = require('../../assets/animation/animation.json');
const done = require('../../assets/animation/done-animation.json');
const failed = require('../../assets/animation/failed-animation.json');

interface txStatusProps {
  hash: string;
  setOpen: Function;
}

const TransactionStatus = ({hash, setOpen}: txStatusProps) => {
  const {chainId, data, status, error, setHash} = useTransactionStateus();

  useEffect(() => {
    if (hash) setHash(hash);
    console.log({dhash: data, status});
  }, [hash, data]);

  const getTransactionText = () => {
    if (status == 'success') {
      return 'Transaction Completed';
    } else if (status == 'pending') {
      return 'Transaction Pending';
    } else if (status == 'error') {
      return 'Transaction Failed';
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.headingH1}>{getTransactionText()}</Text>

      <LottieView
        style={{
          width: '100%',
          height: status == 'error' ? 120 : 200,
          marginTop: 20,
        }}
        source={
          status == 'success' ? done : status == 'pending' ? progress : failed
        }
        autoPlay
        loop={status == 'pending' ? true : false}
      />

      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity
          style={{
            width: '45%',
            backgroundColor: '#0202FC',
            height: 50,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 40,
          }}
          onPress={async () => {
            const url = getExplorerUrl(chainId, hash);
            const support = await Linking.canOpenURL(url);
            if (support) {
              Linking.openURL(url);
            } else {
              Clipboard.setString(url);
              ToastAndroid.show('unable to open url', 2000);
            }
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              padding: 8,
            }}>
            View on Explorer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '45%',
            backgroundColor: '#202020',
            height: 50,
            borderRadius: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            marginTop: 40,
          }}
          onPress={() => {
            setOpen(false);
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              padding: 8,
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 290,
    backgroundColor: '#141414',
  },

  headingH1: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default TransactionStatus;
