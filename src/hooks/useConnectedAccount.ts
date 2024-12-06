import {formatEther, isAddress, parseEther} from 'ethers';
import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {Address} from 'viem';
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useSignMessage,
} from 'wagmi';

interface sendTransactionProps {
  to: Address | string | any;
  value: string | any;
}

const useConnectedAccount = () => {
  const {address, isConnected} = useAccount();
  const {data} = useBalance({address: address});
  const {sendTransactionAsync} = useSendTransaction();
  const {signMessageAsync} = useSignMessage();

  // states
  const [toAddress, setToAddress] = useState<string | any>();
  const [value, setValue] = useState<string | any>();

  const toAddressfn = (text: string) => {
    if (isAddress(text)) {
      setToAddress(text);
    } else {
      Alert.alert('invalid address');
    }
  };

  const toValuefn = (text: string) => {
    if (text) {
      setValue(text);
    }
  };

  const sendTranaction = async () => {
    try {
      if (toAddress && value) {
        const txHash: any = await sendTransactionAsync({
          to: toAddress,
          value: parseEther(value),
        });
        Alert.alert(txHash?.hash?.toString() || '');
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error');
    }
  };

  const SignMessage = async () => {
    try {
      const MSG = 'Hello World!';
      await signMessageAsync({message: MSG});
    } catch (err) {
      console.log(err);
    }
  };

  return {
    address: address,
    balance: {
      native: formatEther(data?.value || '0'),
      usd: 1,
      symbol: data?.symbol,
    },
    value,
    sendTranaction,
    SignMessage,
    toAddressfn,
    toValuefn,
  };
};

export default useConnectedAccount;
