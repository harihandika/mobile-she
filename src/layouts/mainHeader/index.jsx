import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppStatusBar } from "../../components";
import { colors } from "../../constants";
import { acsetLogoLight } from "../../assets";
import { useMainLayout } from "../../contexts";
import { styleSheet } from "./style";

const withMainHeader = (WrappedComponent) => {
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

              <View style={styles.rightContent}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.iconButton}
                  // onPress={() => navigation.navigate("")}
                >
                  <Ionicons
                    name="notifications"
                    size={20}
                    color={colors.light}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <WrappedComponent {...props} />
          </View>
        </KeyboardAvoidingView>
      </>
    );
  };
};

export default withMainHeader;
