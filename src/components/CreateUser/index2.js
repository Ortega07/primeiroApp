import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";


export default function TaskList({data, handleDelete}){
    return(
        <Animatable.View
        style={estilos.container}
        useNativeDriver
        animation="bounceIn"
        duration={750}
        >
            <TouchableOpacity onPress={ () => handleDelete(data)}>
                <Ionicons name="md-checkmark-circle" size={30} color="#121212"/>
            </TouchableOpacity>
            <View>
                <Text style={estilos.task}> {data.tarefa} </Text>
            </View>
        </Animatable.View>

    )
}

const estilos = StyleSheet.create({
    container:{
        flex:1,
        margin: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 7,
        elevation: 1.5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset:{
            height:3,
            width:1
        }
    },
    task:{
        color: "#121212",
        fontSize: 20,
        paddingLeft: 8,
        paddingRight: 20
    }
})