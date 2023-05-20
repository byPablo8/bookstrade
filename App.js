import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
//import { Provider } from 'react-redux';
//import { store } from './store'; // Ensure the correct path to your store file
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LibroScreen from './screens/LibroScreen';
import { AuthProvider } from './screens/AuthContext';
import LoginScreen from './screens/LoginScreen';
import LogoutButton from './screens/LogoutButton';
import PerfilScreen from './screens/PerfilScreen';
import RegistroScreen from './screens/RegistroScreen';
import LibrosUsuarioScreen from './screens/LibrosUsuarioScreen';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>

              <Stack.Screen
                name='HomeScreen'
                component={HomeScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='LibroScreen'
                component={LibroScreen}
                options={{
                  headerShown: false
                }}
              />

              <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='LogoutButton'
                component={LogoutButton}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='PerfilScreen'
                component={PerfilScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='RegistroScreen'
                component={RegistroScreen}
                options={{
                  headerShown: false
                }}
              />
              <Stack.Screen
                name='LibrosUsuarioScreen'
                component={LibrosUsuarioScreen}
                options={{
                  headerShown: false
                }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </NavigationContainer >
    </AuthProvider>
  );
}