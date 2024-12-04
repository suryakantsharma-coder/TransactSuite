import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AccountScreen from './account-screen';
import {Image} from 'react-native';

const HomeActive = require('../../assets/core-screen/house-blue.png');
const HomeInactive = require('../../assets/core-screen/house-white.png');

const CoreScreens = () => {
  const BottomTabs = createBottomTabNavigator();
  return (
    <BottomTabs.Navigator initialRouteName="Wallet">
      <BottomTabs.Screen
        name="Wallet"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tab: any) => {
            console.log({tab});
            return (
              <Image
                source={tab?.color == '#FFFFFF' ? HomeInactive : HomeActive}
                alt="inc"
              />
            );
          },
          tabBarActiveTintColor: '#4C73FB',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarItemStyle: {
            backgroundColor: '#121212',
            borderColor: '#121212',
            borderWidth: 1,
          },
        }}
      />
      <BottomTabs.Screen
        name="Swap"
        component={AccountScreen}
        options={{
          headerShown: false,
          tabBarIcon: (tab: any) => {
            return (
              <Image
                source={tab?.color == '#FFFFFF' ? HomeInactive : HomeActive}
                alt="inc"
              />
            );
          },
          tabBarActiveTintColor: '#4C73FB',
          tabBarInactiveTintColor: '#FFFFFF',
          tabBarItemStyle: {
            backgroundColor: '#121212',
            borderColor: '#121212',
            borderWidth: 1,
          },
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default CoreScreens;