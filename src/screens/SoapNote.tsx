import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  ActivityIndicator,
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
import {useEditSoapNote, useFetchSoapNote} from './hooks';

export default function SoapNote() {
  const route = useRoute();
  const {id} = route?.params;

  const {data, isLoading} = useFetchSoapNote({id});

  const [isEdit, setisEdit] = useState(false);
  const [sunjective, setSubjective] = useState<any>('');
  const [objective, setObjective] = useState<any>('');
  const [assessment, setAssessment] = useState<any>('');
  const [plan, setPlan] = useState<any>('');

  const {editSoapNoteMutate, isEditLoading} = useEditSoapNote();

  useEffect(() => {
    if (data?.data?.soap_data?.soap_content) {
      setSubjective(Object.values(data?.data?.soap_data?.soap_content)[3]);
      setObjective(Object.values(data?.data?.soap_data?.soap_content)[1]);
      setAssessment(Object.values(data?.data?.soap_data?.soap_content)[0]);
      setPlan(Object.values(data?.data?.soap_data?.soap_content)[2]);
    }
  }, [data?.data?.soap_data?.soap_content]);

  console.log('data:', data?.data?.soap_data?.soap_content);

  const handleSave = () => {
    if (isEdit) {
      editSoapNoteMutate({
        id: id,
        soap_content: {
          subjective: sunjective,
          objective: objective,
          assessment: assessment,
        },
      });

      setisEdit(false);
    } else {
      setisEdit(true);
    }
  };

  const handleCopy = () => {
    const fullSoapNote =
      `Subjective:\n${sunjective}\n\n` +
      `Objective:\n${objective}\n\n` +
      `Assessment:\n${assessment}\n`;

    Clipboard.setString(fullSoapNote);
    Toast.show({
      type: 'success',
      autoHide: true,
      text1: 'SOAP Note copied to clipboard',
      position: 'bottom',
      bottomOffset: scale(60),
    });
  };

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{alignSelf: 'center', marginTop: scale(10)}}
        size="large"
      />
    );
  }

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

          <Text style={styles.name}>{data?.data?.soap_data?.name}</Text>
          <Text style={styles.date}>
            Date of Visit: {data?.data?.soap_data?.visited_date}
          </Text>

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

          <Text style={styles.diagonsis}>Diagnosis:</Text>
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
            isLoading={isEditLoading}
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
  diagonsis: {
    marginTop: scale(10),
    fontFamily: FONT.medium,
    fontWeight: '500',
    fontSize: scale(13),
  },
});
