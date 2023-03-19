
import React from 'react';
import {  Text, View, StatusBar } from 'react-native';
import firebase from './src/services/FirebaseConnection';                            // importando o firebase
import 'react-native-gesture-handler'; 

export default function App() {
  return (
    <View >
      <StatusBar  // escurecendo o header de status do cel 
       backgroundColor='#131313' 
       barStyle='light-content' 
      />
    </View>
  );
}

