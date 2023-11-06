import React from "react";
import { View, Text, Image, KeyboardAvoidingView } from "react-native";
import { AppStatusBar } from "../../components";
import { colors } from "../../constants";
import { acsetLogoLight } from "../../assets";
import { useMainLayout } from "../../contexts";
import { styleSheet } from "./style";

const withFatigueHeader = (WrappedComponent) => {
  return function MainHeader(props) {
    const styles = styleSheet();
    const { layoutTitle } = useMainLayout();
    return (
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" && "padding"}
          style={styles.layoutContainer}
        >
          <AppStatusBar backgroundColor={colors.primary} textColor="light" />

          <View style={styles.layoutContainer}>
            <View style={styles.headerContainer}>
              <View style={styles.leftContent}>
                {layoutTitle === "" ? (
                  <Image source={acsetLogoLight} style={styles.headerLogo} />
                ) : (
                  <Text style={styles.screenTitle}>{layoutTitle}</Text>
                )}
              </View>
            </View>

            <WrappedComponent {...props} />
          </View>
        </KeyboardAvoidingView>
      </>
    );
  };
};

export default withFatigueHeader;
