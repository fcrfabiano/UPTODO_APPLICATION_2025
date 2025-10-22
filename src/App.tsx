import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Lato_400Regular, Lato_700Bold, useFonts } from '@expo-google-fonts/lato';
import { useEffect } from 'react';

import './styles/global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from './screens/TaskListScreen';
import TaskFormScreen from './screens/TaskFormScreen';
import TaskDetailsScreen from './screens/TaskDetailsScreen';
import { TaskProvider } from './context/TaskContext';

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [loaded, error] = useFonts({
        Lato_400Regular,
        Lato_700Bold
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <TaskProvider>
            <StatusBar style="dark" />
            <View className="flex-1 bg-black-700">
                <SafeAreaProvider>
                    <NavigationContainer>
                        <Stack.Navigator>
                            <Stack.Screen name="List" component={TaskListScreen} options={{ title: 'Tarefas' }} />
                            <Stack.Screen name="Form" component={TaskFormScreen} options={{ title: 'Criar / Editar' }} />
                            <Stack.Screen name="Details" component={TaskDetailsScreen} options={{ title: 'Detalhes' }} />
                        </Stack.Navigator>
                    </NavigationContainer>
                </SafeAreaProvider>
            </View>
        </TaskProvider>
    );
}
