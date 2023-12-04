import { View, Text, FlatList, Image,ActivityIndicator } from 'react-native'
import React,{useState,useEffect}from 'react'
import Card from '../components/shared/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { COLORS, FONT } from '../themes/themes'

export default function Patients() {

    const [pid,setPid]=useState("")
    const [patients,setPatients]= useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
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
    axios.get(`http://revmaxx.us-east-1.elasticbeanstalk.com/getPatientDocById?provider_id=${pid}`).then((res)=>{
        console.log(res.data,"Patient data")
        setPatients(res.data)
        setIsLoading(false)
        console.log(patients,"Patients")
    }).catch(err=>{
        console.log(err)
        setIsLoading(false)
    })
   },[pid])

   

    type ItemProps = {
     
        firstName: string;
        dob: string;
        gender: string;
        type:string
        
    }

    const Item = (props: ItemProps) => (
        <Card 
            type="large"
            content={
                <View>
                 
                    <View>
                        <Text  style={{ color: 'black' }}>Name : {props.firstName}</Text>
                        <View>
                            <Text  style={{ color: 'black' }}>Date Of Birth: {props.dob}</Text>
                            <Text style={{ color: 'black' }}>Sex: {props.gender}</Text>
                            <Text  style={{ color: 'black' }}>Type: {props.type}</Text>
                        </View>
                    </View>
                </View>
              }
        />
    )

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
                <FlatList
                    data={patients}
                    renderItem={({ item }) => (
                        <Item firstName={item.firstName} dob={item.dob} gender={item.gender} type={item.type} />
                    )}
                    keyExtractor={(item) => item.mrn}
                />
            )}
        </View>
    )
}