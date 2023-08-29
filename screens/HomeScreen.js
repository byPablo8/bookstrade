import React, { useState, useContext } from 'react';
import { SafeAreaView, Image, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Title, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { AuthContext } from './AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 50,
  },
  button: {
    width: '100%',
    maxWidth: 500,
    marginBottom: 10,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    width: 320,
    height: 320,
    resizeMode: 'contain'
  }
});

const slides = [
  {
    key: 'slide1',
    title: 'Bienvenido a BooksTrade',
    text: 'Dive into the world of endless stories and adventures.',
    image: require('./book.png'),
    imageStyle: styles.image,
    backgroundColor: '#6C63FF',
  },
  {
    key: 'slide2',
    title: 'Encuentra Tesoros',
    text: 'Explora una vasta colección de libros que otros usuarios han compartido.',
    image: require('./explore2.png'),
    imageStyle: styles.image,
    backgroundColor: '#FFC947',
  },
  {
    key: 'slide3',
    title: 'Deja tu Huella',
    text: 'Comparte tus propios tesoros literarios con la comunidad.',
    image: require('./share2.png'),
    imageStyle: styles.image,
    backgroundColor: '#34D399',
  },
  {
    key: 'slide4',
    title: 'Conversa con Nuestra IA',
    text: '¿Necesitas recomendaciones o tienes dudas? Nuestra IA está aquí para ayudarte.',
    image: require('./ai2.png'),
    imageStyle: styles.image,
    backgroundColor: '#3B82F6',
  }
];

const UserButton = ({ text, iconName, navigateTo }) => {
  const { token } = useContext(AuthContext);
  if (!token) return null;  // No renderizar el botón si no hay usuario

  return <HomeButton text={text} iconName={iconName} navigateTo={navigateTo} />;
}

const GuestButton = ({ text, iconName, navigateTo }) => {
  const { token } = useContext(AuthContext);
  if (token) return null;  // No renderizar el botón si hay un usuario

  return <HomeButton text={text} iconName={iconName} navigateTo={navigateTo} />;
}

const HomeButton = ({ text, iconName, navigateTo }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();  // Usar los colores del tema actual

  return (
    <Button
      icon={iconName}
      mode="outlined"
      style={styles.button}
      color={colors.primary}
      onPress={() => navigation.navigate(navigateTo)}
    >
      {text}
    </Button>
  );
}

const HomeScreen = () => {
  const { colors } = useTheme();
  const { token } = useContext(AuthContext);
  const [showTutorial, setShowTutorial] = useState(!token);

  const renderSlide = ({ item }) => {
    return (
      <View style={[styles.slide, { backgroundColor: item.backgroundColor }]}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>
        {item.image && <Image source={item.image} style={item.imageStyle} />}
      </View>
    );
  };

  const onDone = () => {
    setShowTutorial(false);
  };

  if (showTutorial) {
    return (
      <AppIntroSlider
        renderItem={renderSlide}
        data={slides}
        onDone={onDone}
      />
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          style={styles.logo}
          source={require("./book.png")}
        />
        <Title style={[styles.title, { color: colors.onBackground }]}>BooksTrade</Title>
        <GuestButton text="Inicia Sesion" iconName="login" navigateTo="L  oginScreen" />
        <GuestButton text="Registrarse" iconName="account-plus" navigateTo="RegistroScreen" />
        <UserButton text="Mostrar tu perfil" iconName="account" navigateTo="PerfilScreen" />
        <HomeButton text="Consulta todos los Libros" iconName="book" navigateTo="LibroScreen" />
        <HomeButton text="Recomendaciones" iconName="book-open" navigateTo="BookRecommendationScreen" />
        <UserButton text="Cierra Sesión" iconName="logout" navigateTo="LogoutButton" />
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen;
