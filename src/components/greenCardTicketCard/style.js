import { StyleSheet } from "react-native";
import { colors } from "../../constants";

export const styleSheet = (props) =>
  StyleSheet.create({
    container: {
      width: "auto",
      height: props.showPic ? 175 : 135,
      backgroundColor: colors.bgColor0,
      padding: 10,
      borderRadius: 8,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.15,
      shadowRadius: 1.5,
      elevation: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cardHeader: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    ticketNumber: {
      fontWeight: "600",
    },
    cardBody: {
      width: "100%",
      height: "auto",
      display: "flex",
      flexDirection: "row",
      gap: 7,
      marginTop: 10,
    },
    bodyProp: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    property: {
      fontWeight: "500",
    },
    bodySeparator: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
    bodyValue: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      gap: 2,
    },
  });
