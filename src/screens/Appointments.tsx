import { View, Text, ScrollView, StyleSheet, Image ,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../globalStyles'
import { COLORS, FONT } from '../themes/themes'
import Card from '../components/shared/Card'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Appointments({ navigation }: { navigation: any }) {
    const [pid,setPid]=useState("")
    const [appointments,setAppointments]= useState<any[]>([]);
   useEffect(()=>{


    AsyncStorage.getItem('provider_id')
    .then((provider_id) => {
      if (provider_id) {
        setPid(provider_id)
        // Use the retrieved username here
        console.log('Retrieved pid:', pid);
      } else {
        // Handle the case where 'username' is not found in AsyncStorage
        console.log('provider_id not found in AsyncStorage');
      }
    })
    .catch((error) => {
      // Handle any errors here
      console.error('Error retrieving provider_id:', error);
    });
    axios.get(`http://192.168.29.10:4500/getAppointmentsByPid?provider_id=${pid}`).then((res)=>{
        console.log(res.data,"Appointment data")
        setAppointments(res.data)
        console.log(appointments,"appointments")
    }).catch(err=>console.log(err))
   },[pid])

    return (
        <ScrollView>
        {/* Render the FlatList to display appointments */}
        {/* <FlatList
          data={appointments}
          keyExtractor={(item) => item.mrn}
          renderItem={({ item }) => (
            // Render each appointment using a Card component or your custom component
            <>
              <View style={styles.cardContent}>
                <Text style={styles.title}>{item.patient_name}</Text>
                <Text style={styles.date}>{item.appointmentTime}</Text>
              </View>
              <Text style={styles.type}>{item.type}</Text>
           </>
          )}
        /> */}

{Array.isArray(appointments)  && appointments.map((item, index) => (
                    <Card
                        key={index}
                        type='large'
                        onPress={() => navigation.navigate('Recording',{"patient_name":item.patient_name})}
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
                ))}
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