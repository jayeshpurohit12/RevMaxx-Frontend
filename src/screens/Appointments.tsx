import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../globalStyles'
import { COLORS, FONT } from '../themes/themes'
import Card from '../components/shared/Card'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Appointments({ navigation }: { navigation: any }) {
    const [pid, setPid] = useState("")
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('provider_id')
            .then((provider_id) => {
                if (provider_id) {
                    setPid(provider_id);
                    console.log('Retrieved pid:', pid);
                } else {
                    console.log('provider_id not found in AsyncStorage');
                }
            })
            .catch((error) => {
                console.error('Error retrieving provider_id:', error);
            });

        axios.get(`http://192.168.29.10:4500/getAppointmentsByPid?provider_id=${pid}`)
            .then((res) => {
                console.log(res.data, "Appointment data");
                setAppointments(res.data);
                setIsLoading(false); // Set loading to false after data is fetched
            })
            .catch(err => {
                console.log(err);
                setIsLoading(false); // Set loading to false on error
            });
    }, [pid]);

    return (
        <ScrollView>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                Array.isArray(appointments) && appointments.map((item, index) => (
                    <Card
                        key={index}
                        type='large'
                        onPress={() => navigation.navigate('Recording', { "patient_name": item.patient_name })}
                        content={
                            <View style={styles.cardContent}>
                                <View style={{ gap: 8 }}>
                                    <Text style={styles.title}>{item.patient_name}</Text>
                                    <Text style={styles.type}>{item.type}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                                    <Image
                                        source={require('../assets/images/icons/clock.png')}
                                    />
                                    <Text style={styles.date}>{item.appointmentTime}</Text>
                                </View>
                            </View>
                        }
                    />
                ))
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textBlue: {
        fontFamily: FONT.medium,
        fontSize: 14,
        color: COLORS.primary
    },

    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    title: {
        fontFamily: FONT.bold,
        fontSize: 16,
        color: COLORS.mediumGreyText
    },

    type: {
        fontFamily: FONT.medium,
        fontSize: 14,
        color: COLORS.greyText
    },

    date: {
        fontFamily: FONT.medium,
        fontSize: 14,
        color: COLORS.mediumGreyText
    },
})
