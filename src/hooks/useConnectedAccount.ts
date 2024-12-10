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
  const {
    sendTransactionAsync,
    sendTransaction,
    data: txData,
  } = useSendTransaction();
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

  const sendTranaction = async (): Promise<any> => {
    try {
      if (toAddress && value) {
        console.log({txHash: 'GOTO GO'});
        const txHash = await sendTransaction({
          to: toAddress,
          value: parseEther(value),
        });
        console.log({txHash});
        // Alert.alert(txHash?.hash?.toString() || '');
        return txHash;
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
    txData,
    sendTranaction,
    SignMessage,
    toAddressfn,
    toValuefn,
  };
};

export default useConnectedAccount;
