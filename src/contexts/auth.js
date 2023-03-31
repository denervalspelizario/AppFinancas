import React, { useState ,createContext, useEffect } from "react"; // importando createcontext para criar um contexto
import AsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "../services/FirebaseConnection";

export const AuthContext = createContext({}) // variavel que recebe o create e contem um export para se usar tambem em outros compoentes

export default function AuthProvider({ children }){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // o loading se inicia como true e funciona até fazer as verificações do useEffect ver routes > index.js 
    
    const [loadingAuth, setLoadingAuth] = useState(false) 
    /* 
        state de loadingAuth inicia como false e só vai ser true assim que o usuario clicar nos botões acessa e cadastrar
        enquanto estiver true o ActivityIndicator ficara funcionando assim que tiver o retorno de sucesso ou do login ou do cadastro com sucesso
        ai sim ele se torna false e desliga o ActivityIndicator

    */
    

    useEffect(() => { // funcao que vai iniciar toda vez que o app inicar

        async function loadStorage(){

            const storageUser = await AsyncStorage.getItem('Autentica_user') // const recebe dados do usuario ver funcao salvaDadosUser

            if(storageUser){ // se const tiver os dados ou seja usuário estiver logado

                setUser(JSON.parse(storageUser)) // state user recebe os dados da const 
                                                 //(lembrando que os dados estavam em string por isso precisa transforma-los de string para JSON)

                setLoading(false) // state loading recebe false fazendo o loading desligar pq os dados chegaram
            }

            setLoading(false) // fora do if ou seja a const nao tem dados a state tb recebe false pois nao tem dados a receber 
        }

        loadStorage()

    }, []) // com esta vazio inicia ao inicar o app componetDidMount


    // Funcao para logar o usuario
    async function login(email, password){

        setLoadingAuth(true)    

        await firebase.auth().signInWithEmailAndPassword(email, password) // acessa o database e loga com os parametros emai e password
        .then(async(value)=> { // deu certo
            
            let uid = value.user.uid  //adiciona a variavel o valor de uid do user

            await firebase.database().ref('users').child(uid).once('value') // acessa 1 unica vez o filho do user (uid) que é a id linkado cokm o login do usuario
            .then((snapshot)=> { // deu certo
                let data ={ // data recebe os dados do user 
                    uid: uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                };
                
                
                setUser(data) // adiciona ps dados de user pela variavel a state user para poder acessa-lo de maneira dinamica
                
                salvaDadosUser(data) // funcao dque mantem login recebendo os dados do firebase

                setLoadingAuth(false)
            })

        })
        .catch((error)=> {
            alert(error.code)
            setLoadingAuth(false)
        })
    }   



    // cadastro de usuario
    async function cadastro(email, password, nome){ // funcao ssincrona que recebe 3 parametros para cadastro
        
        setLoadingAuth(true)

        await firebase.auth().createUserWithEmailAndPassword(email,password) // criacao de autenticacao com email e senha
        .then( async (value) => { // deu certo criou a autentificacao

            let uid = value.user.uid // let uid recebe o uid la do firebase

            await firebase.database().ref('users').child(uid).set({  // criando 2 filhos(saldo, nome) linkado ao uid do usuario

                saldo: 0,
                nome: nome
            })
            .then(() => { // deu certo criou os 2 filhos linkado ao user então

                let data ={ // objeto data recebe os dados do user
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }   
                setUser(data) // adiciona os dados ao state user ou seja agora o state user tera acesso a todos os dados do database do usuario logado             
                
                salvaDadosUser(data) // funcao que mantem login recebendo os dados do firebase

                setLoadingAuth(false)
            })
            /**
             Explicando o codigo 
             cria-se a autenticacao 
             depois cria 2 filhos linkado ao usuario(users) 
             então adiciona a um objeto os dados uid nome e email do usuario e adiciona a state user
             para poder acessar

             */

        })
        .catch((error)=> {
            alert(error.code)
            setLoadingAuth(false)
        })
    }


    // funcao que salva os dados de login
    async function salvaDadosUser(data){ //funcao assincrona recebe  os dados do firebase e os salva

        await AsyncStorage.setItem('Autentica_user', JSON.stringify(data)) // salvando os dados do firebase  em um item(autentica_user)
                                                                              // como no async storage precisa que os dois parametros sejam string 
                                                                              // foi transformado data em string usando JSON.stringify      
    }



    // funcao para deslogar
    async function logout(){
        await firebase.auth().signOut() // vai ate a autenticacao do firebase e encerra 
        await AsyncStorage.clear() // limpa todos os dados salvos
        .then(()=> { // deu certo limpou os dados
            setUser(null) // entao altera a state user para null fazendo deslogar no app
        })  
        // ou seja ao acessar a funcao ele desloga no firebase e limpa todos os dados que estavam salvos do usuário logado
    }

    return(
        <AuthContext.Provider 
            value={ 
                {signed: !!user ,user, cadastro, login, logout, loading, loadingAuth} }>
            {children}
        </AuthContext.Provider>
    )
    // explicando o contexto toda vez que state user receber os dados de login ou seja estiver logado
    // o contexto envia as rotas como se fosse um props
    // os dados do usuario (ver tanto signIn e SignUp) 
}