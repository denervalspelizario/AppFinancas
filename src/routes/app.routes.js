import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import 'react-native-gesture-handler'; 


import Home from '../pages/Home'

const AppDrawer = createDrawerNavigator()

{/* criando rota em stack que sera rota de cadastro para home */}
function AppRoutes(){ 
    return(
        <AppDrawer.Navigator
            
        >
            <AppDrawer.Screen name='Home' component={Home}/>
        </AppDrawer.Navigator>

    )

}

export default AppRoutes