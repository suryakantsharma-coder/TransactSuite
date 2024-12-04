import {useNavigation} from '@react-navigation/native';
import {useAppKit} from '@reown/appkit-wagmi-react-native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useAccount} from 'wagmi';

const WalletConnectScreen = () => {
  const {open} = useAppKit();
  const {address} = useAccount();
  const navigation = useNavigation();

  return (
    <ScrollView
      style={{width: '100%', height: '100%', backgroundColor: '#070707'}}>
      <View style={styles.root}>
        <Text style={styles.HeadingH3}>ChainSync</Text>
        <Image
          style={styles.Image}
          source={require('../../assets/intro/3.png')}
          alt="icons"
        />
        <Text style={styles.HeadingH1}>DeFi investing made easy.</Text>
        <Text style={styles.Paragraph}>
          ChainSync is the world’s safest platform to buy, sell and manage your
          NFTs and assets.
        </Text>

        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 12,
          }}>
          {!address && (
            <TouchableOpacity
              style={styles.GetStarted}
              onPress={() => {
                try {
                  open();
                } catch (err) {
                  console.log(err);
                }
              }}>
              <Text style={styles.GetStartedText}>{'Connect Wallet'}</Text>
            </TouchableOpacity>
          )}
          {address && (
            <TouchableOpacity
              style={styles.ConnectedBtn}
              onPress={() => {
                // @ts-ignore
                navigation.navigate('Wallet');
              }}>
              <Text style={styles.GetStartedText}>{"Let's Go"}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    backgroundColor: '#070707',
    paddingLeft: 28,
    paddingRight: 28,
  },

  HeadingH3: {
    fontSize: 21,
    color: 'white',
    marginTop: 19.5,
    fontWeight: 800,
  },

  HeadingH1: {
    fontSize: 43,
    color: 'white',
    marginTop: 19.5,
    fontWeight: 600,
    textAlign: 'left',
  },

  Paragraph: {
    fontSize: 14,
    color: '#C1C1C1',
    marginTop: 16,
    fontWeight: 500,
    textAlign: 'left',
  },

  Image: {
    width: 347,
    height: '92%',
    objectFit: 'contain',
  },

  GetStarted: {
    width: 183.48,
    height: 52.3,
    borderRadius: 30.02,
    backgroundColor: '#0000FC',
    marginTop: 27,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  ConnectedBtn: {
    width: '100%',
    height: 52.3,
    borderRadius: 30.02,
    backgroundColor: '#0000FC',
    marginTop: 27,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  GetStartedText: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  },
});

export default WalletConnectScreen;
