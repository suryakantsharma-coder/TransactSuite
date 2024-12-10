import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TransactionCharges from './transactionCharges';
import useConnectedAccount from '../../hooks/useConnectedAccount';
import TransactionStatus from './transactionScreen';
import BottomSheetDialog from '../core/BottomSheetDialog';
import {useEffect, useState} from 'react';
import SwipeButton from 'rn-swipe-button';

const QrScanner = require('../../assets/account-screen/qrcode-scan.png');

const SendTransaction = () => {
  const {toAddressfn, toValuefn, sendTranaction, value, txData} =
    useConnectedAccount();
  const [hash, setHash] = useState<string | any>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (txData) {
      console.log({txData});
      setHash(txData);
      setOpen(true);
    }
  }, [txData]);

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

      {value > 0 && (
        <View>
          <TransactionCharges amount={value} />
        </View>
      )}

      {open && hash && (
        <BottomSheetDialog onClose={setOpen}>
          <TransactionStatus hash={hash} setOpen={setOpen} />
        </BottomSheetDialog>
      )}

      {!open && (
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
              onSwipeSuccess={async () => {
                console.log('Submitted successfully!');
                const txHash = await sendTranaction();
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
    padding: 12,
    position: 'relative',
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
