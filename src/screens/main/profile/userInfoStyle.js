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
    formFooter: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    buttonStyle: {
      width: 110,
      marginTop: 5,
    },
  });
