import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Clipboard,
  ToastAndroid,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import useConnectedAccount from '../../hooks/useConnectedAccount';

const Home = require('../../assets/core-screen/house-white.png');

const ReceiveQrCode = () => {
  const {address} = useConnectedAccount();

  return (
    <View style={styles.root}>
      <Text style={styles.HeadingH1}>Receive Qr Code</Text>

      <View style={styles.qrCodeContainer}>
        <View style={styles.qrCodeInnerContainer}>
          <QRCode
            size={160}
            backgroundColor="#FFFFFF"
            color="black"
            value={address?.toString()}
          />
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          Clipboard.setString(address || '');
          ToastAndroid.show('Address Copied!', 1000);
        }}>
        <Text
          style={styles.addressStyling}
          numberOfLines={1}
          ellipsizeMode="middle">
          {address}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
  },

  HeadingH1: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
    fontWeight: 'bold',
  },

  qrCodeContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  qrCodeInnerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#FFFFFF',
  },

  addressStyling: {
    width: '40%',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    fontSize: 17,
    fontWeight: '400',
    color: 'white',
    borderRadius: 20,
    textAlign: 'center',
    padding: 6,
    marginBottom: 40,
  },
});

export default ReceiveQrCode;
