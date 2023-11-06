import { StyleSheet } from "react-native";
import { colors } from "../../../constants";

export const styleSheet = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 7,
    },
    imageStyle: {
      width: 250,
      height: 150,
      objectFit: "cover",
      resizeMode: "contain",
    },
    modalBodyStyle: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    imageDetailStyle: {
      width: "100%",
      height: "auto",
      aspectRatio: 3 / 4,
      objectFit: "contain",
      resizeMode: "contain",
    },
    buttonStyle: {
      width: "100%",
      marginTop: 20,
    },
  });
