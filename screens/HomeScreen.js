import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const HomeButton = ({ text, iconName, navigation, navigateTo }) => {
    return (
        <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate(navigateTo)}>
            <Icon
                style={styles.icon}
                name={iconName}
                type="ionicon"
                color="#fff"
                size={24}
            />
            <Text style={styles.buttonText}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("./book.png")}
                />
                <Text style={styles.title}>
                    BooksTrade
                </Text>
            </View>
            <HomeButton text="Inicia Sesion" iconName="person-outline" navigation={navigation} navigateTo="LoginScreen" />
            <HomeButton text="Registrarse" iconName="person-circle-outline" navigation={navigation} navigateTo="RegistroScreen" />
            <HomeButton text="Mostrar tu perfil" iconName="person-circle-outline" navigation={navigation} navigateTo="PerfilScreen" />
            <HomeButton text="Consulta todos los Libros" iconName="book-outline" navigation={navigation} navigateTo="LibroScreen" />
            <HomeButton text="Cierra Sesión" iconName="close-circle-outline" navigation={navigation} navigateTo="LogoutButton" />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5'
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain'
    },
    title: {
        fontSize: 28,
        marginLeft: 20,
        color: '#444',
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#3b5998',
        margin: 10,
        borderRadius: 7,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
        padding: 3,
        backgroundColor: '#3b5998',
        borderRadius: 50,
    }
});

export default HomeScreen;
