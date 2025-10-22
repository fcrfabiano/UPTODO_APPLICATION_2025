import React from 'react';
import { View, Text, StyleSheet, Image, Alert, Touchable, TouchableOpacity } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { Button } from '../components/Button';
import { Clock, Flag, ImageIcon, Pencil, Trash2 } from 'lucide-react-native';
import { colors } from '../styles/colors';
import { formatDate } from '../utils/formatDate';

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
        <View className="flex-1 p-6 bg-gray-700">
            <Text className="font-sans-regular text-white text-3xl">{task.title}</Text>
            {
                task.description
                    ? <Text className="font-sans-regular text-white text-xl mt-2">{task.description}</Text>
                    : null
            }
            {
                task.imageUri ?
                    <View className="justify-between mt-4">

                        <View className="flex-row gap-2">
                            <ImageIcon color={colors.white.DEFAULT} />
                            <Text className="text-white/85 font-sans-regular text-base">
                                Imagem:
                            </Text>
                        </View>
                        <Image source={{ uri: task.imageUri }} className="w-full h-56 mt-3 rounded-lg" />
                    </View>
                    : null
            }
            {typeof task.latitude === 'number' && typeof task.longitude === 'number' ? (
                <Text className="font-sans-regular text-white text-base mt-2">Latitude: {task.latitude.toFixed(6)} | Longitude: {task.longitude.toFixed(6)}</Text>
            ) : null}

            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row gap-2">
                    <Clock color={colors.white.DEFAULT} />
                    <Text className="text-white/85 font-sans-regular text-base">
                        Data de criação:
                    </Text>
                </View>
                <Button style="bg-white/20" title={formatDate(task.createdAt)} onPress={() => { }} />
            </View>

            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row gap-2">
                    <Clock color={colors.white.DEFAULT} />
                    <Text className="text-white/85 font-sans-regular text-base">
                        Última modificação:
                    </Text>
                </View>
                <Button style="bg-white/20" title={task.updatedAt ? formatDate(task.updatedAt) : ''} onPress={() => { }} />
            </View>

            <View className="flex-row justify-between items-center mt-4">
                <View className="flex-row gap-2">
                    <Flag color={colors.white.DEFAULT} />
                    <Text className="text-white/85 font-sans-regular text-base">
                        Status:
                    </Text>
                </View>
                <Button style="bg-white/20" title={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'} onPress={() => toggleTask(id)} />
            </View>

            <View className="mt-3 flex-row justify-between items-center">
                <TouchableOpacity className="mt-3 flex-row gap-3" onPress={onDelete}>
                    <Trash2 color={colors.support.error} size={24} />
                    <Text className="font-sans-regular text-base text-support-error">Deletar tarefa</Text>
                </TouchableOpacity>

                <TouchableOpacity className="mt-3 flex-row gap-3" onPress={() => navigation.navigate('Form', { id })}>
                    <Pencil color={colors.support.primary} size={24} />
                    <Text className="font-sans-regular text-base text-support-primary">Editar tarefa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}