import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
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
                // Remove libro from the libros state
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
            {libros.map((libro, index) => (
                <View key={index} style={styles.libro}>
                    <Text style={styles.title}>{libro.titulo}</Text>
                    <Text style={styles.author}>{libro.autor}</Text>
                    <Text style={styles.publisher}>{libro.editorial}</Text>
                    <Text style={styles.publicationDate}>{libro.fecha_publicacion}</Text>
                    <Button title="Eliminar" onPress={() => handleDelete(libro.libro_id)} />
                </View>
            ))}
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
    libro: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 16,
    },
    publisher: {
        fontSize: 14,
    },
    publicationDate: {
        fontSize: 12,
    },
});

export default LibrosUsuarioScreen;
