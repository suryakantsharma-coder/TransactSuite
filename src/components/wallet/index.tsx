const projectId = '41aa2783faf05fd01162f296c02e4bfb';

import '@walletconnect/react-native-compat';
import {WagmiProvider} from 'wagmi';
import {mainnet, polygon, arbitrum} from '@wagmi/core/chains';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  createAppKit,
  defaultWagmiConfig,
  AppKit,
} from '@reown/appkit-wagmi-react-native';

const queryClient = new QueryClient();

const metadata = {
  name: 'AppKit RN',
  description: 'AppKit RN Example',
  url: 'https://reown.com/appkit',
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

const chains = [mainnet, polygon, arbitrum] as const;

const wagmiConfig = defaultWagmiConfig({chains, projectId, metadata});

createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: mainnet,
  enableAnalytics: true,
});

const ReOwnWallets: React.FC<any> = ({children}) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKit />
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default ReOwnWallets;
