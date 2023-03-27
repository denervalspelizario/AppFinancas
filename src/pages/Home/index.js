import React, {useContext, useState} from 'react';
import { View, Text, Button } from 'react-native';
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import {Container, Background, Nome, Saldo, Title, List} from './styles'
import HitoricoList from '../../components/HitoricoList';

export default function Home() {

  const [historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 1200},
    {key: '2', tipo: 'despesa', valor: 200},
    {key: '3', tipo: 'receita', valor: 40},
    {key: '4', tipo: 'receita', valor: 100},
    {key: '5', tipo: 'despesa', valor: 500},
    {key: '6', tipo: 'receita', valor: 800},
    {key: '7', tipo: 'despesa', valor: 100},
    {key: '8', tipo: 'receita', valor: 300},
  ])
  
  const { user} = useContext(AuthContext) // acessando o user do contexto que contem os dados do usuario la no firebase

                                                    
 return (
   <Background>
      <Header/>
      <Container>
        <Nome>
          { 
            user && user.nome    /* nome do user logado se estiver logado  */ 
           } 
        </Nome> 
        <Saldo>R$ 123,00</Saldo>
      </Container>
      <Title>Ultimas  movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico} // recebe os dados atravez da state historico
        keyExtractor={item => item.key} // key de referencia
        renderItem={({ item }) => (<HitoricoList data={item} />)} // renderiza o component historico list que tb repassa a ele o item que contem todo os dados da state historico
      
      />
   </Background>
  );
}