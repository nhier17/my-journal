import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import {CustomButton, FormField} from "@/components";
import { images } from "@/constants";
import axios from 'axios';
import { signUp } from "@/data/api";
import { useGlobalContext } from "@/context/GlobalProvider";
import Toast from 'react-native-toast-message';
import { FormState } from "@/types"



const SignUp = () => {
  const { setUser } = useGlobalContext();
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async () => {
    if (form.name === "" || form.email === "" || form.password === "") {
      Toast.show({
        text1: "All fields are required",
        type: "error",
      })
      return;
    }

    setIsSubmitting(true);

    try {
        const data = await signUp(form);
        setUser(data.user);
      Toast.show({
        text1: "Registration successful",
        type: "success",
      })
        router.replace("/journals")
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
              <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />
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
      <Toast />
    </SafeAreaView>
  );
}

export default SignUp;
