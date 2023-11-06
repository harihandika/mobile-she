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
    emptySpace: {
      width: "100%",
      height: 15,
    },
    uploaderContainer: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    imageStyle: {
      width: 100,
      height: 100,
      aspectRatio: 1 / 1,
      objectFit: "cover",
    },
    buttonStyle: {
      width: "100%",
      marginTop: 20,
    },
    modalBodyStyle: {
      display: "flex",
      flexDirection: "column",
    },
  });
