import React, { useMemo, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { TaskItem } from '../components/TaskItem';
import { getClassNames } from '../utils/getClassNames';
import { Plus } from 'lucide-react-native';
import { colors } from '../styles/colors';
import { ListEmpty } from '../components/ListEmpty';

export default function TaskListScreen({ navigation }: any) {
    const { state, toggleTask } = useTasks();
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

    const tasks = useMemo(() => {
        if (filter === 'all') return state.tasks;
        if (filter === 'active') return state.tasks.filter(t => !t.completed);
        return state.tasks.filter(t => t.completed);
    }, [state.tasks, filter]);

    return (
        <View className="flex-1 bg-gray-700">
            <View className="flex-row justify-around p-3">
                <TouchableOpacity onPress={() => setFilter('all')}>
                    <Text className={getClassNames('p-2 font-sans-regular text-white text-base', filter === 'all' && 'text-support-primary font-bold')}>
                        Todas
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('active')}>
                    <Text className={getClassNames('p-2 font-sans-regular text-white text-base', filter === 'active' && 'text-support-primary font-bold')}>
                        Ativas
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('completed')}>
                    <Text className={getClassNames('p-2 font-sans-regular text-white text-base', filter === 'completed' && 'text-support-primary font-bold')}>
                        Concluídas
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                className="p-6"
                data={tasks}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={() => <View className="h-4 bg-gray-700 flex-1"/>}
                ListEmptyComponent={() => <ListEmpty/>}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onPress={() => navigation.navigate('Details', { id: item.id })}
                        onToggle={() => toggleTask(item.id)}
                    />
                )}
            />

            <TouchableOpacity className="absolute right-5 bottom-8 bg-support-primary size-16 rounded-full items-center justify-center" onPress={() => navigation.navigate('Form')}>
                <Plus size={32} color={colors.white.DEFAULT}/>
            </TouchableOpacity>
        </View>
    );
}