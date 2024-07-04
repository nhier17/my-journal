import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import axios from 'axios';

// Define the state type
interface FormState {
  name: string;
  email: string;
  password: string;
}

const base_url = "https://my-journal-api-oysu.onrender.com"

const SignUp: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${base_url}/api/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (response.status === 200) {
        Alert.alert("Success", "Registered successfully");
      } else {
        Alert.alert("Error", "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Welcome to My Journal
          </Text>
          <FormField
            title="Username"
            value={form.name}
            handleChangeText={(e: string) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            containerStyles="mt-7"
            handlePress={handleLogin}
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Signin
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUp;
