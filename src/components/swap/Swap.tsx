import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useSwapHook from '../../hooks/useSwapHook';
import {trendingTokens} from '../../data/shusiswap';
import {useEffect, useState} from 'react';
import CustomBottomSheet from '../core/CustomBottomSheet';
import {ScrollView} from 'react-native-gesture-handler';

const SwapComponent = () => {
  const {
    setOpen,
    tokenIn,
    open,
    selectedTokens,
    trendingToken,
    handleSelectedToken,
    handleValue,
    tokenInAmount,
  } = useSwapHook();

  useEffect(() => {
    console.log(selectedTokens);
  }, [selectedTokens]);
  return (
    <View style={styles.root}>
      <View style={styles.innerContainer}>
        <Text style={styles.headingH1}>Swap</Text>

        <ScrollView>
          <View style={styles.inputBoxContainer}>
            <View style={styles.tokenSelectedSection}>
              <Image
                style={styles.tokenIcon}
                source={{
                  uri:
                    tokenIn?.logo ||
                    'https://cdn.sushi.com/image/upload/f_auto,c_limit,w_32/d_unknown.png/native-currency/ethereum.svg',
                }}
                alt="token-icon"
              />
              <Text style={styles.textSymbol}>{tokenIn?.symbol || ''}</Text>
            </View>
            <TextInput
              style={styles.inputBox}
              placeholder="0.001"
              onChangeText={text => {
                handleValue(parseFloat(text));
              }}></TextInput>
          </View>

          <View style={styles.swapIconContainer}>
            <Image
              style={styles.swapIcon}
              source={{
                uri: 'https://cdn.iconscout.com/icon/free/png-512/free-swap-icon-download-in-svg-png-gif-file-formats--vertical-arrow-up-down-google-material-vol-3-pack-user-interface-icons-32121.png?f=webp&w=256',
              }}
              alt="token-icon"
            />
          </View>

          {selectedTokens?.map((item: trendingTokens, index: number) => {
            return (
              <View key={index} style={styles.inputBoxContainer}>
                <View style={styles.tokenSelectedSection}>
                  <Image
                    style={styles.tokenIcon}
                    source={{
                      uri: `https://cdn.sushi.com/image/upload/f_auto,c_limit,w_40/d_unknown.png/tokens/137/${item.address}.jpg`,
                    }}
                    alt="token-icon"
                  />
                  <Text style={styles.textSymbol}>{item?.symbol}</Text>
                </View>
                <Text style={styles.inputBox}>
                  {tokenInAmount / selectedTokens.length}
                </Text>
              </View>
            );
          })}

          <TouchableOpacity
            style={styles.addToken}
            onPress={() => {
              setOpen(!open);
            }}>
            <Text style={styles.addTokenText}>ADD MORE TOKEN</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {open && (
        <CustomBottomSheet setOpen={setOpen} open={open}>
          <View style={styles.rootContainer}>
            <View
              style={{
                height: 500,
              }}>
              <FlatList
                data={trendingToken}
                renderItem={({item}) => {
                  let isSelected = false;

                  const isFound = selectedTokens?.filter((data: any) =>
                    data.symbol == item.symbol ? data : false,
                  );

                  if (isFound?.length > 0) isSelected = true;

                  return (
                    <TouchableOpacity
                      style={
                        isSelected || isFound?.length > 0
                          ? styles.tokenSelectedSectionsSelected
                          : styles.tokenSelectedSections
                      }
                      onPress={() => {
                        // @ts-ignore
                        handleSelectedToken(item);

                        if (isFound?.length > 0) {
                          isSelected = false;
                        }
                      }}>
                      <Image
                        style={styles.tokenIconList}
                        source={{
                          uri: `https://cdn.sushi.com/image/upload/f_auto,c_limit,w_40/d_unknown.png/tokens/137/${item.address}.jpg`,
                        }}
                        alt="token-icon"
                      />
                      <Text
                        style={
                          isSelected || isFound?.length > 0
                            ? styles.textSymbolSelected
                            : styles.textSymbol
                        }>
                        {item.symbol}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={item => item.symbol}
                numColumns={2}
                contentContainerStyle={{padding: 10, gap: 10}}
              />
            </View>

            <TouchableOpacity
              style={{
                ...styles.continueButton,
                marginBottom: 40,
              }}
              onPress={() => {
                setOpen(false);
              }}>
              <Text style={styles.addTokenText}>Continue</Text>
            </TouchableOpacity>

            {/* {trendingToken?.map((item: trendingTokens, index: number) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.tokenSelectedSections}
                    onPress={() => {
                      // @ts-ignore
                      handleSelectedToken(item);
                      setOpen(false);
                    }}>
                    <Image
                      style={styles.tokenIconList}
                      source={{
                        uri: `https://cdn.sushi.com/image/upload/f_auto,c_limit,w_40/d_unknown.png/tokens/137/${item.address}.jpg`,
                      }}
                      alt="token-icon"
                    />
                    <Text style={styles.textSymbol}>{item.symbol}</Text>
                  </TouchableOpacity>
                );
              })} */}
          </View>
        </CustomBottomSheet>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
  },

  innerContainer: {
    width: '100%',
    paddingLeft: 23,
    paddingRight: 23,
  },

  headingH1: {
    fontSize: 22,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 40,
    marginTop: 20,
  },

  inputBoxContainer: {
    width: '100%',
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#202020',
    borderRadius: 12,
    padding: 8,
    gap: 6,
    marginBottom: 20,
  },

  tokenSelectedSection: {
    minWidth: 100,
    backgroundColor: '#070707',
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    gap: 6,
  },

  tokenIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },

  textSymbol: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },

  inputBox: {
    width: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white',
  },

  swapIconContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  swapIcon: {
    width: 40,
    height: 40,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    objectFit: 'cover',
    backgroundColor: 'white',
    borderRadius: 50,
  },

  addToken: {
    width: '100%',
    height: 50,
    borderRadius: 20,
    backgroundColor: '#0202FC',
    color: 'White',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  continueButton: {
    width: '86%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#0202FC',
    color: 'White',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 10,
  },

  addTokenText: {
    width: '100%',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  rootContainer: {
    width: '100%',
    minHeight: 500,
    padding: 10,
  },

  tokenSelectedSections: {
    width: '43%',
    minHeight: 50,
    backgroundColor: '#404040',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
    marginLeft: 20,
  },

  tokenSelectedSectionsSelected: {
    width: '43%',
    minHeight: 50,
    backgroundColor: '#0707FC',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    padding: 12,
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
    marginLeft: 20,
    borderColor: '#0707FC',
    borderWidth: 2,
  },

  tokenIconList: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  gridView: {
    width: 'auto',
  },

  textSymbolSelected: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SwapComponent;
