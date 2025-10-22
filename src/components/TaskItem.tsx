import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Task } from '../types';
import { getClassNames } from '../utils/getClassNames';


export const TaskItem: React.FC<{ task: Task; onPress: () => void; onToggle: () => void }> = ({ task, onPress, onToggle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row p-3 items-center bg-gray-500"
        >
            <TouchableOpacity
                onPress={onToggle}
                className={getClassNames('size-6 rounded-full border-[1.5px] border-white items-center justify-center', task.completed && 'bg-color-support-primary border-support-primary')}
            >
                {task.completed && <View className="bg-support-primary size-4 rounded-full"></View>}
            </TouchableOpacity>
            <View className="ml-3 flex-1">
                <Text
                    className={getClassNames('text-base font-sans-regular text-white tracking-[-0.32px]', task.completed && 'line-through text-support-primary')}
                >{task.title}</Text>
                {task.imageUri ? <Image source={{ uri: task.imageUri }} className="mt-2 w-20 h-16 rounded-md" /> : null}
            </View>
        </TouchableOpacity>
    );
};