import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { globalStyles } from '../../globalStyles'
import { COLORS } from '../../themes/themes'
import { useNavigation, useRoute } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';

export default function AppointmentHeader() {
    let isiPad = DeviceInfo.getModel().includes("iPad");
    let isTablet = DeviceInfo.isTablet();
 const navigation = useNavigation();
//    const route = useRoute();
    return (
        <View
            style={[globalStyles.container, {
                //width: iPad? DeviceWidth * 0.4:isTablet? DeviceWidth * 0.4: DeviceWidth * 0.5,
                backgroundColor: COLORS.white,
                elevation: 1,
                gap:  14,
                flexDirection: 'row',
                alignItems: 'center',
            }]}
        >
              <TouchableOpacity onPress={() => navigation.navigate('Appointments')}>
                <Image
                    source={require('../../assets/images/icons/arrowleft.png')}
                />
            </TouchableOpacity>
            <View style={{
                width: '80%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <View>
                    <Text>John Doe</Text>
                    <View style={{
                        flexDirection: 'row',
                        gap: 8
                    }}>
                        <Image
                            source={require('../../assets/images/icons/clockGrey.png')}
                        />
                        <Text>12:00 PM</Text>
                    </View>
                </View>
                <View>
                    <View style={{
                        flexDirection: 'row',
                        gap: 8
                    }}>
                        <Image
                            source={require('../../assets/images/icons/calendarGrey.png')}
                        />
                        <Text>22:05:2023</Text>
                    </View>
                    <Text>Returning Visit</Text>
                </View>
            </View>
        </View>
    )
}