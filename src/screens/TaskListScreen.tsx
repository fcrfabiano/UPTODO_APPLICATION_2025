import React, { useMemo, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { TaskItem } from '../components/TaskItem';
import { getClassNames } from '../utils/getClassNames';


export default function TaskListScreen({ navigation }: any) {
    const { state, toggleTask } = useTasks();
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');


    const tasks = useMemo(() => {
        if (filter === 'all') return state.tasks;
        if (filter === 'active') return state.tasks.filter(t => !t.completed);
        return state.tasks.filter(t => t.completed);
    }, [state.tasks, filter]);


    return (
        <View className="flex-1">
            <View className="flex-row justify-around p-3">
                <TouchableOpacity onPress={() => setFilter('all')}>
                    <Text className={getClassNames('p-2', filter === 'all' && 'text-[#0066cc] font-bold')}>
                        Todas
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('active')}>
                    <Text className={getClassNames('p-2', filter === 'active' && 'text-[#0066cc] font-bold')}>
                        Ativas
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilter('completed')}>
                    <Text className={getClassNames('p-2', filter === 'completed' && 'text-[#0066cc] font-bold')}>
                        Concluídas
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TaskItem task={item} onPress={() => navigation.navigate('Details', { id: item.id })} onToggle={() => toggleTask(item.id)} />
                )}
            />

            <TouchableOpacity className="absolute right-5 bottom-8 bg-[#0066cc] size-16 rounded-full items-center justify-center" onPress={() => navigation.navigate('Form')}>
                <Text className="text-white text-3xl">+</Text>
            </TouchableOpacity>
        </View>
    );
}