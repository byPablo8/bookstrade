import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const PerfilScreen = () => {
    const { token } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const navigation = useNavigation();
    useEffect(() => {
        if (token) {
            // Obtenemos los datos del usuario
            axios
                .get('http://192.168.1.54:3000/api/usuario', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUser(response.data);
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

    if (!token) {
        return (
            <View style={styles.container}>
                <Icon
                    name="chevron-left"
                    type="fontawesome"
                    onPress={() => navigation.goBack()}
                    containerStyle={tw`absolute top-1 z-50 left-5 p-1 rounded-full`}
                />
                <Text style={styles.message}>Debes iniciar sesión primero.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Icon
                name="chevron-left"
                type="fontawesome"
                onPress={() => navigation.goBack()}
                containerStyle={tw`absolute top-10 z-50 left-5 p-1 rounded-full`}
            />
            {user && (
                <>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.text}>{user.nombre}</Text>
                    <Text style={styles.label}>Apellido:</Text>
                    <Text style={styles.text}>{user.apellido}</Text>
                    <Text style={styles.label}>Correo electrónico:</Text>
                    <Text style={styles.text}>{user.correo_electronico}</Text>
                    <Button
                        title="Ver mis libros"
                        onPress={handleViewBooks}
                    />
                    <Text></Text>
                    <Button
                        title="Agregar un libro"
                        onPress={AgregarLibroUser}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    message: {
        fontSize: 18,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default PerfilScreen;
