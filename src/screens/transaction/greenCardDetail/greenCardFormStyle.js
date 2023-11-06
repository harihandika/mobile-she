import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export const styleSheet = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
      backgroundColor: colors.light,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 15,
    },
    formContainer: {
      width: "100%",
      height: "auto",
      backgroundColor: colors.light,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 5,
    },
    buttonStyle: {
      width: "100%",
      marginTop: 20,
    },
  });
