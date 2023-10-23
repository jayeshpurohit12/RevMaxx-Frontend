import { View, Text, Image,TextInput } from 'react-native'
import Button from '../components/shared/Button'
import { FONT, COLORS } from '../themes/themes'
import { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'


// import { useAuth0 } from 'react-native-auth0';
// import {AsyncStorage} from 'react-native'

export default function LogIn({ navigation }: { navigation: any }) {

 //  const navigation = useNavigation();
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const { signIn } = useAuth();
    

    const handleLogin = async () => {
        try {
          const response = await axios.post('http://192.168.29.10:4500/doctorLogin', {
            username: username,
            password: password,
          });
    
          // Handle the response, e.g., check for success or errors.
          console.log('provider_id:', response.data[0].provider_id);
          console.log('username:', response.data[0].username);
          const data=response.data[0]
          if(data!==null){
            signIn(data.provider_id);
            AsyncStorage.setItem('provider_id', data.provider_id);
            AsyncStorage.setItem('username', data.username);
            navigation.navigate("Main")
          }
          
       

          // Optionally, you can navigate to another screen based on the response.
          // navigation.navigate('NextScreen'); // If you're using React Navigation.
        } catch (error) {
          // Handle any errors here.
          console.error('Error:', error);
        }
      };

    return (
        <>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 12
                }}
            >
                <Image
                    source={require('../assets/images/imgs/rmlogo.png')}
                />
                <Image
                    source={require('../assets/images/imgs/RevMaxx.png')}
                />
                <Text
                    style={{
                        fontFamily: FONT.medium,
                        fontSize: 16,
                        color: '#787878'
                    }}
                >
                    Digital Care. Superpowered.
                </Text>
            </View>
            <View style={{
                alignItems: 'center',
                gap: 24,
                width: '100%'
            }}>
                <Text style={{
                    fontFamily: FONT.bold,
                    fontSize: 24,
                    color: COLORS.primary
                }}>
                    Welcome To RevMaxx
                </Text>
                <View style={{
                    width: '100%',
                    gap: 12
                }}>
                    <TextInput
                        textContentType={'emailAddress'}
                        placeholder={'Enter your email'}
                        placeholderTextColor='#909090'
                        value={username}
                        onChangeText={(text) => setUsername(text)}
                    />
                    <TextInput
                        textContentType={'password'}
                        secureTextEntry={true}
                        placeholder={'Enter your password'}
                        placeholderTextColor='#909090'
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                {/* Login */}
                <Button
                    name={`Log In`}
                    type={'primary'}
                    onPress={handleLogin}
                />
                {/* <TouchableHighlight onPress={onPress} style={styles.drchronoButton}>
                    <Text style={styles.drchronoButtonText}>Login with Dr.Chrono</Text>
                </TouchableHighlight> */}
            </View>
        </>
    )
}