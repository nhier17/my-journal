import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useGlobalContext } from '@/context/GlobalProvider';
import { journalSummary } from "@/data/api";
import { SummaryItem } from '@/types'
import useDebounce from '@/hooks/useDebounce';

const JournalSummary: React.FC = () => {
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const { isLogged } = useGlobalContext();
  const [period, setPeriod] = useState<string>('daily');
  const [isFetching, setSFetching] = useState(false);

  const debouncedPeriod = useDebounce(period, 500);

  const fetchSummary = async (currentPeriod: string) => {
    if(!isLogged) return;
    setSFetching(true);
    try {
      const data = await journalSummary(currentPeriod);
    
      setSummary(data); 
    } catch (error) {
      console.error('Error fetching journal summary:', error);
    } finally {
      setSFetching(false);
    }
  };

  useEffect(() => {
    if(isLogged) {
    fetchSummary(debouncedPeriod);
    }
  }, [debouncedPeriod, isLogged]);


  return (
    <View className="p-4 px-4">
      <Text className="text-lg font-pregular text-gray-100 mb-3">Journal Summary</Text>
      <View className="bg-gray-700 rounded mb-2 p-2">
      <RNPickerSelect
          onValueChange={(value) => setPeriod(value)}
          items={[
            { label: 'Daily', value: 'daily' },
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
          ]}
          style={{
            inputIOS: { color: 'white' },
            inputAndroid: { color: 'white' },
            placeholder: { color: 'gray' }
          }}
          value={period}
          placeholder={{ label: 'Select period', value: null, color: 'gray' }}
        />
        </View>
      {isFetching ? (
        <ActivityIndicator size="large" color="#FFA001" />
      ) : (
        summary.length > 0 ? (
          summary.map((item, index) => (
            <View key={index} className="bg-white p-5 mb-2 rounded shadow mt-2">
              <Text className="font-bold mb-1 text-gray-400">{item._id}</Text>
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
