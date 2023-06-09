import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { TextInput, Button, Card, Avatar, Title } from 'react-native-paper';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const AgregarLibroScreen = ({ route }) => {
    const { token } = useContext(AuthContext);
    const { userId } = route.params;
    const navigation = useNavigation();
    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        register("titulo");
        register("autor");
        register("editorial");
        register("fecha_publicacion");
    }, [register]);

    const onSubmit = data => {
        axios
            .post(`http://192.168.1.54:3000/api/usuario/${userId}/libros`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(() => {
                Alert.alert('Libro insertado con éxito');
                navigation.navigate('PerfilScreen');
            })
            .catch((error) => {
                console.error('Error al insertar el libro: ', error);
                Alert.alert('Error al insertar el libro');
            });
    };

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
            <Card style={styles.card}>
                <Card.Title
                    title="Agregar Libro"
                    left={(props) => <Avatar.Icon {...props} icon="book-plus" />}
                />
                <Card.Content>
                    <TextInput
                        label="Título"
                        style={styles.input}
                        onChangeText={text => setValue("titulo", text)}
                    />
                    <TextInput
                        label="Autor"
                        style={styles.input}
                        onChangeText={text => setValue("autor", text)}
                    />
                    <TextInput
                        label="Editorial"
                        style={styles.input}
                        onChangeText={text => setValue("editorial", text)}
                    />
                    <TextInput
                        label="Fecha de Publicación"
                        style={styles.input}
                        onChangeText={text => setValue("fecha_publicacion", text)}
                    />
                </Card.Content>
                <Card.Actions>
                    <Button icon="content-save" mode="contained" onPress={handleSubmit(onSubmit)}>
                        Guardar
                    </Button>
                </Card.Actions>
            </Card>
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
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    card: {
        marginBottom: 10,
        width: '100%',
        maxWidth: 500,
    },
    input: {
        marginBottom: 10,
    },
});

export default AgregarLibroScreen;
