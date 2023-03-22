
import React from 'react';
import {  Text, View, StatusBar } from 'react-native';
import firebase from './src/services/FirebaseConnection';                            // importando o firebase
import 'react-native-gesture-handler'; 
import Routes from './src/routes/index'
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/contexts/auth';

console.disableYellowBox=true  // comando para tirar alerta amarelo quando faz auth no firebase

export default function App() {
  return (
    <NavigationContainer >
      <AuthProvider  /* agora todas as rotas tem o auth contex*/>

        <StatusBar  // escurecendo o header de status do cel 
          backgroundColor='#131313' 
          barStyle='light-content' 
        />
        <Routes/>
      
      </AuthProvider>
    </NavigationContainer>
  );
}

