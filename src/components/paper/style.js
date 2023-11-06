import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export const styleSheet = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
      backgroundColor: colors.light,
      padding: 10,
      borderRadius: 8,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 1.5,
      elevation: 2,
    },
    header: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      marginBottom: 15,
    },
    title: {
      fontSize: 16,
      fontWeight: "bold",
    },
    description: {
      fontSize: 14,
      color: colors.text2,
    },
  });
