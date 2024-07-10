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
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { CustomButton, FormField } from "@/components";
import { createJournalEntry } from "@/data/api";
import { EntryState } from "@/types";


const CreateJournalEntry: React.FC = () => {
  const initialFormState: EntryState = {
    title: '',
    content: '',
    category: 'Personal',
    date: new Date(),
  };

  const [form, setForm] = useState<EntryState>(initialFormState);
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
      if(data) {
      Alert.alert('Success', 'Journal entry created successfully.');
      setForm(initialFormState);
      router.replace('/journals');
      }
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
    <Text className="text-white text-lg">Category</Text>
    <View className="mt-2 bg-gray-700 p-2">
     <RNPickerSelect
          onValueChange={(value) => setForm({ ...form, category: value })}
          items={[
            { label: 'Personal', value: 'Personal' },
            { label: 'Work', value: 'Work' },
            { label: 'Travel', value: 'Travel' },
            { label: 'Other', value: 'Other' },
          ]}
          style={{
            inputIOS: { color: 'white' },
            inputAndroid: { color: 'white'},
            placeholder: { color: 'gray' }
          }}
          value={form.category}
          placeholder={{ label: 'Select category', value: null, color: 'gray' }}
        />
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

