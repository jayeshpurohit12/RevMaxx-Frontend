import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../globalStyles'
import Card from '../components/shared/Card'
import { COLORS, FONT } from '../themes/themes'
import Button from '../components/shared/Button'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'
type RouteParams = {
    soapresponse: string;
    patient_name:string // Define the type of soapresponse
  };

export default function SoapNote() {

    const [varified, setVarified] = useState(false);
    const[soapresponse,setSoapResponse]=useState<string>('')
    const[patient_name,setPatient_name]=useState<string>('')
    const [pid,setPid]=useState("")
    const route = useRoute();
    // soapresponse:string;
    useEffect(()=>{
        AsyncStorage.getItem('provider_id')
        .then((provider_id) => {
          if (provider_id) {
            setPid(provider_id)
            // Use the retrieved username here
            console.log('Retrieved pid in soapnote page:', pid);
          } else {
            // Handle the case where 'username' is not found in AsyncStorage
            console.log('provider_id not found in AsyncStorage');
          }
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error retrieving provider_id:', error);
        });

        
     const receivedsoapresponse = route.params as RouteParams;
     console.log(soapresponse,"soaptext-----")
       setSoapResponse(receivedsoapresponse.soapresponse);
       setPatient_name(receivedsoapresponse.patient_name)
       if(soapresponse){
        saveSoapNote()
       }else{
        return
       }
       

    },[route.params,pid])

    const saveSoapNote=()=>{
        const dataObj={
            "provider_id":pid,
            "soapnote":soapresponse

        }
        axios.post("http://192.168.29.10:4500/addSoapNote",dataObj).
        then(res=>console.log(res.data,"soapnote added response")).
        catch(err=>console.log(err))
    }

    const prevRecordings = [
        {
            date: '2nd July',
            time: '20:00 AM',
            transcribed: true,
        },
        {
            date: '2nd July',
            time: '20:00 AM',
            transcribed: true,
        },
    ]

    return (
        <ScrollView>
            <View style={[globalStyles.container, { gap: 18, justifyContent: 'space-between', height: '100%' }]}>
                {/* <View style={{
                    gap: 18
                }}>
                    {!varified && (
                        <Card
                            type='large'
                            content={
                                <>
                                    <Text style={styles.headTextSmall}>Recordings</Text>
                                    <View style={{
                                        gap: 10
                                    }}>
                                        {prevRecordings.map((item, index) => (
                                            <View
                                                key={index}
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Text>{item.date}, {item.time}</Text>
                                                <Text style={styles.headTextSmall}>{item.transcribed ? 'Transcribed' : 'Note Transcribed'}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            }
                        />
                    )}

                    <Card
                        type='large'
                        content={
                            <>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        gap: 8
                                    }}>
                                        <Text style={styles.headTextLarge}>SOAP Note</Text>
                                        {varified && (
                                            <Image
                                                source={require('../assets/images/icons/verify.png')}
                                            />
                                        )}
                                    </View>
                                    <Image
                                        source={require('../assets/images/icons/edit.png')}
                                    />
                                </View>
                            </>
                        }
                    />
                </View>
                {varified ? (
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <Button
                            name='Send to Patient'
                            size='small'
                        />
                        <Button
                            name='Send to EHR'
                            size='small'
                        />
                    </View>
                ) : (
                    <Button
                        name='Verify and Sign'
                        onPress={() => setVarified(true)}
                    />
                )} */}
                <Text style={styles.headTextLarge}>Patient Name : {patient_name}</Text>
                <Text style={styles.headSoapNotetext}>{soapresponse}</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headTextSmall: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.primary,
    },
    headTextLarge: {
        fontFamily: FONT.medium,
        fontSize: 18,
        color: COLORS.primary,
    },
    headSoapNotetext: {
        fontFamily: FONT.medium,
        fontSize: 18,
        color: COLORS.black,
    }
})