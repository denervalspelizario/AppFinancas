import React, {useState} from 'react';
import { View, Text } from 'react-native';

import { Background, Container, Logo, AreaInput, Input, 
         SubmitButton, SubmitText, Link, Linktext, 
} from './styles'

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

 return (
  
  <Background>
    <Container>
      
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
        <SubmitButton>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>

        <Link>
          <Linktext>Criar uma conta</Linktext>
        </Link>  
    </Container>
   </Background> 
  );
}