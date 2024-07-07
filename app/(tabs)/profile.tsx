import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { logout } from "@/data/api";
import { useGlobalContext } from "@/context/GlobalProvider";
import { EmptyState, InfoBox, JournalCard } from "@/components";
import { icons } from "@/constants";

const Profile:React.FC = () => {
  const { user, setUser, setIsLogged,entries } = useGlobalContext();

  const signOut = async () => {
    await logout();
    setUser(null);
    setIsLogged(false);
    router.replace("/sign-in");
  }

  const renderItem = ({ item }) => (
    <JournalCard
    title={item.title}
    content={item.content}
    date={item.date}
    creator={item.user.name}
    />
   );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
          <TouchableOpacity
            onPress={signOut}
            className="flex w-full items-end mb-10"
          >
            <Image
              source={icons.logout}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>

          <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
            <Image
              source={icons.logout}
              className="w-[90%] h-[90%] rounded-lg"
              resizeMode="cover"
            />
          </View>

          <InfoBox
            title={user?.name}
            containerStyles="mt-5"
            titleStyles="text-lg"
          />

          <View className="mt-5 flex flex-row">
            <InfoBox
              title={entries.length || 0}
              subtitle="Journals"
              titleStyles="text-xl"
              containerStyles="mr-10"
            />
            <InfoBox
              title="1.2k"
              subtitle="Followers"
              titleStyles="text-xl"
            />
          </View>
        </View> 
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Entries Found"
            subtitle="No journal entries found for this profile"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile

