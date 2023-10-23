import { View, Text, Image } from 'react-native'
import React from 'react'
import { globalStyles } from '../../globalStyles'
import { COLORS } from '../../themes/themes'

export default function AppointmentHeader() {
    return (
        <View
            style={[globalStyles.container, {
                backgroundColor: COLORS.white,
                elevation: 1,
                gap: 16,
                flexDirection: 'row',
                alignItems: 'center',
            }]}
        >
            <Image
                source={require('../../assets/images/icons/arrowleft.png')}
            />
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