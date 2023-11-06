import { StyleSheet } from "react-native";
import { colors } from "../../constants";

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
    emptySpace: {
      width: "100%",
      height: 15,
    },
    buttonStyle: {
      width: "100%",
      marginTop: 15,
    },
    resultContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    resultName: {
      color: colors.text0,
      fontSize: 18,
      fontWeight: "800",
      textAlign: "center",
    },
    result: {
      width: "90%",
      height: "auto",
      padding: 30,
      borderRadius: 15,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 25,
      marginBottom: 20,
    },
    resultGreeting: {
      color: colors.text0,
      fontSize: 16,
      fontWeight: "300",
      textAlign: "center",
      marginHorizontal: 20,
      marginVertical: 20,
    },
    resultTitle: {
      color: colors.text1,
      fontSize: 20,
      fontWeight: "800",
      textAlign: "center",
    },
    resultDesc: {
      color: colors.text1,
      fontSize: 18,
      fontWeight: "400",
      textAlign: "center",
    },
    resultDate: {
      color: colors.text0,
      fontSize: 18,
      fontWeight: "600",
      textAlign: "center",
    },
    resultTime: {
      color: colors.text0,
      fontSize: 16,
      fontWeight: "500",
      textAlign: "center",
    },
    infoContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      gap: 20,
      marginVertical: 20,
    },
    infoText: {
      color: colors.text2,
      fontSize: 16,
      fontWeight: "400",
    },
    modalBodyContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
    },
    modalText: {
      color: colors.text2,
      fontSize: 16,
      fontWeight: "400",
    },
    modalButton: {
      width: 80,
    },
  });
