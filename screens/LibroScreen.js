import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const LibroScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [libros, setLibros] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Hacer una solicitud GET a tu servidor Node.js para obtener los libros de la base de datos
    axios.get('http://192.168.1.54:3000/api/libros')
      .then((response) => {
        setLibros(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Icon
        name="chevron-left"
        type="fontawesome"
        onPress={() => navigation.goBack()}
        containerStyle={tw`absolute top-1 z-50 left-5 p-1 rounded-full`}
      />

      <Text style={styles.header}>Lista de Libros</Text>
      <FlatList
        data={libros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.text}>Título: {item.titulo}</Text>
            <Text style={styles.text}>Autor: {item.autor}</Text>
            <Text style={styles.text}>Editorial: {item.editorial}</Text>
            <Text style={styles.text}>Fecha de publicación: {item.fecha_publicacion}</Text>
            <Text style={styles.text}>Usuario ID: {item.usuario_id}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10
  },
  text: {
    fontSize: 18,
    marginVertical: 10
  }
});

export default LibroScreen;