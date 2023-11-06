import { StyleSheet } from "react-native";

export const styleSheet = (props) => {
  let borderRadius = 8;
  let size = 55;
  let textSize = 20;

  if (props.shape === "circle") {
    borderRadius = size;
  } else if (props.shape === "square") {
    borderRadius = 8;
  } else {
    borderRadius = size;
  }

  if (props.size === "large") {
    size = 75;
    textSize = 28;
  } else if (props.size === "medium") {
    size = 55;
    textSize = 20;
  } else if (props.size === "small") {
    size = 35;
    textSize = 13;
  } else {
    size = 55;
    textSize = 20;
  }

  return StyleSheet.create({
    container: {
      width: size,
      height: size,
      backgroundColor: "red",
      borderRadius: borderRadius,
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    letter: {
      fontSize: textSize,
    },
  });
};
