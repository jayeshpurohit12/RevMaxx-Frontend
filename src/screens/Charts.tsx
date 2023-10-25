import { View, Text, ScrollView, StyleSheet, Image,FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { globalStyles } from '../globalStyles'
import { COLORS, FONT } from '../themes/themes'
import Card from '../components/shared/Card'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export default function Appointments({ navigation }: { navigation: any }) {
    const [pid,setPid]=useState("")
    const [charts,setChartsData]=useState<any[]>([])
    const [docName,setDocName]=useState("")
    const [selectedItem, setSelectedItem] = useState<ItemProps | null>(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    useEffect(()=>{
        AsyncStorage.getItem('provider_id')
        .then((provider_id) => {
          if (provider_id) {
            setPid(provider_id)
            // Use the retrieved username here
            console.log('Retrieved pid in charts page:', pid);
          } else {
            // Handle the case where 'username' is not found in AsyncStorage
            console.log('provider_id not found in AsyncStorage');
          }})
          .catch((error) => {
            // Handle any errors here
            console.error('Error retrieving provider_id:', error);
          });


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
        axios.get(`http://192.168.29.10:4500/getSoapNotesByPid?provider_id=${pid}`).then(res=>{
            console.log(res.data,"response in charts page")
        
                setChartsData(res.data)
        }).catch(err=>console.log(err))
    },[pid])
    // const charts = [
    //     {
    //         name: 'John Doe',
    //         time: '12:00PM',
    //         date: 'Mon, 24 Jul',
    //         disease: 'Gastro Infection',
    //         billed: true,
    //         code: 'S06.0X0A SO1.81XA'
    //     },
    //     {
    //         name: 'John Doe',
    //         time: '12:00PM',
    //         date: 'Mon, 24 Jul',
    //         disease: 'Gastro Infection',
    //         billed: true,
    //         code: 'S06.0X0A SO1.81XA'
    //     },
    //     {
    //         name: 'John Doe',
    //         time: '12:00PM',
    //         date: 'Mon, 24 Jul',
    //         disease: 'Gastro Infection',
    //         billed: true,
    //         code: 'S06.0X0A SO1.81XA'
    //     },
    //     {
    //         name: 'John Doe',
    //         time: '12:00PM',
    //         date: 'Mon, 24 Jul',
    //         disease: 'Gastro Infection',
    //         billed: true,
    //         code: 'S06.0X0A SO1.81XA'
    //     },
    // ]
    type ItemProps = {
     
       created_at:"string"
       soapnote:"string"
        
    }
    type SoapNotePopupProps = {
        isVisible: boolean;
        item: ItemProps | null; // Assuming ItemProps is the type of your item data
        onClose: () => void;
    };

    const Item = (props: ItemProps) => (
        <Card 
            type="large"
            onPress={() => {
                setSelectedItem(props);
                setIsPopupVisible(true);
            }}
            content={
                <View>
                 
                    <View>
                        <Text>{docName}</Text>
                        <Text>{props.created_at}</Text>
                      
                    </View>
                </View>
              }
        />
    )
    const SoapNotePopup: React.FC<SoapNotePopupProps> = ({ isVisible, item, onClose }) => {
        if (!isVisible || !item) {
            return null;
        }
    
        // Render the SOAP note content using the `item` data.
    
        return (
            // Your modal or dialog content here
            <Text>{item.soapnote}</Text>
        );
    };
    return (
        // <ScrollView>
        //     <View style={[globalStyles.container, { gap: 18 }]}>
        //         <View style={{
        //             flexDirection: 'row',
        //             justifyContent: 'space-between'
        //         }}>
        //             <Text style={styles.textBlue}>Thursday, July 21</Text>
        //             <Text style={styles.textBlue}>Today</Text>
        //         </View>
        //         {Array.isArray(charts) && charts.map((item, index) => (
        //             <Card
        //                 key={index}
        //                 type='large'
        //                 // onPress={() => navigation.navigate('Recording')}
        //                 content={
        //                     <View style={styles.cardContent}>
        //                         <View style={{ gap: 16 }}>
        //                             <View style={{
        //                                 flexDirection: 'row',
        //                                 alignItems: 'center',
        //                                 gap: 6
        //                             }}>
        //                                 <Image 
        //                                     source={require('../assets/images/icons/patient.png')}
        //                                 />
        //                                 <Text style={styles.title}>{docName}</Text>
        //                             </View>

        //                             <View style={{
        //                                 flexDirection: 'row',
        //                                 alignItems: 'center',
        //                                 gap: 6
        //                             }}>
        //                                 <Image
        //                                     source={require('../assets/images/icons/calendarGrey.png')}
        //                                 />
        //                                 <Text style={styles.textGrey}>{item.created_at}</Text>
        //                             </View>

        //                             {/* <View style={{
        //                                 flexDirection: 'row',
        //                                 alignItems: 'center',
        //                                 gap: 6
        //                             }}>
        //                                 <Image
        //                                     source={require('../assets/images/icons/clockGrey.png')}
        //                                 />
        //                                 <Text style={styles.textGrey}>{item.time}</Text>
        //                             </View> */}
        //                         </View>
        //                         {/* <View style={{
        //                             justifyContent: 'space-between',
        //                             alignItems: 'flex-end'
        //                         }}>
        //                             <Text style={styles.textGrey}>{item.billed ? 'Billed' : 'Not Billed'}</Text>
        //                             <View style={{
        //                                 alignItems: 'flex-end',
        //                                 gap: 6
        //                             }}>
        //                                 <Text style={styles.textGrey}>{item.disease}</Text>
        //                                 <Text style={styles.textCode}>{item.code}</Text>
        //                             </View>
        //                         </View> */}
        //                     </View>
        //                 }
        //             />
        //         ))}
        //     </View>
        // </ScrollView>


        <ScrollView>
    <View style={[globalStyles.container, { gap: 18 }]}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
        }}>
          
            <FlatList
                    data={charts}
                    renderItem={({ item }) => (
                        <Item created_at={item.created_at} soapnote={item.soapnote} />
                    )}
                    keyExtractor={(item) => item.id}
                />
        </View>
        <SoapNotePopup isVisible={isPopupVisible} item={selectedItem} onClose={() => setIsPopupVisible(false)} />
    </View>
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

    textGrey: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.greyText
    },

    textCode: {
        fontFamily: FONT.medium,
        fontSize: 16,
        color: COLORS.primary
    },
})