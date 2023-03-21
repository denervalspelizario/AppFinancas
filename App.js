
import React from 'react';
import {  Text, View, StatusBar } from 'react-native';
import firebase from './src/services/FirebaseConnection';                            // importando o firebase
import 'react-native-gesture-handler'; 
import Routes from './src/routes/index'
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

export default function App() {
  return (
    <NavigationContainer >
      <AuthProvider>
        <StatusBar  // escurecendo o header de status do cel 
          backgroundColor='#131313' 
          barStyle='light-content' 
        />
        <Routes/>
      </AuthProvider>
    </NavigationContainer>
  );
}

