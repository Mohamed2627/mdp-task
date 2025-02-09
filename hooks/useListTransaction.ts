import { SORT_TYPE, TRANSACTION_KEYS } from '@/enums/transaction';
import { ITransaction } from '@/models/transaction';
import { getStorageData } from '@/utils';
import { format } from 'date-fns';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Toast } from 'toastify-react-native';

export const useListTransaction = (type: number, date: number) => {
  const [loadingList, setLoading] = useState(false);
  const [transactionList, setTransactionList] = useState<ITransaction[]>([]);

  const sortTransactions = useCallback((sortType: number) => {

    try {
      if (sortType == 0) return;
      setLoading(true)
      const key = TRANSACTION_KEYS.DATE;
      const isAscending = sortType == SORT_TYPE.ASCENDING

      const sortedData = transactionList.sort((a: ITransaction, b: ITransaction) => {
        if (a[key] === undefined || b[key] === undefined) {
          return 0;
        }
        if (a[key] < b[key]) {
          return isAscending ? -1 : 1;
        }
        if (a[key] > b[key]) {
          return isAscending ? 1 : -1;
        }
        return 0;
      });
      setTransactionList(sortedData)
    } catch (error) {
      Toast.error("Failed to get the sorted transactions list")
    } finally {
      setLoading(false)
    }
  }, [transactionList])

  const filterData = async (typeId: number, date: number) => {
    try {
      setLoading(true)
      const allData: ITransaction[] = await getStorageData(TRANSACTION_KEYS.STORAGE_KEY, []);
      if (typeId && date) {
        const filteredData = allData.filter((trans) => trans[TRANSACTION_KEYS.TYPE] == typeId &&
          format(trans[TRANSACTION_KEYS.DATE] as number, 'dd/MM/yyyy') == format(date, 'dd/MM/yyyy'))
        setTransactionList(filteredData)
      } else if (typeId) {
        const filteredData = allData.filter((trans) => trans[TRANSACTION_KEYS.TYPE] == typeId)
        setTransactionList(filteredData)
      } else if (date) {
        const filteredData = allData.filter((trans) => format(trans[TRANSACTION_KEYS.DATE] as number, 'dd/MM/yyyy') == format(date, 'dd/MM/yyyy'))
        setTransactionList(filteredData)
      } else {
        setTransactionList(allData)
      }
    } catch (error) {
      Toast.error("Failed to get the filtered transactions list")
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      filterData(type, date);
    }, [type, date])
  );

  return { transactionList, loadingList, sortTransactions }
}