import React, {useState} from 'react';
import {  SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Header from '../../components/Header'
import  {Background, Input, SubmitButton, SubmitText} from './styles.js'
import Picker from '../../components/Picker'; // somente até picker pois quandoo user acessar se tiver em android puxa index.android se for ios ele puxa index.ios





export default function New() {

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('receita');

  
 return (
    <TouchableWithoutFeedback 
      onPress={() => Keyboard.dismiss()} // adicionando um botao sobre toda a area da screen que quando clicado o teclado desativa 
                                         //ou seja clicou em qualquer area que não seja input desliga o keyboard
      >
    <Background>
      
      <Header/>
      
      <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
        <Input 
          placeholder='Valor desejado'
          keyboardType='numeric' // keyboard tipo numerico 
          returnKeyType='next' // o botao no keyboard nao vai ser de enviar vai ser de next
          onSubmitEditing={() => Keyboard.dismiss()} // desativa o teclado apos dar next 
          value={valor} // valor inicial de input
          onChangeText={(text) => setValor(text)} // dado digitado no input é adicionado na state valor
        />
        <Picker onChange={setTipo} tipo={tipo}/>

        <SubmitButton>
          <SubmitText>Registar</SubmitText>
        </SubmitButton>
      </SafeAreaView>

    </Background>
    </TouchableWithoutFeedback>
  );
}