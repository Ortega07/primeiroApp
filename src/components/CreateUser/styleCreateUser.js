import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
    
    container:{
        flex:1,
        backgroundColor: "#171d31"
    },
    conteudo:{
        flex: 1,
        alignItems: "center",
        // justifyContent: "center",
    },  
    texto:{
        marginTop: 10,
        color: "#FFF",
        fontSize: 20,
    },
    input:{
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: "#FFF",
        padding: 9,
        textAlignVertical: "top",
        color: "#000",
        borderRadius: 5,
        width: 300,
        textAlign: "center",
    },
    botao:{
        backgroundColor: "#007AFF",
        marginTop: 30,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 5,
    },
    botao2:{
        backgroundColor: "yellow",
        marginTop: 15,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 5,
    },
    botao3:{
        backgroundColor: "grey",
        marginTop: 15,
        width: 150,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        borderRadius: 5,
    },
    textBotao:{
        color: 'white',
        fontSize: 15
    },
    textBotao2:{
        color: '#121212',
        fontSize: 15
    },
    lista:{
        backgroundColor: "#FFF",
        margin: 8,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 5,
        padding: 7,
        width: 350,
        marginTop: 8
        
    },
    textoLista:{
        marginLeft: 10,
        fontSize: 17
    }
});

export default estilos;