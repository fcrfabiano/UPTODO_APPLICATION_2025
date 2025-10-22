import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { getClassNames } from '../utils/getClassNames';
import { colors } from '../styles/colors';

export const Input: React.FC<any> = ({ value, onChangeText, placeholder, multiline = false }) => {
    const [isFocused, setIsFocused] = useState(false);

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        setIsFocused(false);
    }

    return (
        <View className="my-2">
            <TextInput
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                placeholderTextColor={isFocused ? colors.white.DEFAULT : colors.gray[300]}
                placeholderClassName="text-gray-300 focus:text-white"
                className={getClassNames('border border-transparent focus:border-gray-400 p-3 rounded-lg bg-gray-700 focus:bg-gray-500 text-white font-sans-regular text-lg',
                    multiline && 'min-h-40 align-top'
                )}
            />
        </View>
    );
}