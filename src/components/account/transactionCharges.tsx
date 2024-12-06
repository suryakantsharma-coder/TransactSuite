import {StyleSheet, View, Text} from 'react-native';
import useCalculatorTransactionCost from '../../hooks/useCalculateTransactionCost';
import {useEffect} from 'react';

interface transactionChargesParams {
  amount: number;
}

const TransactionCharges = ({amount}: transactionChargesParams) => {
  const {setCurrentParams, data, fees, getCurrentPrice} =
    useCalculatorTransactionCost();

  useEffect(() => {
    console.log('fees : ', data);
    getCurrentPrice();
  }, [data]);
  return (
    <View style={styles.root}>
      <Text style={styles.headerH1}>Transaction Charges</Text>

      <View style={styles.container}>
        <Text style={styles.paragraphP1}>{'Trx fees: '}</Text>
        <Text style={styles.paragraphP1}>{fees}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.paragraphP1}>{'Total value: '}</Text>
        <Text style={styles.paragraphP1}>
          {parseFloat(fees || '0.0') + (amount || 0)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 'auto',
    padding: 6,
  },

  headerH1: {
    fontSize: 18,
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
  },

  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderBottomColor: '#ddd',
    marginBottom: 24,
  },

  paragraphP1: {
    color: '#FFFFFF',
  },
});

export default TransactionCharges;
