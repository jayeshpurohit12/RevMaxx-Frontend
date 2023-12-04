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
        axios.get(`http://revmaxx.us-east-1.elasticbeanstalk.com/getSoapNotesByPid?provider_id=${pid}`).then(res=>{
            console.log(res.data,"response in charts page")
        
                setChartsData(res.data)
        }).catch(err=>console.log(err))
    },[pid])
   
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
                        <Text  style={{ color: 'black' }}>{docName}</Text>
                        <Text  style={{ color: 'black' }}>{props.created_at}</Text>
                      
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
            <Text  style={{ color: 'black' }}>{item.soapnote}</Text>
        );
    };
    return (
       <View>
        <ScrollView>
    <View style={[globalStyles.container, { gap: 18 }]}>
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
           
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
</View>

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