import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Button} from "react-native";
import estilos from "./styleCreateUser";


export default function UserList({data, handleDelete}){
    return(
        <View style={estilos.lista}>
            <Button title='x' onPress={ () => handleDelete(data)}/>
            <View>
                <Text style={estilos.textoLista}>Usuário: {data.name}</Text>        
            </View>
        </View>
    )
}