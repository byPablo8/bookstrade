import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
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
                alert('Libro insertado con éxito');
                navigation.navigate('PerfilScreen');
            })
            .catch((error) => {
                console.error('Error al insertar el libro: ', error);
                alert('Error al insertar el libro');
            });
    };

    return (
        <View style={styles.container}>
            <Icon
                name="chevron-left"
                type="fontawesome"
                onPress={() => navigation.goBack()}
                containerStyle={tw`absolute top-10 z-50 left-5 p-1 rounded-full`}
            />
            <Text style={styles.label}>Título:</Text>
            <TextInput style={styles.input} onChangeText={text => setValue("titulo", text)} />
            <Text style={styles.label}>Autor:</Text>
            <TextInput style={styles.input} onChangeText={text => setValue("autor", text)} />
            <Text style={styles.label}>Editorial:</Text>
            <TextInput style={styles.input} onChangeText={text => setValue("editorial", text)} />
            <Text style={styles.label}>Fecha de Publicación:</Text>
            <TextInput style={styles.input} onChangeText={text => setValue("fecha_publicacion", text)} />
            <Button
                title="Enviar"
                onPress={handleSubmit(onSubmit)}
            />
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
    label: {
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
    },
});

export default AgregarLibroScreen;
