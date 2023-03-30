import React, {useState, useContext} from 'react';
import { useNavigation } from '@react-navigation/native'
import {  SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import Header from '../../components/Header'
import  {Background, Input, SubmitButton, SubmitText} from './styles.js'
import Picker from '../../components/Picker/index.android'; // somente até picker pois quandoo user acessar se tiver em android puxa index.android se for ios ele puxa index.ios
import firebase from '../../services/FirebaseConnection';
import { format } from 'date-fns' //importando biblioteca de formatacao de data comando expo install date-fns ve em https://date-fns.org/docs/Getting-Started
import { AuthContext} from '../../contexts/auth'





export default function New() {

  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState(null);
  const navigation = useNavigation();
  const { user: usuario } = useContext(AuthContext); // tranformei o user do authContext em usuario para não dar conflito

  function handleSubmit(){ // funcao dispara ao clicar em btn registrar
    
    Keyboard.dismiss() // desativa teclado
    
    if(isNaN(parseFloat(valor)) || tipo === 'escolha'){ // verifica se o numero digitado no input é um numero ou não OU o tipo igual a null
                                  // como o state valor vem em string tem que converter  
      
      alert('Preencha todos os campo')
      
      return // return para parar execução pois precisa preenchar todos os campos 
    }

    Alert.alert(
      'Confirmando dados',
      `Tipo ${tipo} - Valor: ${parseFloat(valor)}`,
    
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleAdd()
        }
      ]
    )
  }

  async function handleAdd(){ // como essa funcao depende de buscar no firebase sera uma funcao assincrona
      
    let uid = usuario.uid // buscando o uid do usuario logado atravez do AuthContext 

    let key = await firebase.database().ref('historico').child(uid).push().key; // gerando key filha(child) aleatoria com nome de historico linkado ao user logado

    await firebase.database().ref('historico').child(uid).child(key).set({ // adicionado a key historico os dados

      tipo: tipo, // state tipo
      valor: parseFloat(valor), //state valor - precisou tranforma-la de string para number
      date: format(new Date(), 'dd/MM/yy') // anexando data no formato que seja padrao para ios e android atravez da biblioteca date-fns

    })
    // atualizando o saldo
    let user = firebase.database().ref('users').child(uid) // acessando o uid do user logado

    await user.once('value').then((snapshot) => { // acessando uma vez 

      let saldo = parseFloat(snapshot.val().saldo)  // o saldo do user(o saldo vem em string precisa tranformar em number)

      tipo === 'despesa' ? saldo -= parseFloat(valor) : saldo += parseFloat(valor) // se o tipo for despesa saldo = saldo - valor senao saldo = saldo +  valor

      user.child('saldo').set(saldo) // acessando o filho(child) chamado saldo e atualizando com novo saldo

    })
    Keyboard.dismiss() // fechando o teclado
    setValor('') // zerando o state valor que zera o input
    navigation.navigate('Home')

  }

  
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

        <SubmitButton onPress={handleSubmit}>
          <SubmitText>Registar</SubmitText>
        </SubmitButton>
      </SafeAreaView>

    </Background>
    </TouchableWithoutFeedback>
  );
}