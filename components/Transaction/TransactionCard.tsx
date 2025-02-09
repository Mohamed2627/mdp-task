import React from 'react';
import { StyleSheet } from 'react-native';
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen';
import { ThemedView } from '../ui/ThemedView';
import { ThemedText } from '../ui/ThemedText';
import { ITransaction } from '@/models/transaction';
import { TRANSACTION_KEYS } from '@/enums/transaction';
import { format } from 'date-fns';
import { expensesCategories, incomeCategories, transactionTypes } from '@/constants/data';

type TransactionCardProps = {
  data: ITransaction
};

const TransactionCard: React.FC<TransactionCardProps> = ({ data }: TransactionCardProps) => {
  const { wp, hp } = useResponsiveScreen();

  const formattedDate = format(data[TRANSACTION_KEYS.DATE] as number, 'dd/MM/yyyy')
  const type = transactionTypes?.find((type => type.value == data[TRANSACTION_KEYS.TYPE]))?.label
  const category = [...incomeCategories, ...expensesCategories]?.find((cate => cate.value == data[TRANSACTION_KEYS.CATEGORY]))?.label

  return (
    <ThemedView style={styles(hp, wp).card}>
      <ThemedText style={styles(hp, wp).amount}>Amount: ${data[TRANSACTION_KEYS.AMOUNT]}</ThemedText>
      <ThemedText style={styles(hp, wp).description}>Description: {data[TRANSACTION_KEYS.DESCRIPTION] ?? "N/A"}</ThemedText>
      <ThemedText style={styles(hp, wp).category}>Category: {category}</ThemedText>
      <ThemedText style={styles(hp, wp).type}>Type: {type}</ThemedText>
      <ThemedText style={styles(hp, wp).date}>Date: {formattedDate}</ThemedText>
    </ThemedView>
  );
};


const styles = (hp: Function, wp: Function) =>
  StyleSheet.create({
    card: {
      padding: hp(2),
      borderRadius: wp(2),
      marginVertical: hp(1),
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: hp(0.5) },
      shadowOpacity: 0.1,
      shadowRadius: wp(1),
    },
    amount: {
      fontSize: hp(2.5),
      fontWeight: 'bold',
      marginBottom: hp(1),
    },
    description: {
      fontSize: hp(2),
      marginBottom: hp(0.5),
    },
    category: {
      fontSize: hp(2),
      marginBottom: hp(0.5),
    },
    type: {
      fontSize: hp(2),
      marginBottom: hp(0.5),
    },
    date: {
      fontSize: hp(1.8),
    },
  });

export default TransactionCard;