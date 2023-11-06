import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export const styleSheet = () =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: colors.light,
    },
    layoutContainer: {
      flex: 1,
      backgroundColor: colors.light,
    },
    headerContainer: {
      width: "100%",
      height: 60,
      backgroundColor: colors.primary,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 15,
    },
    leftContent: {
      width: "auto",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 10,
    },
    headerLogo: {
      width: 70,
      objectFit: "contain",
    },
    screenTitle: {
      color: colors.text1,
      fontSize: 18,
      fontWeight: "bold",
    },
    rightContent: {
      width: "auto",
      height: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: 10,
      marginRight: 5,
    },
    iconButton: {
      width: "auto",
      height: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  });
