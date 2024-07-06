import React from 'react';
import { View, ActivityIndicator } from "react-native";

const SkeletonLoader = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#FFA001" />
      <View className="w-full h-6 bg-gray-200 mt-4 rounded"></View>
      <View className="w-3/4 h-6 bg-gray-200 mt-4 rounded"></View>
      <View className="w-2/4 h-6 bg-gray-200 mt-4 rounded"></View>
    </View>
  );
};

export default SkeletonLoader;
