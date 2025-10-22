import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types';

const TASKS_KEY = '@tasks_v1';

export const saveTasks = async (tasks: Task[]) => {
    try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
        console.error('saveTasks error', e);
        throw e;
    }
};

export const loadTasks = async (): Promise<Task[]> => {
    try {
        const raw = await AsyncStorage.getItem(TASKS_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Task[];
    } catch (e) {
        console.error('loadTasks error', e);
        return [];
    }
};
