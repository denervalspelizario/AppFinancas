import React, {useContext} from 'react';
import { AuthContext } from '../../contexts/auth' // importando o context
import { useNavigation } from '@react-navigation/native'
import {Container, Nome, NewLink, NewText, Logout, LogoutText} from './styles'



export default function Perfil() {

  const navigation = useNavigation(); // navigation recebendo  biblioteca de navegação

  const { user, logout } = useContext(AuthContext) // acessando o user do contexto que contem os dados do usuario la no firebase
                                                   // chamando a funcao assincrona de logout  
  
 return (
   <Container>
      <Nome>  
        {
          user && user.nome   // se user estiver ativado entao acesso user.nome
        }
      </Nome>
      <NewLink 
        onPress={() => navigation.navigate('Registrar') // ao clicar nagea até registrar 
        }>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout onPress={() => logout()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
   </Container>
  );
}