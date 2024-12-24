import { Stack, useRouter, useSegments } from 'expo-router';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ShowProvider } from '@/context/ShowContext';
import { useEffect } from 'react';

function RootLayoutNav() {
  const { username } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!username && !inAuthGroup) {
      router.replace('/(auth)/login');
    } else if (username && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [username, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ShowProvider>
        <RootLayoutNav />
      </ShowProvider>
    </AuthProvider>
  );
}