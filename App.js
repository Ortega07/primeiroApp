import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';  

import Inicio from "./src/components/CreateUser";
import CreateUser from "./src/components/CreateUser/createUser";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App(){
    return(
        <>
        <NavigationContainer>    
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Início') {
                        iconName = focused
                        ? 'infocirlce'
                        : 'infocirlceo';
                    } else if (route.name === 'Usuário') {
                        iconName = focused ? 'user' : 'user';
                    }
        
                    // You can return any component that you like here!
                    return <AntDesign name={iconName} size={size} color={color} />
                    ;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'grey',
                })}
                options={{}}
            >
                <Tab.Screen
                    name="Início"
                    component={Inicio}
                    options={{headerShown: false}}
                />
                
                <Tab.Screen
                    name="Usuário"
                    component={CreateUser}
                    options={{headerShown: false}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    </>
    )
}