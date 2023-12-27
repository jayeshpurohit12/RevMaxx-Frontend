import * as React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import {COLORS} from './themes/themes';
import {SafeAreaView} from 'react-native-safe-area-context';
import RootStackNavigator from './navigation/RootStackNavigator';
import {AuthProvider} from './context/AuthContext';
import {QueryClient, QueryClientProvider} from 'react-query';

// My Themes
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.white,
  },
};

const queryClient = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{flex: 1}}>
        <QueryClientProvider client={queryClient}>
          <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
          <NavigationContainer theme={MyTheme}>
            <RootStackNavigator />
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaView>
    </AuthProvider>
  );
}
