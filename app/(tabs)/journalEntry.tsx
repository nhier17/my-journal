import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const journalEntry = () => {
  return (
 <SafeAreaView className="bg-primary h-full">
  <ScrollView>
    <Text className="text-2xl text-white font-psemibold">Journal Entry</Text>
  </ScrollView>
 </SafeAreaView>
  )
}

export default journalEntry

