import * as React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { COLORS } from './themes/themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootStackNavigator from './navigation/RootStackNavigator';
import { AuthProvider } from './context/AuthContext';

// My Themes
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white
  }
}

export default function App() {
  return (
    <AuthProvider>
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={COLORS.white}
        barStyle='dark-content'
      />
      <NavigationContainer theme={MyTheme}>
        <RootStackNavigator />
      </NavigationContainer>
    </SafeAreaView>
    </AuthProvider>
  )
}