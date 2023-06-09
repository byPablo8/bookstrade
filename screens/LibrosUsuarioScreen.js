import React, { useContext, useEffect, useState } from 'react';
import { View, Alert, StyleSheet, ScrollView } from 'react-native';
import { List, Avatar, Button, Card, Title } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const LibrosUsuarioScreen = ({ route }) => {
    const { token } = useContext(AuthContext);
    const [libros, setLibros] = useState([]);
    const { userId } = route.params;
    const navigation = useNavigation();

    useEffect(() => {
        axios
            .get(`http://192.168.1.54:3000/api/usuario/${userId}/libros`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setLibros(response.data);
            })
            .catch((error) => {
                console.error('Error al buscar los libros:', error);
            });
    }, [userId, token]);

    const handleDelete = (libroId) => {
        axios
            .delete(`http://192.168.1.54:3000/api/usuario/${userId}/libros/${libroId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                Alert.alert('Libro eliminado con éxito');
                setLibros(libros.filter((libro) => libro.libro_id !== libroId));
            })
            .catch((error) => {
                console.error('Error al eliminar el libro: ', error);
                Alert.alert('Error al eliminar el libro');
            });
    };

    if (!token) {
        return (
            <View style={styles.container}>
                <Title style={styles.message}>Debes iniciar sesión primero.</Title>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Title style={styles.title}>Mis Libros</Title>
            <Icon
                name="chevron-left"
                type="fontawesome"
                onPress={() => navigation.goBack()}
                containerStyle={tw`absolute top-10 z-50 left-5 p-1 rounded-full`}
            />
            {libros.map((libro, index) => (
                <Card style={styles.card} key={index}>
                    <Card.Title
                        title={libro.titulo}
                        left={(props) => <Avatar.Icon {...props} icon="book" />}
                    />
                    <List.Accordion
                        title="Detalles"
                        left={props => <List.Icon {...props} icon="information" />}
                    >
                        <List.Item title={`Autor: ${libro.autor}`} />
                        <List.Item title={`Editorial: ${libro.editorial}`} />
                        <List.Item title={`Fecha de publicación: ${libro.fecha_publicacion}`} />
                    </List.Accordion>
                    <Card.Actions>
                        <Button icon="delete" mode="contained" onPress={() => handleDelete(libro.libro_id)}>
                            Eliminar
                        </Button>
                    </Card.Actions>
                </Card>
            ))}
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
    card: {
        marginBottom: 10,
        width: '100%',
        maxWidth: 500,
    },
    message: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LibrosUsuarioScreen;
