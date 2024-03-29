import React, { useState } from 'react';
import { View, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Avatar, Title } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const RegistroScreen = () => {
    const navigation = useNavigation();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');

    const registrarUsuario = async () => {
        try {
            const response = await axios.post('http://192.168.1.54:3000/usuarios', {
                nombre,
                apellido,
                correo_electronico: correoElectronico,
                usuario,
                contrasena
            });

            if (response.data) {
                Alert.alert("Usuario registrado con éxito");
                navigation.navigate('LoginScreen');
            }
        } catch (error) {
            Alert.alert("Error al registrar el usuario", error.message);
        }
    }


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

            {/* Eliminamos el Card y usamos las vistas directamente */}
            <Title style={styles.title}>Registrarse</Title>
            <TextInput
                label="Nombre"
                value={nombre}
                onChangeText={setNombre}
                style={styles.input}
            />
            <TextInput
                label="Apellido"
                value={apellido}
                onChangeText={setApellido}
                style={styles.input}
            />
            <TextInput
                label="Correo Electrónico"
                value={correoElectronico}
                onChangeText={setCorreoElectronico}
                style={styles.input}
            />
            <TextInput
                label="Usuario"
                value={usuario}
                onChangeText={setUsuario}
                style={styles.input}
            />
            <TextInput
                label="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
                style={styles.input}
            />
            <Button icon="account-plus" mode="contained" onPress={registrarUsuario} style={{ marginBottom: 20 }}>
                Registrarse
            </Button>

            {/* Vista Espaciador al final */}
            <View style={{ height: 60 }}></View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        color: '#444',
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
        maxWidth: 500,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        maxWidth: 500,
        marginTop: 10,
    },
});

export default RegistroScreen;
