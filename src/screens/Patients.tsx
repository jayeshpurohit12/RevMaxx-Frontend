import { View, Text, FlatList, Image } from 'react-native'
import React,{useState,useEffect}from 'react'
import Card from '../components/shared/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Patients() {

    const [pid,setPid]=useState("")
    const [patients,setPatients]= useState<any[]>([]);
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
    axios.get(`http://192.168.29.10:4500/getPatientDocById?provider_id=${pid}`).then((res)=>{
        console.log(res.data,"Patient data")
        setPatients(res.data)
        console.log(patients,"Patients")
    }).catch(err=>console.log(err))
   },[pid])

    // const patients = [
    //     {
    //         id: '1',
    //         img: require('../assets/images/imgs/avatar.jpg'),
    //         name: 'John Doe',
    //         age: '23',
    //         sex: 'Male',
    //         visits: '12'
    //     },
    //     {
    //         id: '2',
    //         img: require('../assets/images/imgs/avatar.jpg'),
    //         name: 'John Doe',
    //         age: '23',
    //         sex: 'Male',
    //         visits: '12'
    //     },
    //     {
    //         id: '3',
    //         img: require('../assets/images/imgs/avatar.jpg'),
    //         name: 'John Doe',
    //         age: '23',
    //         sex: 'Male',
    //         visits: '12'
    //     },
    //     {
    //         id: '4',
    //         img: require('../assets/images/imgs/avatar.jpg'),
    //         name: 'John Doe',
    //         age: '23',
    //         sex: 'Male',
    //         visits: '12'
    //     },
    // ]

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
                        <Text>Name : {props.firstName}</Text>
                        <View>
                            <Text>Date Of Birth: {props.dob}</Text>
                            <Text>Sex: {props.gender}</Text>
                            <Text>Type: {props.type}</Text>
                        </View>
                    </View>
                </View>
              }
        />
    )

    return (
        <View>
            <FlatList 
                data={patients}
                renderItem={({item}) => <Item  firstName={item.firstName} dob={item.dob} gender={item.gender} type={item.type}/>}
                keyExtractor={item => item.mrn}
            />
        </View>
    )
}