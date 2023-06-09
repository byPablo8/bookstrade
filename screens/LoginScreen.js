import React, { useState, useContext } from 'react';
import { View, Image, Alert, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Card, Avatar, Title } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from './AuthContext'; 
import { useNavigation } from '@react-navigation/native'; 
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const LoginScreen = () => {
    const { setToken } = useContext(AuthContext);
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.1.54:3000/login', {
                usuario,
                contrasena,
            });

            if (response.data.success) {
                setToken(response.data.accessToken);
                Alert.alert('Inicio de sesión exitoso', `Bienvenido ${usuario}`);
                navigation.navigate('HomeScreen');
            } else {
                Alert.alert('Error', response.data.message);
            }
        } catch (error) {
            Alert.alert('Error', 'Ocurrió un error al iniciar sesión.');
            console.error(error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.logo}
                source={require("./book.png")}
            />
            <Icon
                name="chevron-left"
                type="fontawesome"
                onPress={() => navigation.goBack()}
                containerStyle={tw`absolute top-10 z-50 left-5 p-1 rounded-full`}
            />
            <Card style={styles.card}>
                <Card.Title
                    title="Iniciar sesión"
                    left={(props) => <Avatar.Icon {...props} icon="login" />}
                />
                <Card.Content>
                    <TextInput
                        label="Usuario"
                        value={usuario}
                        onChangeText={text => setUsuario(text)}
                        style={styles.input}
                    />
                    <TextInput
                        label="Contraseña"
                        value={contrasena}
                        onChangeText={text => setContrasena(text)}
                        secureTextEntry
                        style={styles.input}
                    />
                </Card.Content>
                <Card.Actions>
                    <Button icon="login" mode="contained" onPress={handleLogin}>
                        Iniciar sesión
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 28,
        textAlign: 'center',
        color: '#444',
        marginBottom: 50,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    card: {
        marginBottom: 10,
        width: '100%',
        maxWidth: 500,
    },
    input: {
        marginBottom: 10,
    },
});

export default LoginScreen;
