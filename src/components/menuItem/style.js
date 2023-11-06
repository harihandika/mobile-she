import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export const styleSheet = (props) =>
  StyleSheet.create({
    container: {
      width: 70,
      height: 110,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginHorizontal: 12.5,
      borderRadius: 10,
      paddingHorizontal: 1,
      backgroundColor: props.activeItem ? "#fafafa" : "transparent",
    },
    iconContainer: {
      width: 55,
      height: 55,
      marginTop: 5,
      borderRadius: 18,
      borderColor: colors.text3,
      borderWidth: 0.4,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    labelStyle: {
      fontSize: 13,
      textAlign: "center",
    },
  });
