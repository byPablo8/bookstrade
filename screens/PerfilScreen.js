import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button, TextInput as PaperInput, Title, Subheading } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import EditProfileScreen from './EditProfileScreen';

const PerfilScreen = () => {
    const { token, setToken } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        if (token) {
            axios
                .get('http://192.168.1.54:3000/api/usuario', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
                    setName(response.data.nombre);
                    setEmail(response.data.correo_electronico);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [token]);

    const handleViewBooks = () => {
        navigation.navigate('LibrosUsuarioScreen', { userId: user.usuario_id });
    };

    const AgregarLibroUser = () => {
        navigation.navigate('AgregarLibroScreen', { userId: user.usuario_id });
    };


    const deleteUser = () => {
        Alert.alert(
            'Eliminar perfil',
            '¿Estás seguro de que quieres eliminar tu perfil permanentemente?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Sí, eliminar',
                    onPress: () => {
                        axios
                            .delete(`http://192.168.1.54:3000/api/usuarioDel/${user.usuario_id}`, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            })
                            .then(() => {
                                setToken(null);
                                navigation.navigate('HomeScreen');
                            })
                            .catch(error => {
                                console.error('Error deleting user:', error);
                            });
                    },
                },
            ],
            { cancelable: false },
        );
    };

    if (!token) {
        return (
            <View style={styles.container}>
                <Title>Debes iniciar sesión primero.</Title>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {user && (
                <>
                    <Avatar.Icon size={100} icon="account" style={styles.avatar} />
                    <Title style={styles.title}>{user.nombre}</Title>
                    <Subheading style={styles.subTitle}>{user.correo_electronico}</Subheading>
                    {editMode ? (
                        <>
                            <PaperInput
                                label="Nombre"
                                value={name}
                                onChangeText={setName}
                                style={styles.input}
                            />
                            <PaperInput
                                label="Email"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />
                        </>
                    ) : null}
                    <Button mode="contained" onPress={handleViewBooks} style={styles.button}>Ver mis libros</Button>
                    <Button mode="contained" onPress={AgregarLibroUser} style={styles.button}>Agregar un libro</Button>
                    <Button
                        mode="contained"
                        onPress={() => navigation.navigate('EditProfileScreen', { user })}
                        style={styles.button}>
                        Editar perfil
                    </Button>
                    <Button mode="outlined" onPress={deleteUser} style={styles.button}>Eliminar cuenta</Button>
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
    avatar: {
        backgroundColor: '#9C27B0',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        marginBottom: 5,
    },
    subTitle: {
        marginBottom: 20,
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

export default PerfilScreen;
