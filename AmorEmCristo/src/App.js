import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { MainRouter } from './routers';


export default function App() {

  return (
    <SafeAreaProvider>
      <MainRouter />
    </SafeAreaProvider>
  )
};
