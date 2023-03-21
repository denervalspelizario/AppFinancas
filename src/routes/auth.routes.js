import React from "react";
import { createNativeStackNavigator} from '@react-navigation/native-stack'

import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'


const Stack = createNativeStackNavigator()

export default function AuthRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen 
                name="SignIn" 
                component={SignIn}
                options={{
                    headerShown: false // desativando header da navegacao
                }}
            />
            <Stack.Screen 
                name="SignUp" 
                component={SignUp}
                options={{
                    headerStyle:{
                        backgroundColor: '#131313',
                        borderBottomWidth: 10,
                        borderBottomColor: '#00b94a',
                    },
                    headerTintColor: '#00b94a',
                    headerBackTitleVisible: false,
                    headerTitle: 'Voltar',
                    
                }}
                
            />
        </Stack.Navigator>
    )
}

