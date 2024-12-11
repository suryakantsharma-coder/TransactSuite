export interface trendingTokens {
  address: string; // The token's contract address
  symbol: string; // The token's ticker symbol
  name: string; // The token's full name
  decimals: number; // The number of decimals for the token
  approved: boolean; // Whether the token is approved or not
}

export const getTrendingTokens = async (
  chainId: number,
): Promise<Array<trendingTokens>> => {
  const requestOptions: any = {
    method: 'GET',
    redirect: 'follow',
  };

  const response = await fetch(
    `https://multiple-swap-api.onrender.com/swap/trending-tokens?chainId=${
      chainId || 1
    }`,
    requestOptions,
  ).catch(error => console.error(error));
  const {data} = await response?.json();
  return data?.trendingTokens;
};
