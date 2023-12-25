import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import Button from '../components/shared/Button';
import {FONT, COLORS} from '../themes/themes';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import brandLogo from '../assets/images/imgs/rmlogo.png';
import brandName from '../assets/images/imgs/RevMaxx.png';
import {scale, width} from '../constants/Layout';
import InputBox from '../components/shared/InputBox';

export default function LogIn({navigation}: {navigation: any}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // To track loading state

  const {signIn} = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true); // Start loading

      const response = await axios.post(
        'http://revmaxx.us-east-1.elasticbeanstalk.com/doctorLogin',
        {
          username: username,
          password: password,
        },
      );

      console.log('provider_id:', response.data[0].provider_id);
      console.log('username:', response.data[0].username);
      const data = response.data[0];

      if (data !== null) {
        signIn(data.provider_id);
        AsyncStorage.setItem('provider_id', data.provider_id);
        AsyncStorage.setItem('username', data.username);
        navigation.navigate('Main');
      } else {
        // Handle cases where login is unsuccessful (e.g., invalid credentials)
        Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
      }
    } catch (error: any) {
      // Handle API request error
      console.error('Error:', error);
      Alert.alert('Error', JSON.stringify(error));
    } finally {
      setIsLoading(false); // Stop loading regardless of success or failure
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handlePrivacyPolicyPress = () => {
    // Define the URL of your Privacy Policy page
    const privacyPolicyUrl = 'https://revmaxx.co/privacy-policy';

    // Open the Privacy Policy page in the device's default browser
    Linking.openURL(privacyPolicyUrl);
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
          <Text style={styles.welcomeTitle}>Welcome to RevMaxx</Text>
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

          <Text style={styles.privacyTextContainer}>
            By continuing you agree to revmax's{' '}
            <Text
              style={{color: COLORS.primary}}
              onPress={handlePrivacyPolicyPress}>
              Terms & Conditions Privacy Policy
            </Text>
          </Text>

          <View style={styles.bottomButtonContainer}>
            <Button
              name="Log In"
              type="primary"
              onPress={handleLogin}
              isLoading={isLoading}
            />
            <View style={{marginTop: scale(20)}}>
              <Button name="Sign up" type="secondary" onPress={handleSignup} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

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
    paddingHorizontal: scale(20),
    flex: 1,
  },
  welcomeTitle: {
    fontFamily: FONT.bold,
    fontSize: scale(24),
    textAlign: 'center',
    marginBottom: scale(20),
    marginTop: scale(20),
  },
  privacyTextContainer: {
    fontSize: scale(12),
    fontFamily: FONT.medium,
    color: COLORS.lightGrey,
    marginTop: scale(10),
  },
  bottomButtonContainer: {
    alignSelf: 'center',
    marginTop: scale(30),
    width: '100%',
  },
});
