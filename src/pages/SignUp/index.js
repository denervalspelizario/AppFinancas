import React, {useState, useContext} from 'react';
import { View, Text } from 'react-native';
import { Platform } from 'react-native'; //  elemento para saber qual plataforma se esta ultilizando android/ios

import { Background, Container, Logo, AreaInput, Input, 
         SubmitButton, SubmitText, Link, Linktext, 
} from '../SignIn/styles.js'
import { AuthContext } from '../../contexts/auth';

export default function SignUp() {
  const [nome, setNome] = useState('')  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { cadastro } = useContext(AuthContext) // acessando contexto jogando na cont user (ver src > contexts > auth.js) naoe squeça de importar ver linha 8
  
  function funcaoCadastro(){          // funcao que ao clicar adiciona as states que são dados do input na 
                                      // funcao cadastro que envia esses dados la no firebase ( ver src > contexts > auth.js  )
    cadastro(email, password, nome)
  
  }

 return (
  
  <Background>
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''} // se estiver no ios(nao esquecer o import plataform) padding, pra dar o salto na tela quando o teclado for ativado
                                                        // pois no android é default 
      enable // precisa do enable pra comecar como true
    >
      <AreaInput>
        <Input
          placeholder='Digite seu nome'
          autoCorrect={false}
          autoCapitalize='none'
          value={nome}
          onChangeText={(text) => setNome(text) }
        />
      </AreaInput>   


      <AreaInput>
        <Input
          placeholder='Email'
          autoCorrect={false}
          autoCapitalize='none'
          value={email}
          onChangeText={(text) => setEmail(text) }
        />
      </AreaInput>  
      
      <AreaInput>  
        <Input
          placeholder='Password'
          autoCorrect={false}
          autoCapitalize='none'
          value={password}
          onChangeText={(text) => setPassword(text) }
        />
      </AreaInput>  
        <SubmitButton 
          onPress={funcaoCadastro} // ao clicar chama a funcaod e cadastro
           >
          <SubmitText>Cadastrar</SubmitText>
        </SubmitButton>
     

        
    </Container>
   </Background> 
  );
}