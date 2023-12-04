import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONT} from '../../themes/themes';
import {globalStyles} from '../../globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../context/AuthContext';
import DeviceInfo from 'react-native-device-info';
// import { useAuth0 } from 'react-native-auth0';

export default function HomeScreenHeader(): JSX.Element {
  // const { clearSession, user } = useAuth0();
  let isiPad = DeviceInfo.getModel().includes("iPad");
  let isTablet = DeviceInfo.isTablet();
  const {signOut} = useAuth();
  const logout = async () => {
    signOut();
  };
  const [docName, setDocName] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('username')
      .then(username => {
        if (username) {
          setDocName(username);
          // Use the retrieved username here
          console.log('Retrieved username:', username);
        } else {
          // Handle the case where 'username' is not found in AsyncStorage
          console.log('Username not found in AsyncStorage');
        }
      })
      .catch(error => {
        // Handle any errors here
        console.error('Error retrieving username:', error);
      });
  }, []);

  return (
    <View
      style={[
        globalStyles.container,
        {
          // backgroundColor: 'red',
          // flex:1,
          elevation: 1,

          gap: 30,

        },
      ]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
            // backgroundColor:'red',
         // marginTop: 100,
        // gap:15,
          //height: 20,
        }}>
        <View
          style={{
            gap: 15,
          //  marginBottom:10
            //paddingVertical:10
          }}>
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 18,
              //gap:5,
              color: COLORS.black,
           
            }}>
            Good Morning
          </Text>
          <Text
            style={{
              fontFamily: FONT.regular,
              fontSize: 16,
              gap:15,
              color: COLORS.greyText,
            }}>
            {/* Dr. {user?.user_id} */}
            {docName}
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          style={{
            width: 30,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 40,
          }}>
          <Image source={require('../../assets/images/icons/logout.png')} />
        </TouchableOpacity>
      </View>
      <TextInput
        placeholder="Search for patients, appointments"
        style={{
          backgroundColor: '#F7F9FB',
          borderRadius: 8,
          padding: 12,
          fontFamily: FONT.regular,
          fontSize: 14,
        }}
      />
    </View>
  );
}
