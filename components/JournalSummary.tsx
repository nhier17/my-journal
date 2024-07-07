import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useGlobalContext } from '@/context/GlobalProvider';
import { journalSummary } from "@/data/api";
import { SummaryItem } from '@/types'

const JournalSummary = () => {
  const [period, setPeriod] = useState<string>('daily');
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const { loading, setLoading } = useGlobalContext();


  const fetchSummary = async () => {
    setLoading(true);
    try {
      const data = await journalSummary(period);
    
      setSummary(data); 
    } catch (error) {
      console.error('Error fetching journal summary:', error);
      Alert.alert('Error fetching journal summary', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [period]);

  return (
    <View className="p-5">
      <Text className="text-2xl font-bold mb-2 text-white">Journal Summary</Text>
      <Picker
        selectedValue={period}
        onValueChange={(itemValue) => setPeriod(itemValue)}
        className="bg-white mb-2"
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>
      {loading ? (
        <ActivityIndicator size="large" color="#FFA001" />
      ) : (
        summary.length > 0 ? (
          summary.map((item, index) => (
            <View key={index} className="bg-white p-4 mb-2 rounded shadow">
              <Text className="font-bold mb-1">{item._id}</Text>
              <Text>{item.count} entries</Text>
            </View>
          ))
        ) : (
          <Text className="text-white">No entries found for this period</Text>
        )
      )}
    </View>
  );
};

export default JournalSummary;
