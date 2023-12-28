import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONT} from '../themes/themes';
import brandLogo from '../assets/images/imgs/rmlogo.png';
import brandName from '../assets/images/imgs/RevMaxx.png';
import {scale, width} from '../constants/Layout';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/shared/Button';
import InputBox from '../components/shared/InputBox';
import {useNavigation} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useAddSignup} from './hooks';

interface IValues {
  name: string;
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'password must be at least 6 characters')
    .required('Password is required'),
});

const Signup = () => {
  const navigation = useNavigation();

  const {signupMutate, isLoading} = useAddSignup();

  const initialFormValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleLogin = () => {
    navigation.navigate('Log In');
  };

  const handleSignup = (values: IValues) => {
    signupMutate({
      name: values?.name,
      email: values?.email?.toLowerCase(),
      password: values?.password,
    });
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
          <Text style={styles.signupTitle}>Join Us Now</Text>

          <Formik
            initialValues={initialFormValues}
            validationSchema={validationSchema}
            onSubmit={handleSignup}>
            {({values, errors, handleChange, handleSubmit}) => (
              <>
                <InputBox
                  placeholder="Enter your Name"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  error={errors.name}
                />
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
                  error={errors.password}
                  isPassword={true}
                />

                <Button
                  name="Sign up"
                  type="primary"
                  onPress={handleSubmit}
                  isLoading={isLoading}
                />
              </>
            )}
          </Formik>

          <View style={styles.alreadyAccountContainer}>
            <Text style={styles.alreadyAccount}>Already have an account? </Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogin}>
              <Text
                style={[
                  styles.alreadyAccount,
                  {color: COLORS.primary, fontWeight: '600'},
                ]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.breakContainer}>
          <View style={styles.lineBreaker} />
          <Text style={styles.orTitle}>OR</Text>
          <View style={styles.lineBreaker} />
        </View>

        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={handleGoogleSignup}
          style={styles.googleButton}
        /> */}
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

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
    marginTop: scale(20),
    paddingHorizontal: scale(20),
    flex: 1,
  },
  signupTitle: {
    fontFamily: FONT.bold,
    fontSize: scale(24),
    textAlign: 'center',
    marginBottom: scale(20),
  },
  breakContainer: {
    marginTop: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(30),
  },
  lineBreaker: {
    borderWidth: 0.2,
    width: '40%',
    borderColor: COLORS.lightGrey,
  },
  orTitle: {
    fontFamily: FONT.bold,
    fontSize: scale(13),
    color: COLORS.lightGrey,
  },
  googleButton: {
    alignSelf: 'center',
    marginTop: scale(20),
  },
  alreadyAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: scale(10),
  },
  alreadyAccount: {
    fontFamily: FONT.medium,
    fontSize: scale(12),
    color: COLORS.lightGrey,
  },
});
