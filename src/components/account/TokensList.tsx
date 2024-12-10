import {Button, Image, StyleSheet, Text, View} from 'react-native';
import useTokens, {TokenData} from '../../hooks/useTokens';
import {formatUnits} from 'ethers';

const RowList = () => {
  return <View>{/* <Image source={} alt="token-images" /> */}</View>;
};

const TokensList = () => {
  const {tokens, setRefresh} = useTokens();
  return (
    <View>
      <Text style={styles.homeHeading}>Tokens</Text>
      {tokens?.map((item: TokenData, index: number) => {
        return (
          <View key={index} style={styles.rowContainer}>
            <Image
              style={styles.rowImage}
              source={{uri: item.logo}}
              alt="token_logo"
            />
            <View style={styles.rowTextContainer}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowBalance}>{item.symbol}</Text>
            </View>
            <View style={styles.rowTextContainer2}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <Text style={styles.rowBalance}>
                {formatUnits(item.balance, item.decimals)}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  homeHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 32,
  },

  rowContainer: {
    width: '100%',
    padding: 8,
    backgroundColor: '#202020',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 10,
  },

  rowImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  rowTextContainer: {
    width: '60%',
  },

  rowTextContainer2: {
    width: '40%',
  },

  rowTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },

  rowBalance: {
    fontSize: 12,
    color: 'gray',
  },
});

export default TokensList;
