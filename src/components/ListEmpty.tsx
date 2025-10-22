import React from 'react';
import { View, Text } from 'react-native';
import { getClassNames } from '../utils/getClassNames';
import { EmptyListIcon } from './EmptyListIcon';


export const ListEmpty: React.FC = () => {
    return (
        <View
            className="flex-1 justify-center items-center gap-3 min-h-[80vh]"
        >
            <EmptyListIcon />

            <Text className="text-white font-sans-regular text-xl">O que você quer fazer hoje?</Text>
            <Text className="text-white font-sans-regular text-base">Clique em "+" para adicionar suas tarefas</Text>
        </View>
    );
};