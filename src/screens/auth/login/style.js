import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export const styleSheet = () =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: colors.light,
    },
    loginContainer: {
      flex: 1,
      backgroundColor: colors.light,
      display: "flex",
      justifyContent: "space-between",
    },
    body: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    companyLogo: {
      width: 150,
      objectFit: "contain",
      marginBottom: 25,
    },
    loginTitle: {
      width: "90%",
      color: colors.primary,
      fontWeight: "400",
      fontSize: 21,
      marginBottom: 4,
      textAlign: "center",
    },
    loginSubtitle: {
      width: "90%",
      color: colors.primary,
      fontWeight: "300",
      fontSize: 16,
      textAlign: "center",
    },
    loginForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "90%",
      gap: 20,
      marginTop: 40,
      marginBottom: 40,
    },
    footer: {
      height: 40,
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    appLogo: {
      height: 25,
      objectFit: "contain",
      marginBottom: 10,
    },
  });
