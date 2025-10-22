// -- IMPORTS

import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { Task } from '../types';
import { getRandomUuid } from '../utils/gist';
import { loadTasks, saveTasks } from '../services/storage';

// -- TYPES

type State =
    {
        tasks: Task[];
        loading: boolean;
    };

type Action = { type: 'SET_TASKS'; payload: Task[] }
    | { type: 'ADD_TASK'; payload: Task }
    | { type: 'UPDATE_TASK'; payload: Task }
    | { type: 'DELETE_TASK'; payload: string }
    | { type: 'TOGGLE_TASK'; payload: string }
    | { type: 'SET_LOADING'; payload: boolean };

interface TaskContextType {
    state: State;
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateTask: (task: Task) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    toggleTask: (taskId: string) => Promise<void>;
};

interface TaskProviderProps {
    children: React.ReactNode;
};

// -- CONSTANTS

const initialState: State = { tasks: [], loading: true };

export const TaskContext = createContext<TaskContextType | null>(null);

// -- FUNCTIONS

function reducer(
    state: State,
    action: Action
): State {
    switch (action.type) {
        case 'SET_TASKS':
            return (
                {
                    ...state,
                    tasks: action.payload,
                    loading: false
                }
            );
        case 'ADD_TASK':
            return (
                {
                    ...state,
                    tasks: [action.payload, ...state.tasks]
                }
            );
        case 'UPDATE_TASK':
            const updatedTasks = [];

            for (let task of state.tasks) {
                if (task.id === action.payload.id) {
                    task = action.payload;
                }

                updatedTasks.push(task);
            }

            return (
                {
                    ...state,
                    tasks: updatedTasks
                }
            );
        case 'DELETE_TASK':
            return (
                {
                    ...state,
                    tasks: state.tasks.filter((task) => task.id !== action.payload)
                }
            );
        case 'TOGGLE_TASK':
            const tasks = [];

            for (const task of state.tasks) {
                if (task.id === action.payload) {
                    tasks.push({ ...task, completed: !task.completed, updatedAt: new Date().toISOString() });
                }
                else {
                    tasks.push(task);
                }
            }

            return (
                {
                    ...state,
                    tasks
                }
            );
        case 'SET_LOADING':
            return (
                {
                    ...state,
                    loading: action.payload
                }
            );
        default:
            return state;
    }
}

// ~~

export function TaskProvider(
    {
        children
    }: TaskProviderProps
) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        (async () => {
            const tasks = await loadTasks();
            dispatch({ type: 'SET_TASKS', payload: tasks });
        })();
    }, []);

    useEffect(
        () => {
            if (!state.loading) {
                saveTasks(state.tasks).catch((e) => console.error(e));
            }
        },
        [state.tasks, state.loading]
    );

    const addTask = useCallback(
        async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
            const newTask =
            {
                ...task,
                id: getRandomUuid(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            dispatch({ type: 'ADD_TASK', payload: newTask });
        },
        []
    );

    const updateTask = useCallback(
        async (task: Task) => {
            const updatedTask =
            {
                ...task,
                updatedAt: new Date().toISOString()
            };

            dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
        },
        []
    );

    const deleteTask = useCallback(
        async (taskId: string) => {
            dispatch({ type: 'DELETE_TASK', payload: taskId });
        },
        []
    );


    const toggleTask = useCallback(
        async (taskId: string) => {
            dispatch({ type: 'TOGGLE_TASK', payload: taskId });
        },
        []
    );

    const providerValue = useMemo(
        () => {
            return (
                {
                    state,
                    addTask,
                    updateTask,
                    deleteTask,
                    toggleTask
                }
            );
        },
        [state, addTask, updateTask, deleteTask, toggleTask]
    );

    return (
        <TaskContext.Provider value={providerValue}>
            {children}
        </TaskContext.Provider>
    );
}

