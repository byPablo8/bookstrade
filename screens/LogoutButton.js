import React, { useContext } from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
    const { setToken } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogout = () => {
        // Elimina el token del estado
        setToken(null);
        Alert.alert('Has cerrado sesión con éxito');
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <Button title="Cerrar sesión" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogoutButton;
