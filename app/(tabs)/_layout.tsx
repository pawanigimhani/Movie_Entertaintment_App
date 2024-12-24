import { Tabs } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { View, Text, Image, StyleSheet } from 'react-native'; 

export default function TabLayout() {
  const { username } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: { display: 'none' },
        tabBarActiveTintColor: '#a941b5',
        tabBarInactiveTintColor: '#888',
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        headerStyle: { backgroundColor: '#210221' },
        headerTintColor: '#f9b1fc',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
               <Image 
                source={require('@/assets/logo.png')} 
                style={styles.logo} 
              />
              <Text style={styles.welcomeText}>{`Welcome, ${username}`}</Text>
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  logo: {
    width: 150, 
    height: 40,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f9b1fc',
  },
});
