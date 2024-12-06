import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import useConnectedAccount from '../../../hooks/useConnectedAccount';
import BottomSheetDialog from '../../../components/core/BottomSheetDialog';
import SendTransaction from '../../../components/account/sendTransaction';
import {useNavigation} from '@react-navigation/native';
import ReceiveQrCode from '../../../components/account/receiveQrCode';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const CardView = require('../../../assets/account-screen/card-background.png');

const AccountScreen = () => {
  const {address, balance, SignMessage} = useConnectedAccount();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <View style={styles.innerRoot}>
        <Text style={styles.homeHeading}>Home</Text>

        <ImageBackground
          borderRadius={16}
          style={styles.valueImageBackgroundContainer}
          source={CardView}
          resizeMode="cover">
          <View style={styles.valueContainer}>
            <View style={styles.cardInnerContainer}>
              <Text style={styles.valueContainerText}>Account Address</Text>
              <Text
                style={styles.valueContainerAddressText}
                numberOfLines={1}
                ellipsizeMode="middle">
                {address}
              </Text>
            </View>

            <View>
              <Text style={styles.valueContainerText}>Available Balance</Text>
              <Text style={styles.valueContainerAmountText}>
                {parseFloat(balance?.native).toFixed(4) + ' ' + balance?.symbol}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.operationBtnContainers}>
          <TouchableOpacity
            style={styles.operationBtn}
            onPress={() => {
              // @ts-ignore
              navigation.navigate('Send');
            }}>
            <Text style={styles.operationBtnText}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.operationBtn}
            onPress={() => {
              setOpen(!open);
            }}>
            <Text style={styles.operationBtnText}>Receive</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.homeHeading}>Transactions</Text>
      </View>

      {open && (
        <BottomSheetDialog setClose={setOpen}>
          <ReceiveQrCode />
        </BottomSheetDialog>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#070707',
  },

  innerRoot: {
    width: '100%',
    paddingLeft: 23,
    paddingRight: 23,
  },

  homeHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 32,
  },

  cardInnerContainer: {
    width: '100%',
    marginBottom: 20,
  },

  valueImageBackgroundContainer: {
    marginTop: 16,
  },

  valueContainer: {
    width: '100%',
    height: 184,
    padding: 12,
    paddingTop: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },

  valueContainerText: {
    fontSize: 12,
    fontWeight: 400,
    color: 'white',
  },

  valueContainerAddressText: {
    width: '40%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    // marginTop: 5,
  },

  valueContainerAmountText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    // marginTop: 5,
  },

  operationBtnContainers: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    gap: 12,
  },

  operationBtn: {
    width: '50%',
    height: 52.3,
    borderRadius: 30.02,
    backgroundColor: '#0000FC',
    marginTop: 27,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  operationBtnText: {
    width: '100%',
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 500,
  },
});

export default AccountScreen;
