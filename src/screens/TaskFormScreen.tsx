import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView, Image, Text } from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { useTasks } from '../hooks/useTasks';
import { pickImageFromGallery, takePhoto } from '../hooks/useImagePicker';
import { getCurrentLocation } from '../hooks/useLocation';

export default function TaskFormScreen({ navigation, route }: any) {
    const { state, addTask, updateTask } = useTasks();
    const editingId = route.params?.id as string | undefined;
    const editing = state.tasks.find(t => t.id === editingId);

    const [title, setTitle] = useState(editing?.title ?? '');
    const [description, setDescription] = useState(editing?.description ?? '');
    const [imageUri, setImageUri] = useState<string | undefined>(editing?.imageUri);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(editing?.latitude ? { latitude: editing.latitude!, longitude: editing.longitude! } : null);

    useEffect(() => {
        navigation.setOptions({ title: editing ? 'Editar Tarefa' : 'Criar Tarefa' });
    }, []);

    const onSave = async () => {
        if (!title.trim()) return Alert.alert('Título é obrigatório');

        const payload = {
            title: title.trim(),
            description: description.trim(),
            completed: editing?.completed ?? false,
            imageUri,
            latitude: location?.latitude,
            longitude: location?.longitude,
        } as any;

        try {
            if (editing) {
                await updateTask({ ...editing, ...payload });
            } else {
                await addTask(payload);
            }
            navigation.goBack();
        } catch (e) {
            console.log(e)
            Alert.alert('Erro ao salvar');
        }
    };

    const onPick = async () => {
        try {
            const uri = await pickImageFromGallery();
            if (uri) setImageUri(uri);
        } catch (e) {
            Alert.alert('Permissão negada ou erro ao acessar galeria');
        }
    };

    const onTake = async () => {
        try {
            const uri = await takePhoto();
            if (uri) setImageUri(uri);
        } catch (e) {

            console.log(e)
            Alert.alert('Permissão negada ou erro ao abrir câmera');
        }
    };

    const onGetLocation = async () => {
        try {
            const loc = await getCurrentLocation();
            setLocation(loc as any);
        } catch (e) {
            Alert.alert('Permissão de localização negada ou falha');
        }
    };

    return (
        <ScrollView className="p-4 bg-gray-700">
            <Input value={title} onChangeText={setTitle} placeholder="Título (obrigatório)" />
            <Input value={description} onChangeText={setDescription} placeholder="Descrição (opcional)" multiline />

            <View className="my-3">
                <Button title="Escolher da galeria" onPress={onPick} />
            </View>
            <View className="my-3">
                <Button title="Tirar foto" onPress={onTake} />
            </View>

            {imageUri && imageUri.startsWith('file') ? (
                <Image source={{ uri: imageUri }} className="w-full h-56 rounded-lg" />
            ) : null}

            <View className="my-3">
                <Button title="Capturar localização" onPress={onGetLocation} />
                {location ? <Text className="font-sans-regular text-white text-base my-2">Latitude: {location.latitude.toFixed(6)} | Longitude: {location.longitude.toFixed(6)}</Text> : null}
            </View>

            <View className="my-4">
                <Button title="Salvar" onPress={onSave} />
            </View>
        </ScrollView>
    );
}