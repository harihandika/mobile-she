import React from "react";
import { Platform, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { styleSheet } from "./style";

const AppStatusBar = ({ backgroundColor, textColor }) => {
  const styles = styleSheet({
    backgroundColor,
  });

  return (
    <>
      {Platform.OS === "ios" ? (
        <View style={styles.container}>
          <StatusBar
            style={textColor}
            translucent={false}
            backgroundColor={backgroundColor}
          />
        </View>
      ) : (
        <StatusBar
          style={textColor}
          translucent={false}
          backgroundColor={backgroundColor}
        />
      )}
    </>
  );
};

export default AppStatusBar;
