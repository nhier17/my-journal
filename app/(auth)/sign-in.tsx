import React, { useState } from 'react';
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import {CustomButton, FormField} from "@/components";
import { images } from "@/constants";
import axios from 'axios';
import { signIn } from "@/data/api";
import { useGlobalContext } from "@/context/GlobalProvider";
import Toast from 'react-native-toast-message';
import { FormState } from "@/types"


const SignIn: React.FC = () => {
  const { setUser } = useGlobalContext();
  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleLogin = async () => {
    if (form.email === "" || form.password === "") {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields'
      })
      return;
    }

    setIsSubmitting(true);

   try {
    const data = await signIn(form)
    setUser(data.user);
     Toast.show({
       type:'success',
       text1: 'Success',
       text2: `Hello ${data.user.name} 👋`
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
            title="Sign In"
            containerStyles="mt-7"
            handlePress={handleLogin}
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              SignUp
            </Link>
          </View>
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
}

export default SignIn;
