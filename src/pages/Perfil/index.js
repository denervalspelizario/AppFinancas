import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';

import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles'


export default function Perfil() {

  
 return (
   <Container>
      <Nome> Denerval </Nome>
      <NewLink>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout>
        <LogoutText>Sair</LogoutText>
      </Logout>
   </Container>
  );
}