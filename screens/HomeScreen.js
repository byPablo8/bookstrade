import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

const HomeButton = ({ text, iconName, navigation, navigateTo }) => {
    return (
        <TouchableOpacity style={tw`flex-row items-center p-5 bg-gray-100 m-2 rounded-lg`}
            onPress={() => navigation.navigate(navigateTo)}>
            <Icon
                style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                name={iconName}
                type="ionicon"
                size={18}
            />
            <Text>
                {text}
            </Text>
        </TouchableOpacity>
    );
}

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={tw`p-5`}>
                <Image
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: 'contain'
                    }}
                    source={require("./book.png")}
                />
                <HomeButton text="Inicia Sesion" iconName="person-outline" navigation={navigation} navigateTo="LoginScreen" />
                <HomeButton text="Registrarse" iconName="person-circle-outline" navigation={navigation} navigateTo="RegistroScreen" />
                <HomeButton text="Consulta todos los Libros" iconName="book-outline" navigation={navigation} navigateTo="LibroScreen" />
                <HomeButton text="Mostrar tu perfil" iconName="person-circle-outline" navigation={navigation} navigateTo="PerfilScreen" />
                <HomeButton text="Cierra Sesión" iconName="close-circle-outline" navigation={navigation} navigateTo="LogoutButton" />
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({});
