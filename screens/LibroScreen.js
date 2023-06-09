import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Card, Avatar, Title, List, Searchbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const LibroScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [libros, setLibros] = useState([]);
  const [filteredLibros, setFilteredLibros] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('http://192.168.1.54:3000/api/libros')
      .then((response) => {
        setLibros(response.data);
        setFilteredLibros(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredLibros(libros.filter((libro) =>
        libro.titulo.toLowerCase().includes(query.toLowerCase())
      ));
    } else {
      setFilteredLibros(libros);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Icon
        name="chevron-left"
        type="fontawesome"
        onPress={() => navigation.goBack()}
        containerStyle={tw`absolute top-1 z-50 left-5 p-1 rounded-full`}
      />
      <Title style={styles.title}>Lista de Libros</Title>
      <Searchbar
        placeholder="Buscar"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    
      {filteredLibros.map((libro, index) => (
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
    marginBottom: 20,
  },
  card: {
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
});

export default LibroScreen;
