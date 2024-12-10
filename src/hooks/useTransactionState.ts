import {useState} from 'react';
import {useChainId, useTransaction, useTransactionConfirmations} from 'wagmi';

const useTransactionStateus = () => {
  const [hash, setHash] = useState<string | any>('');
  const chainId = useChainId();
  const {data, status, error, isLoading} = useTransaction({
    hash: hash,
  });

  return {
    setHash,
    data,
    status,
    error,
    isLoading,
    chainId,
  };
};

export default useTransactionStateus;
