import {Button, StyleSheet, Text, ToastAndroid, View} from 'react-native';

import {
  useSignMessage,
  useAccount,
  useBalance,
  useSendTransaction,
  useDisconnect,
} from 'wagmi';
import {useWalletInfo} from '@reown/appkit-wagmi-react-native';
import {formatEther, parseEther, parseUnits} from 'ethers';

const AccountInformation = () => {
  const {signMessage} = useSignMessage();
  const {data: txHash, sendTransaction} = useSendTransaction();
  const {address} = useAccount();
  const balance = useBalance({address: address});
  const {disconnectAsync} = useDisconnect();
  const w = useWalletInfo();

  //  Operations

  const operations = ['SIGN_MSG', 'SEND_TXN', 'DISCONNECT'];

  //   create functions

  const signMsg = async (msg?: string) => {
    await signMessage({message: 'hello world!'});
  };

  const sendTxn = async (to?: string) => {
    const txHash = await sendTransaction({
      to: address,
      value: parseEther('0.0001'),
    });
    ToastAndroid.show('Hash : ' + txHash, 10000);
  };

  const disconnect = async () => {
    const disconnect = await disconnectAsync();
    ToastAndroid.show('Disconnected', 1000);
  };

  const Operation = (type: string) => {
    switch (type) {
      case 'SIGN_MSG':
        signMsg();
        break;

      case 'SEND_TXN':
        sendTxn();
        break;

      case 'DISCONNECT':
        disconnect();
        break;
    }
  };

  return (
    <View>
      <Text style={styles.Heading}>Account Information</Text>
      <View style={styles.flexBoxCenter}>
        <Text style={styles.SubHeading}>Address</Text>
        <Text
          style={{...styles.SubHeadingText, width: '20%'}}
          numberOfLines={1}
          ellipsizeMode="middle">
          {address}
        </Text>
      </View>
      <View style={styles.flexBoxCenter}>
        <Text style={styles.SubHeading}>Balance</Text>
        <Text style={styles.SubHeadingText}>
          {formatEther(balance?.data?.value || 100000000000)?.substring(0, 5) +
            ' ' +
            balance?.data?.symbol}
        </Text>
      </View>

      <View>
        <Text style={styles.Heading}>Operations</Text>

        <View
          style={{
            gap: 10,
            display: 'flex',
            flexDirection: 'col',
            paddingLeft: 30,
            paddingRight: 30,
          }}>
          {operations.map((item: any, index: number) => {
            return (
              <Button
                key={index}
                onPress={() => Operation(item)}
                title={item}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },

  SubHeading: {
    fontSize: 16,
    fontWeight: 600,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },

  SubHeadingText: {
    fontSize: 16,
    fontWeight: 400,
    textAlign: 'center',
    paddingTop: 30,
    paddingBottom: 10,
  },

  flexBoxCenter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
  },

  btnOp: {
    width: '40%',
    borderRadius: 20,
  },
});

export default AccountInformation;
