import React, { useState } from 'react'
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";

const SignIn = () => {
  return (
 <SafeAreaView className="bg-primary h-full">
    <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
    <Text> Sign In</Text>
        </View>
    </ScrollView>
 </SafeAreaView>
  )
}

export default SignIn

