import React, { useState ,createContext } from "react"; // importando createcontext para criar um contexto 
import firebase from "../services/FirebaseConnection";

export const AuthContext = createContext({}) // variavel que recebe o create e contem um export para se usar tambem em outros compoentes

export default function AuthProvider({ children }){

    const [user, setUser] = useState(null)  

    // cadastro de usuario
    async function cadastro(email, password, nome){ // funcao ssincrona que recebe 3 parametros para cadastro
        
        await firebase.auth().createUserWithEmailAndPassword(email,password) // criacao de autenticacao com email e senha
        
        .then( async (value) => { // deu certo criou a autentificacao

            let uid = value.user.uid // let uid recebe o uid la do firebase

            await firebase.database().ref('users').child(uid).set({  // criando 2 filhos(saldo, nome) linkado ao uid do usuario

                saldo: 0,
                nome: nome
            })
            .then(()=>{ // deu certo criou os 2 filhos linkado ao user então

                let data ={ // objeto data recebe os dados do user
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }   
                setUser(data) // adiciona os dados ao state user ou seja agora o state user tera acesso a todos os dados do database do usuario logado             

            })
            /**
             Explicando o codigo 
             cria-se a autenticacao 
             depois cria 2 filhos linkado ao usuario(users) 
             então adiciona a um objeto os dados uid nome e email do usuario e adiciona a state user
             para poder acessar

             */

        })
    }

    return(
        <AuthContext.Provider value={ {signed: !!user ,user, cadastro} }>
            {children}
        </AuthContext.Provider>
    )
    // explicando o contexto toda vez que state user receber os dados de login ou seja estiver logado
    // o contexto envia as rotas como se fosse um props
    // os dados do usuario (ver tanto signIn e SignUp) 
}