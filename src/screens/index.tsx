import ReOwnWallets from '../components/wallet';
import WalletConnectScreen from './Intro';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppKitAccount} from '@reown/appkit-ethers-react-native';
import CoreScreens from './core-screens';

const RootComponents = (style: any) => {
  const Stack = createNativeStackNavigator();
  const {isConnected} = useAppKitAccount();

  const [navigateTo, setNavigateTo] = React.useState<string>('Intro');

  // contraol navigation based on the connectivity
  React.useEffect(() => {
    if (isConnected) {
      // navigation.push('Wallet');
    } else {
      setNavigateTo('Intro');
    }
  }, [isConnected]);

  return (
    <ReOwnWallets style={{height: style.height}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={navigateTo}>
          <Stack.Screen
            name="Intro"
            component={WalletConnectScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Wallet"
            component={CoreScreens}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReOwnWallets>
  );
};

export default RootComponents;
