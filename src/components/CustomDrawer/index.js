import React from 'react';
import {Text, View, Image, StyleSheet} from 'react-native'
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer' 
import Logo from '../../../assets/Logo.png'
                                                                                    
                                                                                        

export default function CustomDrawer(props){  
                                                         
    return(
        <DrawerContentScrollView {...props} style={{backgroundColor: '#131313'}}>
            <View style={{  
                width: '100%',
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 30,
                
            }}>
                <Image 
                    source={Logo} 
                    style={{width: 100, height: 100}}
                />   

                <Text style={{color: '#FFF', fontSize: 20, marginTop: 25, fontWeight: 'bold', marginBottom: 35}}> 
                    App Finança                                             
                </Text> 

            </View>

            <DrawerItemList   style={{ fontSize: 25}}
                
                {...props}   
            />
        </DrawerContentScrollView>
    )
}