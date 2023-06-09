import React, { useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { AuthContext } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
    const { setToken } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogout = () => {
        setToken(null);
        Alert.alert('Has cerrado sesión con éxito');
        navigation.navigate('HomeScreen');
    };

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={handleLogout}>
                Cerrar sesión
            </Button>
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
});

export default LogoutButton;
