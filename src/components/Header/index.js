import React from 'react';
import { useNavigation } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';
import {Container, ButtonMenu} from './styles'

export default function Header() {

  const navigation = useNavigation()

  return (
     <Container>
      <ButtonMenu onPress={() => navigation.toggleDrawer()}>
        <Entypo name="menu" size={28} color="#FFF" />
      </ButtonMenu>
     </Container> 
  );
}




