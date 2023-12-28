import {
  View,
  Text,
  Image,
  Alert,
  Linking,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../components/shared/Button';
import {FONT, COLORS} from '../themes/themes';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import brandLogo from '../assets/images/imgs/rmlogo.png';
import brandName from '../assets/images/imgs/RevMaxx.png';
import {scale, width} from '../constants/Layout';
import InputBox from '../components/shared/InputBox';
import {useAddLogin} from './hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Username is required').email('Invalid email'),
  password: Yup.string().required('Password is required'),
});

interface Ivalues {
  email: string;
  password: string;
}

export default function LogIn({navigation}: {navigation: any}) {
  const initalValues = {
    email: '',
    password: '',
  };

  const {loginMutate, isLoading} = useAddLogin();

  const handleLogin = async (values: Ivalues) => {
    const {email, password} = values;

    loginMutate({
      email: email,
      password: password,
    });
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handlePrivacyPolicyPress = () => {
    // Define the URL of your Privacy Policy page
    const privacyPolicyUrl = 'https://revmaxx.co/privacy-policy';

    // Open the Privacy Policy page in the device's default browser
    Linking.openURL(privacyPolicyUrl);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[COLORS.white, '#c7ddff38', COLORS.white]}
          style={styles.logoContainer}>
          <View style={styles.brandContainer}>
            <Image
              source={brandLogo}
              style={styles.brandLogo}
              resizeMode="contain"
            />
            <Image
              source={brandName}
              style={styles.brandName}
              resizeMode="contain"
            />
            <Text style={styles.tagLine}>Our Personal EHR Assistant</Text>
          </View>
        </LinearGradient>

        <View style={styles.loginContainer}>
          <Text style={styles.welcomeTitle}>Welcome to RevMaxx</Text>

          <Formik
            initialValues={initalValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}>
            {({values, errors, handleChange, handleSubmit}) => (
              <>
                <InputBox
                  placeholder="Enter your email"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  error={errors.email}
                />
                <InputBox
                  placeholder="Enter your password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  isPassword={true}
                  error={errors.password}
                />

                <Text style={styles.privacyTextContainer}>
                  By continuing you agree to revmax's{' '}
                  <Text
                    style={{color: COLORS.primary}}
                    onPress={handlePrivacyPolicyPress}>
                    Terms & Conditions Privacy Policy
                  </Text>
                </Text>

                <View style={styles.bottomButtonContainer}>
                  <Button
                    name="Log In"
                    type="primary"
                    onPress={handleSubmit}
                    isLoading={isLoading}
                  />
                  <View style={{marginTop: scale(20)}}>
                    <Button
                      name="Sign up"
                      type="secondary"
                      onPress={handleSignup}
                    />
                  </View>
                </View>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  logoContainer: {
    width: width,
    height: scale(170),
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLogo: {
    alignSelf: 'center',
    width: scale(110),
    height: scale(92),
    marginBottom: scale(8),
  },
  brandName: {
    alignSelf: 'center',
  },
  tagLine: {
    color: COLORS.grey,
    fontFamily: FONT.medium,
    fontSize: scale(13),
    marginTop: scale(10),
    textAlign: 'center',
  },
  loginContainer: {
    paddingHorizontal: scale(20),
    flex: 1,
  },
  welcomeTitle: {
    fontFamily: FONT.bold,
    fontSize: scale(24),
    textAlign: 'center',
    marginBottom: scale(20),
    marginTop: scale(20),
  },
  privacyTextContainer: {
    fontSize: scale(12),
    fontFamily: FONT.medium,
    color: COLORS.lightGrey,
    marginTop: scale(10),
  },
  bottomButtonContainer: {
    alignSelf: 'center',
    marginTop: scale(30),
    width: '100%',
  },
});
