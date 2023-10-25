import { View, Text, StyleSheet, TouchableOpacity, Image, Button, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import { globalStyles } from '../globalStyles'
import { COLORS, FONT } from '../themes/themes'
import Card from '../components/shared/Card';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
type RouteParams = {
    patient_name: string; // Define the type of soapresponse
  };


const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Recording({ navigation }: { navigation: any }) {
    
    const [startRecord, setStartRecord] = useState(false);
    const [recording, setRecoding] = useState(false);
    const [recordState, setRecordState] = useState({
        recordSecs: 0,
        recordTime: '00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00',
        duration: '00:00',
      });
      const [soapresponse,setSoapResponse]=useState("")
      const[patient_name,setPatient_name]=useState<string>('')
      const route = useRoute();

      useEffect(() => {
        // Use this useEffect to handle navigation when soapresponse is available
        const receivedpatientname = route.params as RouteParams;
        console.log(receivedpatientname,"patient_name")
        setPatient_name(receivedpatientname.patient_name)
        console.log(patient_name,"patient_name")
        // if (soapresponse && patient_name) {
        //     navigation.navigate('SoapNote', { soapresponse,patient_name })
        // }
       
    }, [soapresponse,patient_name])

    



   const startRecording=async ()=>{
        setStartRecord(true);
        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
          setRecordState({
            ...recordState,
            recordSecs: e.currentPosition,
            recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          });
        });
        console.log(result,"startRecording");
    }

    const stopRecording=async ()=>{
        setRecoding(true)
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setRecordState({
        ...recordState,
        recordSecs: 0,
        });
        console.log(result,"stopRecording");
        getAudioFile(result);
    }

    const getAudioFile = async (result:any) => {
        console.log('Path:', result);
        const formData = new FormData();
        formData.append('sound', {
          uri: result,
          type: 'audio/mp4',
          name: 'sound.mp4',
        });
    
        // fetch('http://192.168.0.106:4500/upload', {
        //   method: 'POST',
        //   body: formData,
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   },
        // })
        //   .then(response => response.json())
        //   .then(data => {
        //     console.log('Upload successful', data);
        //   })
        //   .catch(error => {
        //     console.error('Upload Error', error);
        //   });



          const config = {
            method: 'post',
            url: 'http://192.168.29.10:4500/upload',
            headers: {
                "Content-Type": "multipart/form-data",
            },
            data: formData,
          };
          
          axios(config)
            .then(response => {
              console.log('Upload successful', response.data);
              setSoapResponse(response.data)
             // console.log("soapresponse",soapresponse)
            })
            .catch(error => {
              console.error('Upload Error', error);
            });

          
      };
      const onStartPlay=async ()=>{
        console.log('onStartPlay');
        const msg = await audioRecorderPlayer.startPlayer();
        audioRecorderPlayer.addPlayBackListener((e) => {
            setRecordState((prevState) => ({
              ...prevState,
              currentPositionSec: e.currentPosition,
              currentDurationSec: e.duration,
              playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
              duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
            }));
          });
        console.log(msg);
      }



    return (
        <View style={[globalStyles.container, { gap: 18, alignItems: 'center', justifyContent: 'space-between', height: '100%', paddingVertical: 60 }]}>
            {!recording ? (
                <View style={{
                    width: '80%',
                    marginVertical: 'auto',
                    gap: 8,
                }}>
                    <Text style={styles.title}>Press the Button to Start Recording</Text>
                    <Text style={styles.des}>Speak naturally with your patients.</Text>
                </View>
            ) : (
                <Card
                    type='large'
                    content={
                        <View style={{
                            gap: 20
                        }}>
                            <Text style={{
                                fontFamily: FONT.medium,
                                fontSize: 18,
                                color: COLORS.primary,
                            }}>Live Transcription</Text>
                            <Text style={{
                                fontFamily: FONT.regular,
                                fontSize: 16,
                                color: COLORS.mediumGreyText,
                            }}>Example Text</Text>
                        </View>
                    }
                />
            )}

            <View style={{
                gap: 26,
                alignItems: 'center'
            }}>

                <Button title="Start Playing" onPress={onStartPlay} />

                {startRecord && (
                    <>
                        <View style={{
                            alignItems: 'center',
                            gap: 4,
                        }}>
                            <Text style={[styles.textRecord, { fontSize: 24 }]}>00:01</Text>
                            <Text style={styles.textRecord}>Recording</Text>
                        </View>

                        <Image
                            source={require('../assets/images/imgs/record.png')}
                        />
                    </>
                )}

                {/* Record Button */}
                {!startRecord ? (
                    <TouchableOpacity onPress={startRecording} style={{
                        backgroundColor: COLORS.primaryLight,
                        padding: 12,
                        borderRadius: 999
                    }}>
                        <View style={{
                            backgroundColor: COLORS.primary,
                            padding: 40,
                            borderRadius: 999
                        }}>
                            <View style={{
                                backgroundColor: COLORS.white,
                                padding: 12,
                                borderRadius: 999
                            }}></View>
                        </View>
                    </TouchableOpacity>
                ) : (
                    !recording ? (
                        <TouchableOpacity onPress={stopRecording} style={{
                            backgroundColor: COLORS.primaryLight,
                            padding: 12,
                            borderRadius: 999
                        }}>
                            <View style={{
                                backgroundColor: COLORS.red,
                                padding: 40,
                                borderRadius: 999
                            }}>
                                <View style={{
                                    backgroundColor: COLORS.white,
                                    padding: 12,
                                    borderRadius: 999
                                }}></View>
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: 40
                        }}>

                            <TouchableOpacity onPress={() => { setStartRecord(false), setRecoding(false) }} style={{
                                backgroundColor: COLORS.primary,
                                padding: 12,
                                borderRadius: 99
                            }}>
                                <Image
                                    source={require('../assets/images/icons/trash.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => navigation.navigate('SoapNote',{soapresponse})} style={{
                                backgroundColor: COLORS.primaryLight,
                                padding: 12,
                                borderRadius: 999
                            }}>
                                <View style={{
                                    backgroundColor: COLORS.red,
                                    padding: 40,
                                    borderRadius: 999
                                }}>
                                    <View style={{
                                        backgroundColor: COLORS.white,
                                        padding: 12,
                                        borderRadius: 4
                                    }}></View>
                                </View>
                            </TouchableOpacity>

                            {soapresponse && (
                                <TouchableOpacity
                                onPress={() => navigation.navigate('SoapNote', { soapresponse, patient_name })}
                                style={{
                                backgroundColor: COLORS.primary,
                                padding: 12,
                                borderRadius: 99
                                }}
                                >
                                <Image source={require('../assets/images/icons/scribe.png')} />
                                </TouchableOpacity>
)}
                        </View>
                    )
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontFamily: FONT.bold,
        fontSize: 20,
        color: COLORS.mediumGreyText,
        textAlign: 'center'
    },
    des: {
        fontFamily: FONT.regular,
        fontSize: 14,
        color: COLORS.greyText,
        textAlign: 'center'
    },
    textRecord: {
        fontFamily: FONT.bold,
        fontSize: 16,
        color: COLORS.primary,
        textAlign: 'center'
    }
})