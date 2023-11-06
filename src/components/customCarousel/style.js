import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const styleSheet = () =>
  StyleSheet.create({
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      width,
    },
    cardWrapper: {
      borderRadius: 6,
      overflow: "hidden",
    },
    card: {
      width: width - 20,
      height: width * 0.55,
    },
  });
