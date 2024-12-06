const POLYGON_RPC_URL =
  'https://polygon-mainnet.g.alchemy.com/v2/gMYkAfV3PtpTrFn5bvt2xLBU1ay4g00R';
const ARBITRUM_RPC_URL =
  'https://arb-mainnet.g.alchemy.com/v2/gMYkAfV3PtpTrFn5bvt2xLBU1ay4g00R';
const ETHEREUM_RPC_URL =
  'https://eth-mainnet.g.alchemy.com/v2/gMYkAfV3PtpTrFn5bvt2xLBU1ay4g00R';

export const getProvider = (chainId: any) => {
  switch (chainId) {
    case 80001:
      return POLYGON_RPC_URL;

    case 1:
      return ETHEREUM_RPC_URL;

    default:
      return POLYGON_RPC_URL;
  }
};
