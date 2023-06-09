import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Title, Card, Avatar } from 'react-native-paper';
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
                    containerStyle={tw`absolute top-10 z-50 left-5 p-1 rounded-full`}
                />
                <Title>Debes iniciar sesión primero.</Title>
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
                <Card style={styles.card}>
                    <Card.Title
                        title={`${user.nombre} ${user.apellido}`}
                        subtitle={user.correo_electronico}
                        left={(props) => <Avatar.Icon {...props} icon="account" />}
                    />
                    <Card.Actions>
                        <Button onPress={handleViewBooks}>Ver mis libros</Button>
                        <Button onPress={AgregarLibroUser}>Agregar un libro</Button>
                    </Card.Actions>
                </Card>
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
    card: {
        width: '100%',
        maxWidth: 500,
    },
});

export default PerfilScreen;
