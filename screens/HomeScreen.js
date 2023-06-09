import React from 'react';
import {Text, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title, Avatar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeButton = ({ text, iconName, navigateTo }) => {
    const navigation = useNavigation();

    return (
        <Card style={styles.card}>
            <Card.Title
                title={text}
                left={(props) => <Avatar.Icon {...props} icon={iconName} />}
            />
            <Card.Actions>
                <Button icon={iconName} mode="contained" onPress={() => navigation.navigate(navigateTo)}>
                    {text}
                </Button>
            </Card.Actions>
        </Card>
    );
}

const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Image
                    style={styles.logo}
                    source={require("./book.png")}
                />
                <Title style={styles.title}>BooksTrade</Title>
                <HomeButton text="Inicia Sesion" iconName="login" navigateTo="LoginScreen" />
                <HomeButton text="Registrarse" iconName="account-plus" navigateTo="RegistroScreen" />
                <HomeButton text="Mostrar tu perfil" iconName="account" navigateTo="PerfilScreen" />
                <HomeButton text="Consulta todos los Libros" iconName="book" navigateTo="LibroScreen" />
                <HomeButton text="Cierra Sesión" iconName="logout" navigateTo="LogoutButton" />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
        alignSelf: 'center',
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
});

export default HomeScreen;
