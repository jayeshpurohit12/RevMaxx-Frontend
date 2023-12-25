import {View, Text, Image, StyleSheet, PermissionsAndroid} from 'react-native';
import Button from '../components/shared/Button';
import {COLORS, FONT} from '../themes/themes';

export default function PermissionMic({navigation}: {navigation: any}) {
  const reqCamPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        navigation.navigate('Everything Is Set');
      } else {
        console.log('Mic permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Image source={require('../assets/images/imgs/PermisionCamImg.png')} />
      <View
        style={{
          width: '100%',
          gap: 24,
        }}>
        <Text style={styles.titleText}>Camera access is required</Text>
        <Button
          name={`Request Camera Permission`}
          type={'primary'}
          onPress={reqCamPermission}
        />
        <Button
          name={`Skip`}
          type={'secondary'}
          onPress={() => navigation.navigate('Log In')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONT.medium,
    fontSize: 20,
    color: COLORS.mediumGreyText,
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: 10,
  },
});
