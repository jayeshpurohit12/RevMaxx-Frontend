import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONT } from '../../themes/themes'
import { globalStyles } from '../../globalStyles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
// import { useAuth0 } from 'react-native-auth0';

export default function HomeScreenHeader(): JSX.Element {

    // const { clearSession, user } = useAuth0();

    const {signOut}=useAuth()
    const logout = async () => {
      signOut()
    }
    const [docName,setDocName]=useState("")

    useEffect(()=>{
        AsyncStorage.getItem('username')
        .then((username) => {
          if (username) {
            setDocName(username)
            // Use the retrieved username here
            console.log('Retrieved username:', username);
          } else {
            // Handle the case where 'username' is not found in AsyncStorage
            console.log('Username not found in AsyncStorage');
          }
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error retrieving username:', error);
        });
    },[])

    return (
        <View
            style={[globalStyles.container ,{
                backgroundColor: COLORS.white,
                elevation: 1,
                gap: 16
            }]}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View style={{
                    gap: 8
                }}>
                    <Text 
                        style={{
                            fontFamily: FONT.medium,
                            fontSize: 18,
                            color: COLORS.black
                        }}
                    >
                        Good Morning
                    </Text>
                    <Text style={{
                        fontFamily: FONT.regular,
                        fontSize: 16,
                        color: COLORS.greyText
                    }}>
                        {/* Dr. {user?.user_id} */}
                        {docName}</Text>
                </View>
                <TouchableOpacity 
                    onPress={logout}
                    style={{
                    
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 40
                    }}
                >
                    <Image
                        source={require('../../assets/images/icons/logout.png')}
                    />
                </TouchableOpacity>
            </View>
            <TextInput

                placeholder='Search for patients, appointments'
                style={{
                    backgroundColor: '#F7F9FB',
                    borderRadius: 8,
                    padding: 12,
                    fontFamily: FONT.regular,
                    fontSize: 14
                }}
            />
        </View>
    )
}