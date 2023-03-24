import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import {AuthContext} from '../../contexts/auth'

export default function Home() {

  const { user, logout } = useContext(AuthContext) // acessando o user do contexto que contem os dados do usuario la no firebase
                                                   // chamando a funcao assincrona de logout   
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
    <Button
      title='sair da conta'
      onPress={()=> { logout()  }}
    />
   </View> 
  );
}