import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated } from 'react-native';
import { Task } from '../types';
import { getClassNames } from '../utils/getClassNames';
import { formatDate } from '../utils/formatDate';
import { Eye, Trash2 } from 'lucide-react-native';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import { colors } from '../styles/colors';


type TaskItemProps = {
    task: Task;
    onToggle: () => void;
    onEdit: () => void;
    onDelete: () => void;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onToggle, onDelete }) => {
    const renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        dragX: Animated.AnimatedInterpolation<number>
    ) => {
        return (
            <View className="flex-row">
                <RectButton
                    onPress={onEdit}
                    style={styles.gestureButton}
                >
                    <Eye color={colors.support.primary} size={20} />
                </RectButton>
                <RectButton
                    onPress={onDelete}
                    style={styles.gestureButton}
                >
                    <Trash2 color={colors.support.error} size={20} />
                </RectButton>
            </View>
        );
    };

    return (
        <Swipeable
            overshootRight={false}
            renderRightActions={renderRightActions}
        >
            <TouchableOpacity
                onPress={onToggle}
                className="flex-row p-3 items-center bg-gray-500 rounded-[4px]"
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
                    >
                        {task.title}
                    </Text>
                    <Text
                        className={getClassNames('mt-2 text-sm font-sans-regular text-gray-300 tracking-[-0.32px]', task.completed && 'line-through text-support-primary')}
                    >
                        {formatDate(task.createdAt)}
                    </Text>
                    {task.imageUri ? <Image source={{ uri: task.imageUri }} className="mt-2 w-20 h-16 rounded-md" /> : null}
                </View>
            </TouchableOpacity>
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    gestureButton: { alignItems: 'center', justifyContent: 'center', width: 60 }
});