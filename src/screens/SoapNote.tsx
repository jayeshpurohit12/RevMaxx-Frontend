import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../globalStyles';
import {COLORS, FONT} from '../themes/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {scale} from '../constants/Layout';
import Verify from '../assets/images/icons/verify.png';
import Button from '../components/shared/Button';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

type RouteParams = {
  soapresponse: string;
  patient_name: string;
};

const text = `The patient is a 32-year-old female who presents with complaints of severe headache, dizziness, and blurred vision for the past three days. She reports no recent head trauma or fever but mentions feeling nauseous during episodes of headache.`;

export default function SoapNote() {
  const [isEdit, setisEdit] = useState(false);
  const [soapresponse, setSoapResponse] = useState<string>('');
  const [patient_name, setPatient_name] = useState<string>('');
  const [pid, setPid] = useState('');
  const [sunjective, setSubjective] = useState<string>('');
  const [objective, setObjective] = useState<string>('');
  const [assessment, setAssessment] = useState<string>('');
  const [plan, setPlan] = useState<string>('');

  const route = useRoute();

  useEffect(() => {
    AsyncStorage.getItem('provider_id')
      .then(provider_id => {
        if (provider_id) {
          setPid(provider_id);
        } else {
          console.log('provider_id not found in AsyncStorage');
        }
      })
      .catch(error => {
        console.error('Error retrieving provider_id:', error);
      });

    const receivedsoapresponse = route?.params as RouteParams;
    setSoapResponse(receivedsoapresponse?.soapresponse);
    setPatient_name(receivedsoapresponse?.patient_name);

    setAssessment(text);
    setPlan(text);
    setObjective(text);
    setSubjective(text);
  }, [route?.params, pid]);

  const handleSave = () => {
    if (isEdit) {
      setisEdit(false);
    } else {
      setisEdit(true);
    }
  };

  const handleCopy = () => {
    const fullSoapNote =
      `Subjective:\n${sunjective}\n\n` +
      `Objective:\n${objective}\n\n` +
      `Assessment:\n${assessment}\n\n` +
      `Plan:\n${plan}`;

    Clipboard.setString(fullSoapNote);
    Toast.show({
      type: 'success',
      autoHide: true,
      text1: 'SOAP Note copied to clipboard',
      position: 'bottom',
      bottomOffset: scale(60),
    });
  };

  return (
    <View
      style={{flex: 1, paddingHorizontal: scale(20), paddingTop: scale(35)}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.notesContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.soapNoteHeading}>SOAP Note</Text>
            <Image
              source={Verify}
              style={{width: scale(15), height: scale(15)}}
            />
          </View>

          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.date}>Date of Visit: July 23, 2023</Text>

          <Text style={styles.heading}>Subjective</Text>
          <TextInput
            style={styles.textInput}
            value={sunjective}
            multiline={true}
            scrollEnabled={false}
            editable={isEdit}
            onChangeText={text => setSubjective(text)}
          />

          <Text style={styles.heading}>Objective</Text>
          <TextInput
            style={styles.textInput}
            value={objective}
            multiline={true}
            scrollEnabled={false}
            editable={isEdit}
            onChangeText={text => setObjective(text)}
          />

          <Text style={styles.heading}>Assessment</Text>
          <TextInput
            style={styles.textInput}
            value={assessment}
            multiline={true}
            scrollEnabled={false}
            editable={isEdit}
            onChangeText={text => setAssessment(text)}
          />

          <Text style={styles.heading}>Plan</Text>
          <TextInput
            style={styles.textInput}
            value={plan}
            multiline={true}
            scrollEnabled={false}
            editable={isEdit}
            onChangeText={text => setPlan(text)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            name={!isEdit ? 'Edit' : 'Save'}
            size="small"
            onPress={handleSave}
          />
          <Button name="Copy" size="small" onPress={handleCopy} />
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  soapNoteHeading: {
    fontSize: scale(16),
    fontFamily: FONT.medium,
    color: COLORS.primary,
    fontWeight: '500',
    marginRight: scale(5),
  },
  name: {
    color: COLORS.black,
    fontSize: scale(14),
    marginTop: scale(16),
    marginBottom: scale(5),
    fontWeight: '500',
    fontFamily: FONT.medium,
  },
  date: {
    color: COLORS.greyText,
    fontSize: scale(12),
    fontWeight: '500',
    fontFamily: FONT.medium,
  },
  notesContainer: {
    borderWidth: 1,
    padding: scale(12),
    borderRadius: scale(12),
    backgroundColor: COLORS.white,
    borderColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginHorizontal: scale(2),
  },
  textInput: {
    marginTop: scale(8),
    fontWeight: '400',
    fontFamily: FONT.medium,
    fontSize: scale(13),
  },
  contentContainer: {
    paddingBottom: scale(35),
    marginTop: scale(5),
  },
  buttonContainer: {
    marginTop: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    color: COLORS.primary,
    fontSize: scale(14),
    fontWeight: '600',
    fontFamily: FONT.medium,
    marginTop: scale(25),
  },
});
