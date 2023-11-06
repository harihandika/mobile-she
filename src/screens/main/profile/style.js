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
    paperStyle: {
      width: "auto",
      margin: 7.5,
    },
    avatarContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    avatarDetail: {
      width: "auto",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    avatarName: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 4,
    },
    avatarNrp: {
      fontSize: 14,
      color: colors.text2,
    },
    footer: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      margin: 7.5,
      gap: 5,
    },
    emptySpace: {
      width: "100%",
      height: 15,
    },
  });
