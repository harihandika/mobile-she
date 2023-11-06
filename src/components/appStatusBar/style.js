import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export const styleSheet = (props) =>
  StyleSheet.create({
    container: {
      height: Constants.statusBarHeight,
      backgroundColor: props.backgroundColor,
    },
  });
