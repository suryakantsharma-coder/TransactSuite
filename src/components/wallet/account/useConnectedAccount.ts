import {formatEther, parseEther} from 'ethers';
import {useEffect} from 'react';
import {Alert} from 'react-native';
import {Address} from 'viem';
import {signTransaction} from 'viem/accounts';
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

  const sendTranaction = async ({to, value}: sendTransactionProps) => {
    try {
      if (to && value) {
        const txHash = sendTransactionAsync({to, value});
      }
    } catch (err) {
      console.log(err);
      Alert.alert('Error', JSON.stringify(err));
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
    sendTranaction,
    SignMessage,
  };
};

export default useConnectedAccount;
