import {ethers, formatEther, parseEther} from 'ethers';
import {useState} from 'react';
import {useAccount, useChainId, useEstimateGas} from 'wagmi';
import {getProvider} from '../utils/provider';

export interface txParams {
  account: string | any;
  to: string | any;
  value: string | any;
}

const useCalculatorTransactionCost = () => {
  const {address} = useAccount();
  const chainId = useChainId();
  const [fees, setFees] = useState<string>();
  const [currentParams, setCurrentParams] = useState<txParams>({
    account: address,
    to: '0x45d5F8C0C3aD9769c0E6686634CF7134D1Cc2664',
    value: parseEther('0.0'),
  });

  const {data, status, error} = useEstimateGas(currentParams);

  const getCurrentPrice = async () => {
    const rpcUrl = getProvider(chainId);
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const {gasPrice} = await provider.getFeeData();
    const txFees =
      parseInt(data?.toString() || '0') * parseInt(gasPrice?.toString() || '0');
    const inEth = formatEther(txFees);
    console.log({txFees: inEth});
    setFees(parseFloat(inEth || '0.000001').toFixed(4));
    return 0;
  };

  return {data: data, status, error, setCurrentParams, getCurrentPrice, fees};
};

export default useCalculatorTransactionCost;
