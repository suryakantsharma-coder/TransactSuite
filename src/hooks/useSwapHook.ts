import {useEffect, useState} from 'react';
import {getTrendingTokens, trendingTokens} from '../data/shusiswap';
import {useChainId} from 'wagmi';
import {
  etherumLogo,
  etherumNativeContract,
  polygonLogo,
  polygonNativeContract,
} from '../constants/constant';

const useSwapHook = () => {
  const chainId = useChainId();

  const [trendingToken, setTrendingToken] = useState<Array<trendingTokens>>([]);
  const [selectedTokens, setSelectedTokens] = useState<Array<trendingTokens>>(
    [],
  );

  const [tokenInAmount, setTokenInAmount] = useState(0.0);

  const [tokenIn, setTokenIn] = useState<any>();
  const [open, setOpen] = useState<Boolean>(false);

  const getTrendingTokenList = async () => {
    try {
      const data = await getTrendingTokens(137);
      setTrendingToken(data);
    } catch (err) {
      console.log(err);
    }
  };

  const selectedChainConfigure = (chainId: number) => {
    if (chainId == 137) {
      setTokenIn({
        address: polygonNativeContract,
        logo: polygonLogo,
        symbol: 'POL',
      });
      getTrendingTokenList();
    } else if (chainId == 1) {
      setTokenIn({
        address: etherumNativeContract,
        logo: etherumLogo,
        symbol: 'ETH',
      });
      getTrendingTokenList();
    }
  };

  const handleSelectedToken = (item: trendingTokens) => {
    const index =
      selectedTokens.findIndex(data => data.symbol == item.symbol) || -2;

    console.log({index, item});

    if (index > -1 || index == -2) {
      const copyArray = selectedTokens;
      copyArray.splice(index, 1);
      setSelectedTokens(copyArray);
    } else {
      setSelectedTokens(state => (state = [...state, item]));
    }
  };

  const handleValue = (num: number) => {
    setTokenInAmount(num);
  };

  useEffect(() => {
    if (open) getTrendingTokenList();
  }, [open]);

  // if chain Id change in case
  useEffect(() => {
    if (chainId) {
      selectedChainConfigure(chainId);
    }
  }, [chainId]);

  return {
    tokenIn,
    trendingToken,
    selectedTokens,
    open,
    setOpen,
    handleSelectedToken,
    tokenInAmount,
    handleValue,
  };
};

export default useSwapHook;
