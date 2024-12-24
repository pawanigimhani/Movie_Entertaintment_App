import { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();

    const handleLogin = () => {
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }
        if (password.length < 6) {
            setError('Invalid Password');
            return;
        }
        signIn(username);
        router.replace('/(tabs)');
    };


    return (
        <ImageBackground
            source={require('@/assets/background.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <View style={styles.container}>
            <Image 
                    source={require('@/assets/logo.png')} 
                    style={styles.logo} 
                />
                <ThemedText type="title" style={styles.title}>Welcome Back!</ThemedText>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#888"
                    value={username}
                    onChangeText={setUsername}
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
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <ThemedText style={styles.buttonText}>Login</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/register')}>
                    <ThemedText style={styles.link}>Don't have an account? Register</ThemedText>
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
        justifyContent: 'flex-start', 
        alignItems: 'center',
        marginTop: 50,
    },
    logo: {
        width: 325, 
        height: 50,
        marginBottom: 110, 
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
        width: '100%',
    },
    button: {
        backgroundColor: '#a941b5',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width: '100%'
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