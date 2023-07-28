import * as React from 'react';
import { useEffect, useState, useCallback} from 'react';
import { View, Text, SafeAreaView, StatusBar, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserList from './UserList';


export default function Inicio(){
    const [user, setUser] = useState([]);
    useEffect(()=>{
        const carregaUser = async () => { 
            try {
                const jsonValue = await AsyncStorage.getItem('@user');
                return jsonValue !== null ? setUser(JSON.parse(jsonValue)) : null;
            } catch (e) {
                console.log("O erro foi" + e);
            }
        }
        carregaUser();
        console.log("carregou")

    }, []);

    const handleDelete = useCallback((data) =>{
        const find = user.filter(r => r.name !== data.name);/* r de resultado */
        setUser(find);
    });

    useEffect( ()=>{
        const salva = async () => {
            try {
                const jsonValue = JSON.stringify(user);
                await AsyncStorage.setItem('@user', jsonValue);
            } catch (e) {
                // saving error
            }
        }

        salva();
        console.log(user)
    }, [user]);
    
    return(
        <SafeAreaView style={{ flex: 1,backgroundColor: "#171d31"}}>
            <StatusBar backgroundColor="#171d31" barStyle="light-content"/>
            <View style={{alignItems: "center"}}>
                <Text style={{fontSize: 35, color: 'white'}}>
                     Inicio
                </Text>
            </View>
            <View style={{marginTop: 15}}>
                <FlatList
                marginHorizontal={10}
                showsHorizontalScrollIndicator={false}
                data={user}
                keyExtractor={(item) => String(item.name)}
                renderItem={({item}) => <UserList data={item} handleDelete={handleDelete}/>}
                />
            </View>
                {/* <Button
                title="Cadastrar Usuários"
                onPress={() =>
                    navigation.navigate('Profile')
                }
                /> */}
            
        </SafeAreaView>
    )
};