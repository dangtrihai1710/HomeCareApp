import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { PaperProvider } from 'react-native-paper';
import * as SplashScreen from 'expo-splash-screen';
import { LogBox } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import LoginScreen from './src/screens/auth/LoginScreen';
import BookingScreen from './src/screens/booking/BookingScreen';
import RatingScreen from './src/screens/rating/RatingScreen';

// Import navigation
import BottomTabNavigator from './src/navigation/BottomTabNavigator';

// Import store
import { store } from './src/store';

// Import theme
import { paperTheme } from './src/constants/theme';

// Ignore specific warnings
LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps',
  'Warning: componentWillMount',
  'Non-serializable values were found in the navigation state',
  'AsyncStorage has been extracted from react-native',
]);

const Stack = createStackNavigator();

// Keep splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // Artificially delay for demo purposes
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={paperTheme}>
          <NavigationContainer>
            <StatusBar style="light" backgroundColor="#4CAF50" />
            <Stack.Navigator
              initialRouteName="Login"
              screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: '#ffffff' },
                gestureEnabled: true,
                gestureDirection: 'horizontal',
              }}
            >
              <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen 
                name="Main" 
                component={BottomTabNavigator}
                options={{
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen 
                name="Booking" 
                component={BookingScreen}
                options={{
                  presentation: 'modal',
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen 
                name="Rating" 
                component={RatingScreen}
                options={{
                  presentation: 'card',
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}