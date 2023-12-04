import {
  View,
  Text,
  Image,
  TextInput,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import Button from '../components/shared/Button';
import {FONT, COLORS} from '../themes/themes';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthContext';

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
  const handlePrivacyPolicyPress = () => {
    // Define the URL of your Privacy Policy page
    const privacyPolicyUrl = 'https://www.flipkart.com/pages/privacypolicy'; // Replace with your actual Privacy Policy URL

    // Open the Privacy Policy page in the device's default browser
    Linking.openURL(privacyPolicyUrl);
  };

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          //flex: 1,
          gap: 12,
        }}>
        <Image source={require('../assets/images/imgs/rmlogo.png')} />
        <Image source={require('../assets/images/imgs/RevMaxx.png')} />
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 16,
            color: '#787878',
          }}>
          Digital Care. Superpowered.
        </Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          gap: 24,
          width: '100%',
        }}>
        <Text
          style={{
            //fontFamily: FONT.bold,
            fontSize: 24,
            color: COLORS.black,
            fontWeight: '500',
          }}>
          Welcome To RevMaxx
        </Text>
        <View
          style={{
            width: '100%',
            gap: 12,
            height: '40%',
            // backgroundColor: 'red',

            // borderWidth:10,
            // borderColor: 'red',
            // borderRadius:10,
            //           alignSelf: 'center',
            // flex: 0.5,
            // justifyContent: 'center',
          }}>
          <View
            style={{
              height: COLORS.devicewidth * 0.13,
              backgroundColor: COLORS.white,
              borderWidth: COLORS.devicewidth * 0.003,
              //borderColor: COLORS.borderColor,
              borderRadius: COLORS.devicewidth * 0.03,
              alignSelf: 'center',
              gap: 10,
              // flex: 0.5,
              justifyContent: 'center',
            }}>
            <TextInput
              textContentType={'emailAddress'}
              placeholder={'Enter your email'}
              placeholderTextColor="#000"
              value={username}
              onChangeText={text => setUsername(text)}
              style={{
                marginLeft: COLORS.devicewidth * 0.02,
                width: COLORS.devicewidth * 0.8,
                fontSize: COLORS.devicewidth * 0.04,
                height: COLORS.deviceheight * 0.065,
                color: 'black',
              }}
            />
          </View>
          <View
            style={{
              height: COLORS.devicewidth * 0.13,
              backgroundColor: COLORS.white,
              borderWidth: COLORS.devicewidth * 0.003,
              //borderColor: COLORS.borderColor,
              borderRadius: COLORS.devicewidth * 0.03,
              alignSelf: 'center',
              gap: 10,
              justifyContent: 'center',
            }}>
            <TextInput
              textContentType={'password'}
              secureTextEntry={true}
              placeholder={'Enter your password'}
              placeholderTextColor="#000"
              value={password}
              onChangeText={text => setPassword(text)}
              style={{
                marginLeft: COLORS.devicewidth * 0.02,
                width: COLORS.devicewidth * 0.8,
                fontSize: COLORS.devicewidth * 0.04,
                height: COLORS.deviceheight * 0.065,
                color: 'black',
              }}
            />
          </View>
          <View style={{     gap: 12,}}></View>
          <View style={{}}>
            <Text
              style={{fontFamily: FONT.medium, fontSize: 10, color: '#787878'}}>
              By continuing you agree to revmax's{' '}
            
           
              <Text style={{color: COLORS.primary}} onPress={handlePrivacyPolicyPress}>
              Terms & Conditions Privacy Policy
        </Text>
            </Text>
          </View>
        </View>
        <View style={{     gap: 20}}></View>
        {/* Loading Indicator */}
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : (
          <View style={{    width: COLORS.devicewidth * 0.8, height:COLORS.deviceheight * 0.01,  gap: 20}}>
          <Button name={`Log In`} type={'primary'} onPress={handleLogin} />
          </View>
        )}
      </View>
    </>
  );
}
