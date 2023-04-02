import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../contexts/auth'
import Header from '../../components/Header';
import {Container, Background, Nome, Saldo, Title, List} from './styles'
import HitoricoList from '../../components/HitoricoList';
import firebase from '../../services/FirebaseConnection';
import { format, isBefore } from 'date-fns'
import { Alert } from 'react-native';

export default function Home() {

  const [historico, setHistorico] = useState([])
  const [saldo, setSaldo] = useState(0)

  const { user} = useContext(AuthContext) // acessando o user do contexto que contem os dados do usuario la no firebase
  const uid  = user && user.uid //acessdando o uid do user e jogando na consta uid


  // FUNCAO QUE RENDERIZA AS ULTIMAS 10 OPERAÇÕES
  useEffect(() => { // funcao que funciona assim que user loga
    async function loadList(){

                 // acessando user > id filho(child)> ON sempre fica monitorando > value(os dados que tem despesa e receita etc)   
      await firebase.database().ref('users').child(uid).on('value', (snapshot) =>{ 
        setSaldo(snapshot.val().saldo) // states saldo recebe saldo do usuario

      });

      await firebase.database().ref('historico') // acessando o historico
      .child(uid) // depois de acessar o historico o uid
      .orderByChild('date').equalTo(format(new Date, 'dd/MM/yyyy')) // order todos que tem a data de hoje - usando a biblioteca date-sf para formatar do jeito que aplicação pede
      .limitToLast(10).on('value', (snapshot) => { // retornando apenas os ultimos 10
        
        setHistorico([]); // garantindo que esteja zerado o state historico

        snapshot.forEach((childItem) => { // o 10 ultimos registros estão em snapshot vai ser adicionado em list
          let list = { 
            key: childItem.key,  // recebendo key
            tipo: childItem.val().tipo, // recebendo tipo de gasto
            valor: childItem.val().valor, // recebendo valor
            date: childItem.val().date, // propriedade quando foi adicionando estes itens
          };

        setHistorico(oldArray => [...oldArray, list].reverse()) // adicionando dados guardados e dados atuais a state historico que serão renderizados la no componet List
        })                                                    //  adicionada funcao reverse para que o ultimo item sempre esteja em primeiro    
      }) 
    }

    loadList() // chamando a funcao para que ela possa ser executada

  }, []) // SERÁ RENDERIZADA ASSIM QUE SE INICIA A APLICAÇÃO



  //FUNCAO QUE AO CHAMADA VERIFICA DATA SE DATA JA PASSOU RETORNA ALERTA SENAO OUTRO ALERTA COM ALERTA QUE CONTEM DADOS E BTN QUE CHAMA FUNCAO DELETESUCESS 
  function handleDelete(data){

    //Pegando data do item: 
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`)
    

    //Pegando a data de hoje
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, anoHoje] = formatDiaHoje.split('/')
    const dateHoje = new Date(`${anoHoje}/${mesHoje}/${diaHoje}`)
    


    if( isBefore(dateItem, dateHoje) ){ //isBefore devolve um boolen - compara se dataItem é ANTERIOR a dateHoje (nao esquecer de importar isBefore de date-fns) 
      // se a data do registro ja passou entra aqui !!
      alert('Voce não pode excluir um registro antigo!');
      return;
    }
      Alert.alert(
        'Cuidado Atenção!',
        `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
        [
          {
            text: 'Cancelar',
            style: 'cancel'
          },
          {
            text: 'Continuar',
            onPress: () => handleDeleteSucess(data)
          }
        ]
      )
    
  }

  // 
  async function handleDeleteSucess(data){ // funcao receb todo o data
    await firebase.database().ref('historico') // acessa historico> uid> key filha(que é os dados despe e receita) > funcao para remover
    .child(uid).child(data.key).remove()
    .then( async () => { // deu certo  removeu a key

      let saldoAtual = saldo
      data.tipo === 'despesa' ? // condicional para atualizar valor de saldo 
        saldoAtual += parseFloat(data.valor)  // se for depesa saldoAtual recebe saldo + valor de item que foi clicado para ser excluido
        :
        saldoAtual -= parseFloat(data.valor); // senao sera receita então subtrai saldo - valor de item que foi clicado para ser excluido

        await firebase.database().ref('users').child(uid)
        .child('saldo').set(saldoAtual);
    })
    .catch((error) => {
      console.log(error)
    })
  }

                                                    
 return (
   <Background>
      <Header/>
      <Container>
        <Nome>
          { 
            user && user.nome    /* nome do user logado se estiver logado  */ 
           } 
        </Nome> 
        <Saldo>
          R$ {
              saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') // state saldo que precisa ter 2 casas decimais e uma regex para a cada 3 casas decimais 1 ponto
            } 
          </Saldo>
      </Container>
      <Title>Ultimas  movimentações</Title>

      <List
        showsVerticalScrollIndicator={false}
        data={historico} // recebe os dados atravez da state historico
        keyExtractor={item => item.key} // key de referencia
        renderItem={({ item }) => (<HitoricoList data={item}  deleteItem={handleDelete} />)} // renderiza o component historico list que tb repassa a ele o item que contem todo os dados da state historico
      
      />
   </Background>
  );
}