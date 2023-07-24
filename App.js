import React from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Inicio from "./src/components/CreateUser";
import CreateUser from "./src/components/CreateUser/createUser";

const Stack = createNativeStackNavigator();

export default function App(){
    return(
        <>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                    name="Home"
                    component={Inicio}
                    options={{headerShown: false}}
                    />
                    
                    <Stack.Screen
                    name="Profile"
                    component={CreateUser}
                    options={{headerShown: false}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
            
        </>
    )
}