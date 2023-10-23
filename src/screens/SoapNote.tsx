import { View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../globalStyles'
import Card from '../components/shared/Card'
import { COLORS, FONT } from '../themes/themes'
import Button from '../components/shared/Button'
import { useRoute } from '@react-navigation/native';
type RouteParams = {
    soapresponse: string;
    patient_name:string // Define the type of soapresponse
  };

export default function SoapNote() {

    const [varified, setVarified] = useState(false);
    const[soapresponse,setSoapResponse]=useState<string>('')
    const[patient_name,setPatient_name]=useState<string>('')
    const route = useRoute();
    // soapresponse:string;
    useEffect(()=>{
     const receivedsoapresponse = route.params as RouteParams;
     console.log(soapresponse,"soaptext-----")
       setSoapResponse(receivedsoapresponse.soapresponse);
       setPatient_name(receivedsoapresponse.patient_name)

    },[route.params])

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
                <Text>Patient Name : {patient_name}</Text>
                <Text>{soapresponse}</Text>
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
    }
})