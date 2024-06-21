import React, { Component } from 'react';

import Survey from './Survey';
import HomeScreen from './HomeScreen';
import LoginScreen from "./LoginScreen";
import ContactScreen from './ContactScreen'
import HsesHomeScreen from './HsesHomeScreen';
import UserManualScreen1 from './UserManualScreen1';
import NotificationScreen from './NotificationScreen';
import HsesAddForm1Screen from './HsesAddForm1Screen';
import HsesEditForm1Screen from './HsesEntryEditScreen';
import HsesEntryForm1Screen from './HsesEntryForm1Screen';
import HsesEntryForm2Screen from './HsesEntryForm2Screen';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class Navigation extends Component {

  constructor() {
    super();
    this.state = {
      showRealApp: true
    }
  }

  render() {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Survey" component={Survey} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="HsesHome" component={HsesHomeScreen} />
            <Stack.Screen name="UserManual1" component={UserManualScreen1} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="HsesAddForm1" component={HsesAddForm1Screen} />
            <Stack.Screen name="HsesEditForm1" component={HsesEditForm1Screen} />
            <Stack.Screen name="HsesEntryForm1" component={HsesEntryForm1Screen} />
            <Stack.Screen name="HsesEntryForm2" component={HsesEntryForm2Screen} />
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
};

export default Navigation;