import React, {useContext} from 'react';
import { View, Text } from 'react-native';
import {AuthContext} from '../../contexts/auth'

export default function Home() {

  const { user } = useContext(AuthContext) // acessando o user do contexto que contem os dados do usuario la no firebase
 
 return (
   <View>
    <Text>
        Screen Home
    </Text>
    <Text>
      {user && user.nome}
    </Text>
    <Text>
      {user && user.email}
    </Text>
   </View> 
  );
}