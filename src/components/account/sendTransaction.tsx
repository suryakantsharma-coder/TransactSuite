import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SwipeButton from 'rn-swipe-button';
import TransactionCharges from './transactionCharges';
import useConnectedAccount from '../../hooks/useConnectedAccount';
import QRCode from 'react-native-qrcode-svg';

const QrScanner = require('../../assets/account-screen/qrcode-scan.png');

const SendTransaction = () => {
  const {toAddressfn, toValuefn, sendTranaction, value} = useConnectedAccount();

  return (
    <View style={styles.root}>
      <Text style={styles.headingH1}>Send </Text>

      <View>
        <Text style={styles.headingH3}>To</Text>
        <View
          style={{
            width: '100%',
            height: 50,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#222222',
            marginTop: 5,
            borderRadius: 6,
          }}>
          <TextInput
            style={styles.inputText}
            placeholder="Address"
            onChangeText={toAddressfn}
          />

          <TouchableOpacity onPress={() => {}}>
            <Image source={QrScanner} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.headingH3}>Amount</Text>

        <TextInput
          style={styles.inputText2}
          numberOfLines={1}
          keyboardType="number-pad"
          placeholder="0.002 POL"
          onChangeText={toValuefn}
        />
      </View>

      <View>
        <TransactionCharges amount={parseFloat(value)} />
      </View>

      <View style={styles.swipeButtonContainer}>
        <View
          style={{
            width: '100%',
          }}>
          <SwipeButton
            title="Swipe to Pay"
            titleMaxFontScale={12}
            titleFontSize={18}
            titleMaxLines={1}
            titleColor="white"
            railBackgroundColor="#141414"
            thumbIconBorderColor="#222222"
            thumbIconBackgroundColor="#222222"
            thumbIconWidth={80}
            height={60}
            onSwipeSuccess={() => {
              console.log('Submitted successfully!');
              sendTranaction();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#141414',
    padding: 12,
  },

  headingH1: {
    fontSize: 32,
    fontWeight: 800,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
  },

  headingH3: {
    fontSize: 12,
    fontWeight: 400,
    color: '#C4C4C4',
    marginBottom: 5,
  },

  inputText: {
    width: '90%',
    backgroundColor: '#222222',
    fontSize: 16,
    borderRadius: 6,
    padding: 4,
  },

  inputText2: {
    width: '100%',
    height: 50,
    backgroundColor: '#222222',
    fontSize: 16,
    borderRadius: 6,
    padding: 8,
  },

  container: {
    marginTop: 36,
  },

  swipeButtonContainer: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    marginTop: 35,
  },
});

export default SendTransaction;
