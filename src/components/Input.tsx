import React from 'react';
import { TextInput, View } from 'react-native';
import { getClassNames } from '../utils/getClassNames';


export const Input: React.FC<any> = ({ value, onChangeText, placeholder, multiline = false }) => (
    <View className="my-2">
        <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            multiline={multiline}
            className={getClassNames('border border-[#ddd] p-3 rounded-lg bg-white',
                multiline && 'min-h-20'
            )}
        />
    </View>
);