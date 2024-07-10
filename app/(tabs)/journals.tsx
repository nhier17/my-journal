import React, { useState, useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";
import { journalEntries, deleteEntry } from "@/data/api";
import { images } from "@/constants";
import { EmptyState, JournalCard, SkeletonLoader, JournalSummary } from "@/components";


const Journals: React.FC = () => {
  const { loading, setLoading, entries, setEntries, user, isLogged } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  

  const fetchEntries = async () => {
    if(!isLogged) return;
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
    if(isLogged) {
    fetchEntries();
    }
  }, [isLogged]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEntries();
    setRefreshing(false);
  };

  //delete entry
  const handleDeleteEntry = async (id) => {
    try {
      await deleteEntry(id);
      const updatedEntries = entries.filter(entry => entry._id!== id);
      setEntries(updatedEntries);
    } catch (error) {
      console.log('Failed to delete entry', error);
    }
  }

  const renderItem = ({ item }) => (
   <JournalCard
   title={item.title}
   content={item.content}
   date={item.date}
   creator={item.user.name}
   onDelete={() => handleDeleteEntry(item._id)}
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
          <View className="my-2">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                {user?.name}
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
                <JournalSummary />
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
