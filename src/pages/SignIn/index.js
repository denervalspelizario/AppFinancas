import React, {useState} from 'react';
import { View, Text } from 'react-native';
import { Platform } from 'react-native'; //  elemento para saber qual plataforma se esta ultilizando android/ios
import { useNavigation } from '@react-navigation/native' // importando a biblioteca de navegação

import { Background, Container, Logo, AreaInput, Input, 
         SubmitButton, SubmitText, Link, Linktext, 
} from './styles'

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation() // acessando a navegação

 return (
  
  <Background>
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : ''} // se estiver no ios(nao esquecer o import plataform) padding, pra dar o salto na tela quando o teclado for ativado
                                                        // pois no android é default 
      enable // precisa do enable pra comecar como true
    >
      
      <Logo
        source={require('../../../assets/Logo.png')}
      />

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
        <SubmitButton >
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link
          onPress={() => navigation.navigate('SignUp') // funcao anonima que sera disparada ao clicar e navegará até a page SignUp
        }>
          <Linktext>Criar uma conta</Linktext>
        </Link>  
    </Container>
   </Background> 
  );
}