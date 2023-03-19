import firebase from "firebase/app"; // importando o firebase
import 'firebase/database'; 
import 'firebase/auth';


/*
    ** após os imports vai até o site do firebase clica no app clica na engrenagem desce ate o copy
       copiando do const firebaseconfig ate o const app e cola neste arquivo e troca a const por let

    ** após o colar adicione a const app dentro da condicional if(linha 25)
    ** obs esse if tem que fica como na tela não usar o exemplod a documentação que dá erro

    ** se der erro do asyncstorage va em node_module > react-native > index.js depois ctrl + f
       e busca por asyncStorage  e comenta toda a exportação neste exemplo de linha 261 até 269
*/



let firebaseConfig = {
    apiKey: "AIzaSyDEkaFQffObmxyDOczG7OTTRS15HGPgGAA",
    authDomain: "meuapp-4f29c.firebaseapp.com",
    databaseURL: "https://meuapp-4f29c-default-rtdb.firebaseio.com",
    projectId: "meuapp-4f29c",
    storageBucket: "meuapp-4f29c.appspot.com",
    messagingSenderId: "987221353945",
    appId: "1:987221353945:web:f56ffb07244a055af8a5c8",
    measurementId: "G-ZNVB6E5RZC"
  };

  if(!firebase.apps.length){

    firebase.initializeApp(firebaseConfig);

  }
  
  export default firebase;
