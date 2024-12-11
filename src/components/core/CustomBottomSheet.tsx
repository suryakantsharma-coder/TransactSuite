import {StyleSheet, Text, View} from 'react-native';

const CustomBottomSheet: React.FC<any> = ({children, setOpen, open, type}) => {
  return (
    <View style={styles.root}>
      <View
        style={styles.topSheet}
        onTouchStart={e => {
          if (open) {
            setOpen(false);
          }
          e.stopPropagation();
        }}></View>
      <View style={styles.bottomSheet}>
        <View style={styles.box}>
          <View style={styles.boxThumb}></View>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.85)',
    bottom: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  topSheet: {
    width: '100%',
    minHeight: '20%',
    maxHeight: '60%',
  },

  bottomSheet: {
    width: '100%',
    minHeight: '40%',
    maxHeight: '80%',
    backgroundColor: '#202020',
    zIndex: 200,
  },

  box: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxThumb: {
    width: '10%',
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: 14,
  },
});

export default CustomBottomSheet;
