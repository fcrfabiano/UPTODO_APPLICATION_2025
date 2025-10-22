import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Task } from '../types';
import { getClassNames } from '../utils/getClassNames';


export const TaskItem: React.FC<{ task: Task; onPress: () => void; onToggle: () => void }> = ({ task, onPress, onToggle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className="flex-row p-3 items-center border-b border-[#eee]"
        >
            <TouchableOpacity
                onPress={onToggle}
                className={getClassNames('size-7 rounded-md border border-[#666] items-center justify-center', task.completed && 'bg-color-[#0066cc] border-[#0066cc]')}
            >
                {task.completed && <Text className="text-white">✓</Text>}
            </TouchableOpacity>
            <View className="ml-3 flex-1">
                <Text
                    className={getClassNames('text-base font-semibold', task.completed && 'line-through text-[#999]')}
                >{task.title}</Text>
                {task.imageUri ? <Image source={{ uri: task.imageUri }} className="mt-2 w-20 h-16 rounded-md" /> : null}
            </View>
        </TouchableOpacity>
    );
};