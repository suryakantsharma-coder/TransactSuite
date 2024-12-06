import React, {useCallback, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

const BottomSheetDialog: React.FC<any> = ({children, setClose}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleSheetClose = () => {
    console.log('handleSheetChanges');
    setClose(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        onClose={handleSheetClose}
        enablePanDownToClose
        handleStyle={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: '#141414',
        }}
        handleIndicatorStyle={{
          backgroundColor: 'white',
        }}>
        <BottomSheetView style={styles.contentContainer}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
  },
});

export default BottomSheetDialog;
