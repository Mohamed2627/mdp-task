import React from 'react';
import { StyleSheet } from 'react-native';
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen';
import { ThemedView } from '../ui/ThemedView';
import { ThemedText } from '../ui/ThemedText';
import { useTransactionsSummary } from '@/hooks/useTransactionsSummary';


const SummarySection = () => {
  // Hooks----------------------------------
  const { hp, wp } = useResponsiveScreen();
  const { totalIncome, totalExpenses } = useTransactionsSummary()

  return (
    <ThemedView style={styles(hp, wp).container}>
      <ThemedText style={styles(hp, wp).subtitle}>Summary of Current Month</ThemedText>
      <ThemedView style={styles(hp, wp).infoContainer}>
        <ThemedView style={styles(hp, wp).infoItem}>
          <ThemedText style={styles(hp, wp).infoLabel}>Total Income</ThemedText>
          <ThemedText style={[styles(hp, wp).infoValue, styles(hp, wp).income]}>${totalIncome}</ThemedText>
        </ThemedView>
        <ThemedView style={styles(hp, wp).infoItem}>
          <ThemedText style={styles(hp, wp).infoLabel}>Total Expenses</ThemedText>
          <ThemedText style={[styles(hp, wp).infoValue, styles(hp, wp).expense]}>${totalExpenses}</ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = (hp: Function, wp: Function) =>
  StyleSheet.create({
    container: {
      padding: hp(2),
      borderRadius: wp(2),
      marginVertical: hp(1),
      marginHorizontal: wp(4),
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: hp(0.5) },
      shadowOpacity: 0.1,
      shadowRadius: wp(1),
      width: "100%",
      alignSelf: "center"
    },
    subtitle: {
      fontSize: hp(2.5),
      fontWeight: 'bold',
      marginBottom: hp(1.5),
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    infoItem: {
      alignItems: 'center',
    },
    infoLabel: {
      fontSize: hp(2),
      marginBottom: hp(0.5),
    },
    infoValue: {
      fontSize: hp(2.5),
      fontWeight: 'bold',
    },
    income: {
      color: '#4CAF50',
    },
    expense: {
      color: '#F44336',
    },
  });

export default SummarySection;