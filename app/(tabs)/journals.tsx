import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { journalEntries } from "@/data/api";
import { images } from "@/constants";
import { EmptyState, JournalCard, SkeletonLoader } from "@/components";

const Journals = () => {
  const [entries, setEntries] = useState([]);
  const { loading, setLoading } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  
  console.log(entries);

  const fetchEntries = async () => {
    setLoading(true);
    try {
      const data = await journalEntries();
      setEntries(data);
    } catch (error) {
      console.log('Failed to fetch journal entries', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
  };

  const renderItem = ({ item }) => (
   <JournalCard
   title={item.title}
   content={item.content}
   date={item.date}
   creator={item.user.name}
   />
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <SkeletonLoader />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={entries}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-x-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  My Journal
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logo}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Journal Summary
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Entries Found"
            subtitle="No journal entries created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Journals;
