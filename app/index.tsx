import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import CustomButton from "../components/CustomButton";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-primary h-full">

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <View className="relative mt-5">
          <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">My Journal</Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Capture Your Thoughts, Track Your Progress, and Reflect on Your Journey
            with Our Easy-to-Use Journaling Platform.
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  )
}

export default HomeScreen



