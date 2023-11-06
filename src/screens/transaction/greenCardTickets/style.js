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
    emptySpace: {
      width: "100%",
      height: 15,
    },
    cardStyle: {
      margin: 7.5,
    },
  });
