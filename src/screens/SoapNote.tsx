import { View, Text, ScrollView, StyleSheet, Image, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyles } from '../globalStyles';
import { COLORS, FONT } from '../themes/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import axios from 'axios'

type RouteParams = {
  soapresponse: string;
  patient_name: string;
};

export default function SoapNote() {
  const [varified, setVarified] = useState(false);
  const [soapresponse, setSoapResponse] = useState<string>('');
  const [patient_name, setPatient_name] = useState<string>('');
  const [pid, setPid] = useState('');
  const [editableSoapresponse, setEditableSoapresponse] = useState('');
  const route = useRoute();

  useEffect(() => {
    AsyncStorage.getItem('provider_id')
      .then((provider_id) => {
        if (provider_id) {
          setPid(provider_id);
        } else {
          console.log('provider_id not found in AsyncStorage');
        }
      })
      .catch((error) => {
        console.error('Error retrieving provider_id:', error);
      });

    const receivedsoapresponse = route.params as RouteParams;
    setSoapResponse(receivedsoapresponse.soapresponse);
    setPatient_name(receivedsoapresponse.patient_name);
    setEditableSoapresponse(receivedsoapresponse.soapresponse);
  }, [route.params, pid]);

  const handleSave = () => {
    // Log the edited SOAP response when the button is clicked
    console.log('Edited SOAP Response:', editableSoapresponse);
    const dataObj={
      "provider_id":pid,
      "soapnote":editableSoapresponse

  }
  if(editableSoapresponse){
    axios.post("http://revmaxx.us-east-1.elasticbeanstalk.com/addSoapNote",dataObj).
    then(res=>console.log(res.data,"soapnote added response")).
    catch(err=>console.log(err))
  }
 



  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={[globalStyles.container, { gap: 18, justifyContent: 'space-between', minHeight: 'auto' }]}>
          <Text style={styles.headTextLarge}>Patient Name : {patient_name}</Text>
          {varified ? (
            <TextInput
              style={styles.editableSoapresponse}
              value={editableSoapresponse}
              multiline={true}
              numberOfLines={35}
              onChangeText={(text) => setEditableSoapresponse(text)}
            />
          ) : (
            <Text style={styles.headSoapNotetext}>{soapresponse}</Text>
          )}
          <Button
            title={varified ? 'Save' : 'Edit'}
            onPress={() => {
              if (varified) {
                handleSave(); // Log the edited SOAP response when the button is clicked
              }
              setVarified(!varified);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headTextSmall: {
    fontFamily: FONT.bold,
    fontSize: 16,
    color: COLORS.black,
  },
  headTextLarge: {
    fontFamily: FONT.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  headSoapNotetext: {
    fontFamily: FONT.bold,
    fontSize: 18,
    color: COLORS.black,
  },
  editableSoapresponse: {
    fontFamily: FONT.bold,
    fontSize: 14,
    color: COLORS.black,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 4,
    padding: 8,
  },
});
