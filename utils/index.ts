import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'toastify-react-native';

export const getFirstDayOfCurrentMonth = () => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDayOfMonth.getTime();
}

export const getStorageData = async (key: string, defaultReturn = []) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      const parsedData = JSON.parse(data);
      return parsedData
    } else {
      return defaultReturn
    }
  } catch (error) {
    Toast.error("Failed to get data from the storage");
    return defaultReturn
  }
}