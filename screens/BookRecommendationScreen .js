import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import axios from 'axios';

const BookRecommendationScreen = () => {
    const [data, setData] = useState([]);
    const apikey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const [textInput, setTextInput] = useState('');

    const handleSend = async () => {
        try {
            const response = await axios.post(apiUrl, {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful assistant.'
                    },
                    {
                        role: 'user',
                        content: textInput
                    }
                ]
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apikey}`
                }
            });
            const text = response.data.choices[0].message.content;
            setData(prevData => [...prevData, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }]);
            setTextInput('');
        } catch (error) {
            if (error.response && error.response.status === 429) {
                console.error('Too many requests. Please try again later.');
            } else {
                console.error('Error with book recommendation:', error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Consulta recomendaciones de libros</Text>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                style={styles.chatBody}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'column', padding: 10 }}>
                        <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? 'green' : 'red' }}>{item.type === 'user' ? 'User' : 'Bot'}</Text>
                        <Text style={styles.messageText}>{item.text}</Text>
                        {/* Vista Espaciador al final */}
                        <View style={{ height: 30 }}></View>
                    </View>
                )}
            />
            <TextInput
                style={styles.inputField}
                value={textInput}
                onChangeText={text => setTextInput(text)}
                placeholder='Pregunta una recomendacion de libro'
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                <Text style={styles.buttonText}>Vamos</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#E8E8E8'
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20
    },
    chatBody: {
        backgroundColor: '#FFF',
        width: '100%',
        flex: 1,
        marginBottom: 20,
        padding: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DDD',
    },
    messageText: {
        marginLeft: 10,
        fontSize: 16,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#999',
        width: '100%',
        height: 50,
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#FFF',
    },
    sendButton: {
        backgroundColor: '#4A90E2',
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 15
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default BookRecommendationScreen;
