import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { getClassNames } from '../utils/getClassNames';


export const Button: React.FC<{ title: string; onPress: () => void; style?: any }> = ({ title, onPress, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={ getClassNames('p-3 bg-support-primary rounded-lg items-center', style ) }
        >
            <Text className="text-white font-sans-regular text-base">{title}</Text>
        </TouchableOpacity>
    );
};