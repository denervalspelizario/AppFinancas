import React, {useContext} from "react"; // importando useContext para usar contexto
import { AuthContext } from '../contexts/auth' // importando contexto

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

function Routes(){

    const { signed } = useContext(AuthContext) // recebendo signed do AuthContext(ver context > auth.js)

    return(
        signed ?  <AppRoutes/> : <AuthRoutes/> // se signed for true(estiver logado) entra no app senão(nao esta logado) entra na autenticação
    )
    
}

export default Routes