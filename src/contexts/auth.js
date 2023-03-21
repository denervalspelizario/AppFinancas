import React, { useState ,createContext } from "react"; // importando createcontext para criar um contexto 

export const AuthContext = createContext({}) // variavel que recebe o create e contem um export para se usar tambem em outros compoentes

export default function AuthProvider({ children }){

    const [user, setUser] = useState({
        nome: 'Desenvolvedor'
    })  

    return(
        <AuthContext.Provider value={ {user} }>
            {children}
        </AuthContext.Provider>
    )
}