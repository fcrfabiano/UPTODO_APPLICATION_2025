import React from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { Button } from '../components/Button';

export default function TaskDetailsScreen({ route, navigation }: any) {
    const { id } = route.params;
    const { state, deleteTask, toggleTask } = useTasks();
    const task = state.tasks.find(t => t.id === id);
    if (!task) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Tarefa não encontrada</Text></View>;


    const onDelete = () => {
        Alert.alert('Confirmar', 'Deseja excluir?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: async () => { await deleteTask(id); navigation.goBack(); } }
        ]);
    };

    return (
        <View className="flex-1 p-4 bg-gray-700">
            <Text className="font-sans-regular text-white text-3xl">{task.title}</Text>
            {task.description ? <Text className="font-sans-regular text-white text-xl mt-2">{task.description}</Text> : null}
            {task.imageUri ? <Image source={{ uri: task.imageUri }} className="w-full h-56 mt-3 rounded-lg" /> : null}
            {typeof task.latitude === 'number' && typeof task.longitude === 'number' ? (
                <Text className="font-sans-regular text-white text-base mt-2">Latitude: {task.latitude.toFixed(6)} | Longitude: {task.longitude.toFixed(6)}</Text>
            ) : null}

            <View className="mt-4">
                <Button title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'} onPress={() => toggleTask(id)} />
            </View>

            <View className="mt-3">
                <Button title="Editar" onPress={() => navigation.navigate('Form', { id })} />
            </View>

            <View className="mt-3">
                <Button title="Excluir" onPress={onDelete} />
            </View>
        </View>
    );
}