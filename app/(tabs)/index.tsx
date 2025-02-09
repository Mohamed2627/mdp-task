import ThemedDatePicker from '@/components/Form/ThemedDatePicker';
import ThemedSelectDropdown from '@/components/Form/ThemedSelectDropdown';
import ParallaxFlatListView from '@/components/ui/ParallaxFlatListView';
import { ThemedText } from '@/components/ui/ThemedText';
import { ThemedView } from '@/components/ui/ThemedView';
import TransactionCard from '@/components/Transaction/TransactionCard';
import { Colors } from '@/constants/Colors';
import { sortOptions, transactionTypes } from '@/constants/data';
import { TRANSACTION_KEYS } from '@/enums/transaction';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useListTransaction } from '@/hooks/useListTransaction';
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';

export default function HomeScreen() {

  // Hooks----------------------------
  const [type, setType] = useState<number | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const [sortType, setSortType] = useState<number | null>(null);

  const { hp } = useResponsiveScreen()

  const { transactionList, loadingList, sortTransactions } = useListTransaction(type as number, date as number);
  const theme = useColorScheme() ?? "light"

  const handleSelectSortType = (val: number | string | null) => {
    setSortType(val as number)
    sortTransactions(Number(val))
  }

  return (
    <ParallaxFlatListView
      title='Transactions List'
    >
      <ThemedView style={{ gap: hp(2) }}>
        <ThemedSelectDropdown
          options={transactionTypes}
          placeholder='Type Filter'
          selectedValue={type}
          onSelect={(val) => setType(Number(val))}
        />
        <ThemedDatePicker
          placeholder='Date Filter'
          onSelect={(val) => setDate(Number(val))}
          value={date}
        />
        <ThemedSelectDropdown
          options={sortOptions}
          placeholder='Sort Type'
          selectedValue={sortType}
          onSelect={handleSelectSortType}
        />

      </ThemedView>
      <ThemedView style={{
        display: "flex",
        flex: 1,
        justifyContent: transactionList?.length == 0 || loadingList ? "center" : "flex-start",
        alignItems: "center",
        gap: hp(2),
        width: "100%",
      }}>
        {loadingList ? (
          <ActivityIndicator
            color={Colors?.[theme]?.tint}
            style={{ paddingTop: hp(6) }}
          />
        ) : (
          transactionList?.length > 0 ? (
            <FlatList
              data={transactionList}
              keyExtractor={(item, index) => `${item[TRANSACTION_KEYS.ID]}_${index}`}
              renderItem={({ item }) => <TransactionCard data={item} />}
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            />
          ) : (
            <ThemedView style={{
              paddingTop: hp(6),
            }}>
              <ThemedText>No data found for these filtered</ThemedText>
            </ThemedView>
          )
        )}
      </ThemedView>
    </ParallaxFlatListView>
  );
}