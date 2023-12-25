import {View, Text, Image, StyleSheet} from 'react-native';
import {COLORS, FONT} from '../themes/themes';

export default function SplashScreen(): JSX.Element {
  return (
    <View style={styles.splashBackground}>
      <Image source={require('../assets/images/imgs/rmlogo.png')} />
      <Image source={require('../assets/images/imgs/RevMaxx.png')} />
      <Text style={styles.splashText}>Your Personal EHR Assistant</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: COLORS.white,
  },
  splashText: {
    fontFamily: FONT.medium,
    fontSize: 16,
    color: '#787878',
  },
});
