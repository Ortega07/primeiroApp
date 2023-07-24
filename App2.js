import React from "react";
import { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, FlatList, Modal, TextInput} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";// biblioteca de armazenamento
import { Ionicons } from '@expo/vector-icons'; // biblioteca de icones do expo
import TaskList from "./src/components/TaskList"; // importante a view da lista de tarefas
import * as Animatable from "react-native-animatable"; // biblioteca do react-native de animação

// Componente do botão animado de adicionar tarefas
const AnimatedBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App(){
    // lista de tarefas, mais tarde aprender a fazer isso com o banco de dados
    const [tarefa, setTarefa] = useState([]);

    // state que guarda o estado do modal, false = fechado, true = aberto
    const [abre, setAbre] = useState(false);
 
    const [input, setInput] = useState('');


    // Buscando todas as tarefas ao iniciar
    useEffect(()=>{
        const carregaTarefa = async () => { 
            try {
                const jsonValue = await AsyncStorage.getItem('@tarefa');
                return jsonValue !== null ? setTarefa(JSON.parse(jsonValue)) : null;
            } catch (e) {
                // error reading value
            }
        }

        // assim também funciona
        // async function carregaTarefa(){
        //     const tarefasArmazenada = await AsyncStorage.getItem('@tarefa');

        //     if(tarefasArmazenada !== null){
        //         setTarefa(JSON.parse(tarefasArmazenada));
        //     }
        // }

        carregaTarefa();

    }, []);// os [] vazios, quando o app for aberto a função anonima será chamada


    // salvando caso alguma tenha alguma tarefa alterada
    // no exemplo da documentação tem um parametro passada na função assincrona
    // porem se passar ela da erros
    useEffect( ()=>{
        const salva = async () => {
            try {
                const jsonValue = JSON.stringify(tarefa);
                await AsyncStorage.setItem('@tarefa', jsonValue);
            } catch (e) {
                // saving error
            }
        }

        // também pode ser utilizado assim
        // async function salvarTarefa(){
        //     await AsyncStorage.setItem('@tarefa', JSON.stringify(tarefa));
        // }

        salva();
    }, [tarefa]); // fica monitorando o state e sempre que algo acontecer ele vai salvar


    function botaoAdd(){
        if(input === "") return;
        const data = {
            key: input,
            tarefa: input
        };

        setTarefa([...tarefa, data]);
        setAbre(false);
        setInput('');

    }

    // aqui ele faz a função de delete
    const handleDelete = useCallback((data) =>{
        const find = tarefa.filter(r => r.key !== data.key);/* r de resultado */
        setTarefa(find);
    })

    return(
        // safe area view é para não ficar na frente do notch do iphone
        <SafeAreaView style={estilos.container}>
            {/* Barra de status do Android (mas não entendi direito o que muda
                pq no meu emulador não mudou
                 */}
            <StatusBar backgroundColor="#171d31" barStyle="light-content"/>
            
            {/* Titulo na página inicial */}
            <View style={estilos.conteudo}>
                <Text style={estilos.title}>
                    Minhas Tarefas
                </Text>
            </View>
            
            {/* 
                lista das Tarefas que foram criadas, automaticamente faz um loop com a quantidade de
                tarefas já criadas e mostra na tela
                a propriedade showHorizonblablabla esconde o scroll quando false
                a propriedade data são as informações que estão no banco de dados que eu quero
                que apareçam na minha lista
                o key extractor eu não entendi muito bem
                e o renderItem ele simplesmente mostra o dado na tela criando um componente e passando
                a informação do item como propriedade
            */}
            <FlatList
            marginHorizontal={10}
            showsHorizontalScrollIndicator={false}
            data={tarefa}
            keyExtractor={(item) => String(item.key)}
            renderItem={({item}) => <TaskList data={item} handleDelete={handleDelete} />}
            />

            {/* modal que leva para uma página para criar uma nova tarefa */}
            <Modal animationType="slide" transparent={false} visible={abre} >
                <SafeAreaView style={estilos.modal}>
                    <View style={estilos.modalHeader}>
                        <TouchableOpacity onPress={() => setAbre(false)}>
                            <Ionicons  style={{marginLeft: 5, marginRight: 5}} name="md-arrow-back" size={40} color="#FFF"/>
                        </TouchableOpacity>
                        <Text style={estilos.modalTitle}>Nova Tarefa</Text>
                    </View>
                    <Animatable.View animation="fadeInUp" useNativeDriver style={estilos.modalBody}>
                        <TextInput
                            multiline={true}
                            placeholderTextColor={"#747474"}
                            placeholder="O que precisa fazer hoje?"
                            value={input}
                            onChangeText={(texto) => setInput(texto)}
                            style={estilos.input}
                        ></TextInput>
                        <TouchableOpacity style={estilos.botaoAdd} onPress={botaoAdd}>
                            <Text style={estilos.botaoAddText}>
                                Cadastrar
                            </Text>
                        </TouchableOpacity>
                    </Animatable.View>
                </SafeAreaView>
            </Modal>

            {/*
                botão animado que abre o modal

            */}
            <AnimatedBtn
            style={estilos.fab}
            // estava dando problema e o botao depois da terceira tarefa adicionada ele sumia
            // useNativeDriver
            // animation="bounceInUp"
            // duration={1}
            onPress={() => setAbre(true)}
            >
                <Ionicons name='ios-add' size={40} color="#FFF"/>
            </AnimatedBtn>

        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: "#171d31"
    },
    conteudo:{
        alignItems: "center"
    },
    title:{
        marginTop: 20,
        fontSize: 30,
        paddingBottom: 10,
        color: "#FFFFFF"
    },
    fab:{
        position: "absolute",
        width: 60,
        height: 60,
        backgroundColor: "#0094ff",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        right: 30,
        bottom: 50,
        elevation: 2,
        zIndex: 9,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset:{
            width: 1,
            height:3
        }
    },
    modal:{
        flex: 1,
        backgroundColor: "#171d31"
    },
    modalHeader:{
        marginLeft: 10,
        marginTop: 20,
        flexDirection: "row",
        alignItems: 'center'
    },
    modalTitle:{
        marginLeft: 15,
        fontSize: 23,
        color: "#FFF",
    },
    modalBody:{
        marginTop: 15
    },
    input:{
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 30,
        backgroundColor: "#FFF",
        padding: 9,
        height: 85,
        textAlignVertical: "top",
        color: "#000",
        borderRadius: 5
    },
    botaoAdd:{
        backgroundColor: "#FFF",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 5
    },
    botaoAddText:{
        fontSize: 20
    }
});

