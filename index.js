import * as React from 'react';
import { useState, useCallback, useEffect } from "react";
import { View, Button, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import estilos from './src/components/CreateUser/styleCreateUser.js';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateUser from './src/components/CreateUser/createUser.js';



export default function Inicio({data, navigation}){
    return(
        <SafeAreaView style={{flex: 1, backgroundColor: "#171d31"}}>
            <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
                {/* <Text style={{fontSize: 35}}>
                     Iniciooooo
                </Text> */}
                <Button
                title="Cadastrar Usuários"
                onPress={() =>
                    navigation.navigate('Profile')
                }
                />
            </View>
        </SafeAreaView>
    )
};