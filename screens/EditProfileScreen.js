import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput as PaperInput, Title } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const EditProfileScreen = ({ route, navigation }) => {
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (route.params && route.params.user) {
            setUser(route.params.user);
            setName(route.params.user.nombre);
            setLastName(route.params.user.apellido);
            setEmail(route.params.user.correo_electronico);
            setUsername(route.params.user.usuario);
        }
    }, [route.params]);

    const updateUser = () => {
        const data = {
            nombre: name,
            apellido: lastName,
            correo_electronico: email,
            usuario: username,
        };

        if (password) {
            data.contrasena = password;
        }

        axios
            .put(`http://192.168.1.54:3000/api/usuario/${user.usuario_id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => {
                setUser(response.data);
                navigation.goBack();
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user && (
                <>
                    <Title style={styles.title}>Edit Profile</Title>
                    <PaperInput
                        label="Nombre"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <PaperInput
                        label="Apellido"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                    />
                    <PaperInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                    <PaperInput
                        label="Usuario"
                        value={username}
                        onChangeText={setUsername}
                        style={styles.input}
                    />
                    <PaperInput
                        label="Contraseña (opcional)"
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry
                    />
                    <Button mode="contained" onPress={updateUser} style={styles.button}>Guardar</Button>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    input: {
        width: '100%',
        marginBottom: 10,
    },
    button: {
        width: '100%',
        marginBottom: 10,
    },
});

export default EditProfileScreen;
