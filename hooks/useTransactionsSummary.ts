import { TRANSACTION_KEYS, TRANSACTION_TYPE } from '@/enums/transaction';
import { ITransaction } from '@/models/transaction';
import { getFirstDayOfCurrentMonth, getStorageData } from '@/utils';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Toast } from 'toastify-react-native';

export const useTransactionsSummary = () => {

  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const getAccumulationType = (data: ITransaction[], key: number) => {
    return data.reduce((acc: number, transaction) => {
      if (Number(transaction[TRANSACTION_KEYS.TYPE]) === key) {
        return acc + Number(transaction[TRANSACTION_KEYS.AMOUNT]);
      }
      return acc;
    }, 0)
  }

  const setTotalIncomeAndExpenses = async () => {
    try {
      const data = await getStorageData(TRANSACTION_KEYS.STORAGE_KEY, []);
      const firstDayOfCurrentMonth = getFirstDayOfCurrentMonth();
      const dataOfCurrentMonth = data?.filter((transaction: ITransaction) => transaction[TRANSACTION_KEYS.DATE] as number >= firstDayOfCurrentMonth)
      const totalIncome = getAccumulationType(dataOfCurrentMonth, TRANSACTION_TYPE.INCOME);
      const totalExpenses = getAccumulationType(dataOfCurrentMonth, TRANSACTION_TYPE.EXPENSE);
      setTotalIncome(totalIncome);
      setTotalExpenses(totalExpenses);
    } catch (error) {
      Toast.error("Failed to Get all Income and Expenses")
    }
  }

  useFocusEffect(
    useCallback(() => {
      setTotalIncomeAndExpenses();
    }, [])
  );

  return { totalIncome, totalExpenses }
}

