import React, { useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { CustomButton, FormField } from "@/components";
import { createJournalEntry } from "@/data/api";
import { EntryState } from "@/types";


const CreateJournalEntry: React.FC = () => {
  const [form, setForm] = useState<EntryState>({
    title: '',
    content: '',
    category: 'Personal',
    date: new Date(),
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
//create a new journal entry
const handleCreateEntry = async () => {
  if(form.title === "" || form.content === "") {
    Alert.alert('Error', 'Please fill out all fields.')
    return
  }
  setIsSubmitting(true)
  try {
    const data = await createJournalEntry(form);

      Alert.alert('Success', 'Journal entry created successfully.')
      router.replace('/journals')
  } catch (error) {
    console.error(error)
  } finally {
    setIsSubmitting(false)
  }
}

  return (
 <SafeAreaView className="bg-primary h-full">
  <ScrollView className="px-4 my-6">
    <View
       className="w-full flex justify-center h-full px-4"
          style={{
            minHeight: "100%",
          }}>
    <Text className="text-2xl text-white font-psemibold">Create New Journal Entry</Text>
    <FormField
    title="TItle"
    value={form.title}
    handleChangeText={(e) => setForm({ ...form, title: e})}
    otherStyles="mt-7"
    />
    <FormField 
     title="Content"
     value={form.content}
     handleChangeText={(e) => setForm({ ...form, content: e})} 
     otherStyles="mt-7"
     multiline={true}
     numberOfLines={4}
    />
    <View className="mt-7">
     <Text className="text-white text-lg">Category</Text>
     <Picker
       selectedValue={form.category}
       onValueChange={(itemValue) => setForm({ ...form, category: itemValue })}
       style={{ backgroundColor: 'white', color: 'black' }}
     >
       <Picker.Item label="Personal" value="Personal" />
       <Picker.Item label="Work" value="Work" />
       <Picker.Item label="Travel" value="Travel" />
       <Picker.Item label="Other" value="Other" />
     </Picker>
    </View>
     <CustomButton
      title="Create Entry"
      isLoading={isSubmitting}
      handlePress={handleCreateEntry}
      containerStyles="w-full mt-7"
      />
      </View>
  </ScrollView>
 </SafeAreaView>
  )
}

export default CreateJournalEntry

