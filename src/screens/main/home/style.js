import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export const styleSheet = () =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: colors.light,
    },
    scrollContainer: {
      flex: 1,
      padding: 7.5,
    },
  });
