import { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function RegisterScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        if (!username || !email || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (!email.includes('@')) {
            setError('Please enter a valid email');
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        router.push('/login');
    };

    return (
        <ImageBackground
            source={require('@/assets/background.jpg')} 
            style={styles.background}
            resizeMode="cover" 
        >
            <View style={styles.overlay} />
            <View style={styles.container}>
                <ThemedText type="title" style={styles.title}>Create Account</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#888"
                    value={username}
                    onChangeText={setUsername}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <ThemedText style={styles.buttonText}>Register</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <ThemedText style={styles.link}>Already have an account? Login</ThemedText>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#f9b1fc', 
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color: 'white', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    button: {
        backgroundColor: '#a941b5',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    link: {
        color: '#f9b1fc',
        textAlign: 'center',
        marginTop: 15,
    },
});