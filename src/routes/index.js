import React, {useContext} from "react"; // importando useContext para usar contexto
import { AuthContext } from '../contexts/auth' // importando contexto
import {View, ActivityIndicator} from 'react-native'
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){

    const { signed, loading } = useContext(AuthContext) // recebendo signed do AuthContext(ver context > auth.js)

    if(loading){
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                
                <ActivityIndicator size='large' color='#131313'/>

            </View>
        )
    }

    return(
        signed ?  <AppRoutes/> : <AuthRoutes/> // se signed for true(estiver logado) entra no app senão(nao esta logado) entra na autenticação
    )
    
}

export default Routes