import {
  View,
  Text,
  Image,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Button from '../components/shared/Button';
import {COLORS, FONT} from '../themes/themes';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {scale} from '../constants/Layout';

export default function PermissionMic({navigation}: {navigation: any}) {
  // const reqMicPermission = async () => {
  //     try {
  //         const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO)
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //             console.log('You can use the mic');
  //             navigation.navigate('Permission Cam');
  //         } else {
  //             console.log('Mic permission denied');
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // }
  // const reqMicPermission = async () => {
  //     try {
  //       let microphonePermission: any;

  //       if (Platform.OS === 'android') {
  //         microphonePermission = PERMISSIONS.ANDROID.RECORD_AUDIO;
  //       } else {
  //         microphonePermission = PERMISSIONS.IOS.MICROPHONE;
  //       }
  // console.log(microphonePermission)
  //       const result = await check(microphonePermission);
  //       console.log(result,'result')

  //       if (result === RESULTS.GRANTED) {
  //         console.log('Microphone permission granted');
  //         navigation.navigate('PermissionCam');
  //       } else if (result === RESULTS.DENIED) {
  //         const requestResult = await request(microphonePermission);
  //         console.log(requestResult,'requestResult')
  //         if (requestResult === RESULTS.GRANTED) {
  //           console.log('Microphone permission granted');
  //           navigation.navigate('PermissionCam');
  //         } else {
  //           console.log('Microphone permission denied');
  //         }
  //       } else {
  //         console.log('Microphone permission denied');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  const reqMicPermission = () => {
    console.log();
    check(PERMISSIONS.IOS.MICROPHONE).then(response => {
      console.log(response);
    });

    request(PERMISSIONS.IOS.MICROPHONE).then(response => {
      navigation.navigate('Log In');
      console.log(response);
    });
  };

  return (
    <>
      <Image
        source={require('../assets/images/imgs/PermisionMicImg.png')}
        style={{width: scale(250), height: scale(250)}}
        resizeMode="contain"
      />
      <View
        style={{
          width: '100%',
          gap: scale(24),
        }}>
        <Text style={styles.titleText}>
          Microphone access is required for the app to work
        </Text>
        <Button
          name={`Request Microphone Permission`}
          type={'primary'}
          onPress={reqMicPermission}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: FONT.medium,
    fontSize: scale(18),
    color: COLORS.mediumGreyText,
    textAlign: 'center',
    textTransform: 'capitalize',
    padding: scale(10),
  },
});
