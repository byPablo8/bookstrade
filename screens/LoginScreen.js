import React, { useState, useContext } from 'react';
import { Button, TextInput, View, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext'; // Asegúrate de que la ruta sea correcta
import { useNavigation } from '@react-navigation/native'; // Para la navegación
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
        <View style={styles.container}>
            <Icon
                name="chevron-left"
                type="fontawesome"
                onPress={() => navigation.goBack()}
                containerStyle={tw`absolute top-1 z-50 left-5 p-1 rounded-full`}
            />
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                value={usuario}
                onChangeText={text => setUsuario(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={contrasena}
                onChangeText={text => setContrasena(text)}
                secureTextEntry
            />
            <Button title="Iniciar sesión" onPress={handleLogin} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
});

export default LoginScreen;
