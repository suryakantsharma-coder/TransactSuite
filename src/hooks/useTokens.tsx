import {useAccount, useChainId} from 'wagmi';
import {getUserTokens, tokensMetadata} from '../data/tokens';
import {useEffect, useState} from 'react';

export interface TokenData {
  balance: string;
  decimals: number;
  logo: string;
  name: string;
  percentage_relative_to_total_supply: number;
  possible_spam: boolean;
  security_score: number;
  symbol: string;
  thumbnail: string;
  token_address: string;
  total_supply: string;
  total_supply_formatted: string;
  verified_contract: boolean;
}

const useTokens = () => {
  const chainId = useChainId();
  const {address} = useAccount();

  const [tokens, setTokens] = useState<Array<TokenData>>([]);
  const [error, setError] = useState('ERROR');
  const [refresh, setRefresh] = useState<boolean>(true);

  const getTokenData = async () => {
    try {
      const balanceTokens = await getUserTokens(chainId, address as string);
      setTokens(balanceTokens);
    } catch (err: any) {
      console.log(err);
      setError(err);
    }
  };

  useEffect(() => {
    if (refresh) {
      getTokenData();
      setRefresh(false);
    }
  }, [refresh]);

  return {
    getTokenData,
    tokens,
    error,
    setRefresh,
  };
};

export default useTokens;
