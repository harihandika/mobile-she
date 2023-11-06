import { StyleSheet } from "react-native";

export const styleSheet = () =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    imageContainer: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 7,
    },
    imageStyle: {
      width: 120,
      height: 120,
      aspectRatio: 1 / 1,
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
  });
