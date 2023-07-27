import React from "react";
import { useState, useCallback, useEffect } from "react";
import { View, Text, SafeAreaView, StatusBar, TextInput, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";// biblioteca de armazenamento
import estilos from './styleCreateUser.js';
import UserList from "./UserList.js";

export default function CreateUser(){    
    
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [user, setUser] = useState([]);
    
    function handleSave(){
        if(nome === "") return;
        const data = {
            // id: 0,
            name: nome,
            // email: email,
            // senha: senha
        };
        
        setUser([...user, data])
        setNome('');
    };

    useEffect(()=>{
        const carregaUser = async () => { 
            try {
                const jsonValue = await AsyncStorage.getItem('@user');
                return jsonValue !== null ? setUser(JSON.parse(jsonValue)) : null;
            } catch (e) {
                console.log("O erro foi "+e)
            }
        }
        carregaUser();

    }, []);

    useEffect( ()=>{
        const salva = async () => {
            try {
                const jsonValue = JSON.stringify(user);
                await AsyncStorage.setItem('@user', jsonValue);
            } catch (e) {
                // saving error
                console.log("O erro foi "+e)

            }
        }

        salva();
        console.log(user)
    }, [user]);
    
    const handleDelete = useCallback((data) =>{
        const find = user.filter(r => r.name !== data.name);/* r de resultado */
        setUser(find);
    })

    return(
        <>
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
                {/* <TouchableOpacity
                    style={estilos.botao3}
                    onPress={()=>{
                        navigation.navigate('Home')
                    }}
                >
                    <Text style={estilos.textBotao}>
                        Voltar
                    </Text>
                </TouchableOpacity> */}
                <View style={{marginTop: 15}}>
                    <FlatList
                    marginHorizontal={10}
                    showsHorizontalScrollIndicator={false}
                    data={user}
                    keyExtractor={(item) => String(item.name)}
                    renderItem={({item}) => <UserList data={item} handleDelete={handleDelete}/>}
                    />
                </View>
            </View>
            

        </SafeAreaView>
        </>
    )
}