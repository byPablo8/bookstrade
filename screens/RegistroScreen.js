import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <Icon
                name="chevron-left"
                type="fontawesome"
                onPress={() => navigation.goBack()}
                containerStyle={tw`absolute top-1 z-50 left-5 p-1 rounded-full`}
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={nombre}
                onChangeText={setNombre}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={apellido}
                onChangeText={setApellido}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                value={correoElectronico}
                onChangeText={setCorreoElectronico}
            />
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={setContrasena}
                secureTextEntry
            />
            <Button title="Registrar" onPress={registrarUsuario} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f5f5f5'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 6,
        borderRadius: 5,
        backgroundColor: '#fff'
    }
});

export default RegistroScreen;
