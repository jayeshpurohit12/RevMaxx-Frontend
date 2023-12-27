/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/no-unstable-nested-components */
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useState, useEffect} from 'react';
import {globalStyles} from '../globalStyles';
import {Image, Text, TouchableOpacity} from 'react-native';
import {COLORS, FONT} from '../themes/themes';

// Splash Screen
import SplashScreen from '../screens/SplashScreen';
// Auth & Permissions Screens
import Mic from '../screens/Mic';
import Cam from '../screens/Cam';
import EverythingSet from '../screens/EverythingSet';
import LogIn from '../screens/LogIn';
// Main Screens
import Home from '../screens/Home';
import Appointments from '../screens/Appointments';
import Charts from '../screens/Charts';
import Patients from '../screens/Patients';
// Headers
import HomeScreenHeader from '../components/interface/HomeScreenHeader';
import AppointmentHeader from '../components/interface/AppointmentHeader';
import Recording from '../screens/Recording';
import SoapNote from '../screens/SoapNote';
import {useAuth} from '../context/AuthContext';
import Signup from '../screens/Signup';
import {scale} from '../constants/Layout';
import Header from '../components/interface/Header';
import {useFetchRefreshToken, useLogout} from '../screens/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PERMISSIONS, check, request} from 'react-native-permissions';

export default function RootStackNavigator() {
  // Screen Stacks
  const AuthStack = createNativeStackNavigator();
  const MainStack = createNativeStackNavigator();
  const MainTab = createBottomTabNavigator();

  const {refreshTokenMutate, isTokenError} = useFetchRefreshToken();
  const {signOut} = useAuth();

  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Main TabBar
  function MainTabBar() {
    const tabOptions = [
      {
        name: 'Charts',
        component: Charts,
        icon: require('../assets/images/icons/charts.png'),
        focusedIcon: require('../assets/images/icons/chartsFocused.png'),
        tabBarLabel: 'Charts',
      },
      // {
      //   name: 'Home',
      //   component: Home,
      //   icon: require('../assets/images/icons/home.png'),
      //   focusedIcon: require('../assets/images/icons/homeFocused.png'),
      //   tabBarLabel: 'Home',
      //   header: HomeScreenHeader,
      // },
      {
        name: 'Add',
        component: Recording,
        icon: require('../assets/images/icons/add.png'),
        focusedIcon: require('../assets/images/icons/plus.png'),
        tabBarLabel: 'Add',
        header: Header,
        initaialScreen: true,
      },
      {
        name: 'Profile',
        component: Patients,
        icon: require('../assets/images/icons/patient.png'),
        focusedIcon: require('../assets/images/icons/patientFocused.png'),
        tabBarLabel: 'Profile',
        isLogout: true,
      },
    ];

    const {logoutMutate} = useLogout();

    const handleLogout = async () => {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      logoutMutate(accessToken as string);
      logoutMutate(refreshToken as string);

      signOut();
    };

    return (
      <MainTab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: scale(65),
            paddingTop: scale(8),
            paddingBottom: scale(15),
          },
        }}
        initialRouteName="Add">
        {tabOptions.map((item, index) => (
          <MainTab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({focused}) =>
                focused ? (
                  <Image
                    source={item.focusedIcon}
                    style={{
                      width: scale(18),
                      height: scale(18),
                    }}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    source={item.icon}
                    style={{
                      width: scale(18),
                      height: scale(18),
                    }}
                    resizeMode="contain"
                  />
                ),
              tabBarLabelStyle: {
                fontFamily: FONT.regular,
                fontSize: scale(13),
              },
              headerTitleStyle: {
                fontFamily: FONT.bold,
                fontSize: scale(14),
                color: COLORS.black,
              },
              tabBarActiveTintColor: COLORS.primary,
              tabBarInactiveTintColor: COLORS.black,
              header: item?.header,
              headerRight: () => {
                if (item?.isLogout) {
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleLogout}
                      style={{marginRight: scale(10)}}>
                      <Text
                        style={{
                          fontFamily: FONT.regular,
                          fontSize: scale(14),
                          color: COLORS.red,
                          fontWeight: '600',
                        }}>
                        Logout
                      </Text>
                    </TouchableOpacity>
                  );
                } else {
                  return null;
                }
              },
            }}
          />
        ))}
      </MainTab.Navigator>
    );
  }

  // Display and Hide Splash Screen
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    const reqMicPermission = () => {
      console.log();
      check(PERMISSIONS.IOS.MICROPHONE).then(response => {
        console.log(response);
      });

      request(PERMISSIONS.IOS.MICROPHONE).then(response => {
        setIsPermissionGranted(response === 'granted');
      });
    };
    reqMicPermission();
  }, []);

  useEffect(() => {
    try {
      refreshTokenMutate();
    } catch (error) {
      console.log(error, 'error in refresh token');
    }
  }, []);

  // Check for user login
  // const { user } = useAuth0();
  const {userId} = useAuth();

  return showSplash ? (
    <SplashScreen />
  ) : !userId && isTokenError ? (
    <AuthStack.Navigator
      initialRouteName={isPermissionGranted ? 'Log In' : 'Permission Mic'}
      screenOptions={{
        headerShown: false,
        contentStyle: globalStyles.containerAuth,
      }}>
      <AuthStack.Screen name="Permission Mic" component={Mic} />
      {/* <AuthStack.Screen name="Permission Cam" component={Cam} /> */}
      <AuthStack.Screen name="Everything Is Set" component={EverythingSet} />
      <AuthStack.Screen name="Log In" component={LogIn} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  ) : (
    <MainStack.Navigator initialRouteName="Main">
      <MainStack.Screen
        name="Main"
        component={MainTabBar}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name="Recording"
        component={Recording}
        options={{header: Header}}
      />
      <MainStack.Screen
        name="SoapNote"
        component={SoapNote}
        options={{header: Header}}
      />
    </MainStack.Navigator>
  );
}
