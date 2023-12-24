import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT} from '../themes/themes';
import brandLogo from '../assets/images/imgs/rmlogo.png';
import brandName from '../assets/images/imgs/RevMaxx.png';
import {scale, width} from '../constants/Layout';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/shared/Button';
import InputBox from '../components/shared/InputBox';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const Signup = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [googleUserInfo, setGoogleUserInfo] = useState({});

  console.log('googleUserInfo:', googleUserInfo);

  const handleSignup = () => {};

  const handleLogin = () => {
    navigation.navigate('Log In');
  };

  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleUserInfo({userInfo});
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[COLORS.white, '#c7ddff38', COLORS.white]}
          style={styles.logoContainer}>
          <View style={styles.brandContainer}>
            <Image
              source={brandLogo}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <Image
              source={brandName}
              style={styles.brandName}
              resizeMode="contain"
            />
            <Text style={styles.tagLine}>Our Personal EHR Assistant</Text>
          </View>
        </LinearGradient>
        <View style={styles.loginContainer}>
          <Text style={styles.signupTitle}>Join Us Now</Text>
          <InputBox
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
          />
          <InputBox
            placeholder="Enter your email"
            value={username}
            onChangeText={setUsername}
          />
          <InputBox
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword={true}
          />

          <Button
            name="Sign up"
            type="primary"
            onPress={handleSignup}
            isLoading={false}
          />

          <View style={styles.alreadyAccountContainer}>
            <Text style={styles.alreadyAccount}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
              <Text
                style={[
                  styles.alreadyAccount,
                  {color: COLORS.primary, fontWeight: '600'},
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.breakContainer}>
          <View style={styles.lineBreaker} />
          <Text style={styles.orTitle}>OR</Text>
          <View style={styles.lineBreaker} />
        </View>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignup}
          style={styles.googleButton}
        /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    width: width,
    height: scale(170),
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogo: {
    alignSelf: 'center',
    width: scale(110),
    height: scale(92),
    marginBottom: scale(8),
  },
  brandName: {
    alignSelf: 'center',
  },
  tagLine: {
    color: COLORS.grey,
    fontFamily: FONT.medium,
    fontSize: scale(13),
    marginTop: scale(10),
    textAlign: 'center',
  },
  loginContainer: {
    marginTop: scale(20),
    paddingHorizontal: scale(20),
    flex: 1,
  },
  signupTitle: {
    fontFamily: FONT.bold,
    fontSize: scale(24),
    textAlign: 'center',
    marginBottom: scale(20),
  },
  breakContainer: {
    marginTop: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(30),
  },
  lineBreaker: {
    borderWidth: 0.2,
    width: '40%',
    borderColor: COLORS.lightGrey,
  },
  orTitle: {
    fontFamily: FONT.bold,
    fontSize: scale(13),
    color: COLORS.lightGrey,
  },
  googleButton: {
    alignSelf: 'center',
    marginTop: scale(20),
  },
  alreadyAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: scale(10),
  },
  alreadyAccount: {
    fontFamily: FONT.medium,
    fontSize: scale(12),
    color: COLORS.lightGrey,
  },
});
