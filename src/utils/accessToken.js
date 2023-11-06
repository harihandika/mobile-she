import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = async () => {
  const itemName = "sheMobileAccessToken";
  const local = await AsyncStorage.getItem(itemName);
  if (local !== null) {
    return local;
  } else {
    return "";
  }
};

export const setAccessToken = async (strValue) => {
  const itemName = "sheMobileAccessToken";
  const itemValue = strValue;
  await AsyncStorage.setItem(itemName, itemValue);
};

export const renewAccessToken = async (strValue) => {
  const itemName = "sheMobileAccessToken";
  const itemValue = strValue;
  await AsyncStorage.removeItem(itemName);
  await AsyncStorage.setItem(itemName, itemValue);
};

export const removeAccessToken = async () => {
  const itemName = "sheMobileAccessToken";
  await AsyncStorage.removeItem(itemName);
};
