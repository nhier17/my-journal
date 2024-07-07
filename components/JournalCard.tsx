import React from 'react';
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const JournalCard = ({ title, content, date, creator, onDelete }) => {
  return (
    <View className="flex flex-col items-center px-4 mb-14 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text className="font-psemibold text-sm" numberOfLines={1}>
              {title}
            </Text>
            <Text className="text-sm text-gray-600" numberOfLines={3}>
              {content}
            </Text>
            <Text className="text-xs text-gray-400 mt-2">{new Date(date).toLocaleString()}</Text>
            <Text className="text-xs text-gray-400 font-pregular" numberOfLines={1}>
              {creator}
            </Text>
         <Pressable onPress={onDelete} style={{ position: 'absolute', bottom: 0, right: 20 }}>
        <MaterialCommunityIcons name="delete" size={24} color="red" />
      </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

export default JournalCard;
