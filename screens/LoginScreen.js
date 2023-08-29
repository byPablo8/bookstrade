import React, { useState, useContext } from 'react';
import { View, Image, Alert, StyleSheet, SafeAreaView, ScrollView, TextInput as RNTextInput } from 'react-native';
import { Button, Avatar, Title, useTheme, TextInput } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

const LoginScreen = () => {
    const { setToken } = useContext(AuthContext);
    const navigation = useNavigation();
    const { colors } = useTheme();
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
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <Icon
                    name="chevron-left"
                    type="fontawesome"
                    onPress={() => navigation.goBack()}
                    containerStyle={styles.iconContainer}
                />
                <Image
                    style={styles.logo}
                    source={require("./book.png")}
                />
                <Title style={[styles.title, { color: colors.onBackground }]}>Iniciar sesión</Title>
                <TextInput
                    label="Usuario"
                    value={usuario}
                    onChangeText={text => setUsuario(text)}
                    style={styles.input}
                    mode="outlined"
                />
                <TextInput
                    label="Contraseña"
                    value={contrasena}
                    onChangeText={text => setContrasena(text)}
                    secureTextEntry
                    style={styles.input}
                    mode="outlined"
                />
                <Button mode="contained" onPress={handleLogin} style={styles.button}>
                    Iniciar sesión
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        left: 5,
        padding: 5,
        borderRadius: 25,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginBottom: 50,
        fontWeight: 'bold',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 50,
    },
    input: {
        width: '100%',
        maxWidth: 400,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        maxWidth: 400,
        marginTop: 10,
    },
});

export default LoginScreen;