import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import {
  LoginScreen,
  ForgotPasswordScreen,
  SignUpScreen
} from '../screens';

const Stack = createStackNavigator();

export default function GuestRouter(props) {

	return (
      <Stack.Navigator
        initialRouteName='login'>

        <Stack.Screen
          name="login"
          component={LoginScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="signUp"
          component={SignUpScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="forgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />

      </Stack.Navigator>
    );
};
