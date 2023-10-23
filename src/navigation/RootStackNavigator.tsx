import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import { globalStyles } from "../globalStyles";
import { Image } from "react-native";
import { COLORS, FONT } from "../themes/themes";

// Splash Screen
import SplashScreen from "../screens/SplashScreen";
// Auth & Permissions Screens
import Mic from "../screens/Mic";
import Cam from "../screens/Cam";
import EverythingSet from "../screens/EverythingSet";
import LogIn from "../screens/LogIn";
// Main Screens
import Home from "../screens/Home";
import Appointments from "../screens/Appointments";
import Charts from "../screens/Charts";
import Patients from "../screens/Patients";
// Headers
import HomeScreenHeader from "../components/interface/HomeScreenHeader";
import AppointmentHeader from "../components/interface/AppointmentHeader";
import Recording from "../screens/Recording";
import SoapNote from "../screens/SoapNote";
import { useAuth } from "../context/AuthContext";

export default function RootStackNavigator() {

    // Screen Stacks
    const AuthStack = createNativeStackNavigator();
    const MainStack = createNativeStackNavigator();
    const MainTab = createBottomTabNavigator();

    // Main TabBar
    function MainTabBar() {
        const tabOptions = [
            {
                name: 'Home',
                component: Home,
                icon: require('../assets/images/icons/home.png'),
                focusedIcon: require('../assets/images/icons/homeFocused.png'),
                tabBarLabel: 'Home',
                header: HomeScreenHeader
            },
            {
                name: 'Appointments',
                component: Appointments,
                icon: require('../assets/images/icons/appointment.png'),
                focusedIcon: require('../assets/images/icons/appointmentFocused.png'),
                tabBarLabel: 'Appointments'
            },
            {
                name: 'Charts',
                component: Charts,
                icon: require('../assets/images/icons/charts.png'),
                focusedIcon: require('../assets/images/icons/chartsFocused.png'),
                tabBarLabel: 'Charts'
            },
            {
                name: 'Patients',
                component: Patients,
                icon: require('../assets/images/icons/patient.png'),
                focusedIcon: require('../assets/images/icons/patientFocused.png'),
                tabBarLabel: 'Patients',
            },
        ]
        return (
            <MainTab.Navigator
                screenOptions={{
                    tabBarStyle: {
                        height: 62,
                        paddingTop: 8,
                        paddingBottom: 8,
                    }
                }}
            >
                {tabOptions.map((item, index) => (
                    <MainTab.Screen
                        key={index}
                        name={item.name}
                        component={item.component}
                        options={{
                            tabBarIcon: ({ focused }) => (
                                focused
                                    ? <Image source={item.focusedIcon} />
                                    : <Image source={item.icon} />
                            ),
                            tabBarLabelStyle: {
                                fontFamily: FONT.regular,
                                fontSize: 13,
                            },
                            tabBarActiveTintColor: COLORS.primary,
                            tabBarInactiveTintColor: COLORS.black,
                            header: item.header
                        }}
                    />
                ))}
            </MainTab.Navigator>
        )
    }

    // Display and Hide Splash Screen
    const [showSplash, setShowSplash] = useState(true);
    useEffect(() => {
        const splashTimer = setTimeout(() => {
            setShowSplash(false);
        }, 3000);
        return () => clearTimeout(splashTimer);
    }, []);

   // Check for user login
   // const { user } = useAuth0();
    const {userId} = useAuth();

    return showSplash
        ? <SplashScreen />
        : !userId
            ? <AuthStack.Navigator initialRouteName="Permission Mic" screenOptions={{
                headerShown: false,
                contentStyle: globalStyles.containerAuth
            }}>
                <AuthStack.Screen name="Permission Mic" component={Mic} />
                <AuthStack.Screen name="Permission Cam" component={Cam} />
                <AuthStack.Screen name="Everything Is Set" component={EverythingSet} />
                <AuthStack.Screen name="Log In" component={LogIn} />
            </AuthStack.Navigator>
            : <MainStack.Navigator initialRouteName="Main">
                <MainStack.Screen name="Main" component={MainTabBar} options={{ headerShown: false }}/>
                <MainStack.Screen name="Recording" component={Recording} options={{ header: AppointmentHeader }} />
                <MainStack.Screen name="SoapNote" component={SoapNote} options={{ header: AppointmentHeader }} />
            </MainStack.Navigator>




}