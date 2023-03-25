import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "../components/CustomDrawer";


import Home from '../pages/Home'
import New from "../pages/New";
import Perfil from "../pages/Perfil";


const AppDrawer = createDrawerNavigator()

{/* criando rota em stack que sera rota de cadastro para home */}
function AppRoutes(){ 
    return(
        <AppDrawer.Navigator 
            drawerContent={CustomDrawer}
            screenOptions={{
        
                headerTintColor: '#00b94a', // color em qualquer elemento do header do drawer
                drawerActiveBackgroundColor: '#00b94a', // cor de fundo de rota ativada dentro do drawer
        
                drawerActiveTintColor: '#FFF', // cor de link ativo
        
                drawerInactiveBackgroundColor: '#000', // cor de fundo de rota não ativo dentro do drawer
                drawerInactiveTintColor: '#DDD',  //cor de link não ativo
        
                headerTitleAlign: 'center',
                
                headerStyle: {
                  backgroundColor : '#FFF',
                },

                drawerItemStyle: {
                    marginVertical: 5,
                }
              }}  
        >

            <AppDrawer.Screen name='Home' component={Home}/>
            <AppDrawer.Screen name='Registrar' component={New}/>
            <AppDrawer.Screen name='Perfil' component={Perfil}/>
        </AppDrawer.Navigator>

    )

}

export default AppRoutes