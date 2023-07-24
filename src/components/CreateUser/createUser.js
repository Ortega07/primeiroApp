import React from "react";
import { useState, useCallback, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity} from 'react-native';
import estilos from './styleCreateUser.js';


export default function CreateUser({data, navigation}){
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [user, setUser] = useState([]);
        // id: 0,
        // nome: '',
        // email: '',
        // senha: ''
    

    function handleSave(){
        const data = {
            id: 0,
            nome: nome,
            email: email,
            senha: senha
        };

        // setUser([...user, data])
        
        // setUser([...user, data]);
        setUser([[...user], data])
        console.log(user)
    };

    return(
        <SafeAreaView style={estilos.container}>
            <StatusBar backgroundColor="#171d31" barStyle="light-content"/>
            <View style={estilos.conteudo}>
                <Text style={estilos.texto}>
                    Cadastro de Usuários
                </Text>

                <TextInput
                    multiline={true}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={(data) => setNome(data)}
                    placeholderTextColor={"grey"}
                    style={estilos.input}
                >
                </TextInput>

                <TextInput
                    multiline={true}
                    placeholder="E-mail"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={(data) => setEmail(data)}
                    placeholderTextColor={"grey"}
                    style={estilos.input}
                >
                </TextInput>

                <TextInput
                    multiline={true}
                    placeholder="Senha"
                    textContentType="password"
                    value={senha}
                    onChangeText={(data) => setSenha(data)}
                    placeholderTextColor={"grey"}
                    style={estilos.input}
                >
                </TextInput>

                <TouchableOpacity
                    style={estilos.botao}
                    onPress={handleSave}
                >
                    <Text style={estilos.textBotao}>
                        Cadastrar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={estilos.botao2}
                    onPress={()=>{
                        setNome('');
                        setEmail('');
                        setSenha('');
                    }}
                >
                    <Text style={estilos.textBotao2}>
                        Limpar
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={estilos.botao3}
                    onPress={()=>{
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={estilos.textBotao}>
                        Voltar
                    </Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}