import React, {useContext} from 'react';
import { View, Text, Button } from 'react-native';
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import {Container, Background, Nome, Saldo, Title} from './styles'

export default function Home() {

  const { user} = useContext(AuthContext) // acessando o user do contexto que contem os dados do usuario la no firebase
                                                    
 return (
   <Background>
      <Header/>
      <Container>
        <Nome>Nome</Nome>
        <Saldo>R$ 123,00</Saldo>
      </Container>
      <Title>Ultimas movimentações</Title>
   </Background>
  );
}