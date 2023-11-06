import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AppStatusBar } from "../../components";
import { colors } from "../../constants";
import { useMainLayout } from "../../contexts";
import { styleSheet } from "./style";

const withTransactionHeader = (WrappedComponent) => {
  return function TransactionHeader(props) {
    const styles = styleSheet();
    const { layoutTitle } = useMainLayout();
    const navigation = useNavigation();
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
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.iconButton}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="arrow-back" size={22} color={colors.light} />
                </TouchableOpacity>

                <Text style={styles.screenTitle}>{layoutTitle}</Text>
              </View>

              <View style={styles.rightContent}></View>
            </View>

            <WrappedComponent {...props} />
          </View>
        </KeyboardAvoidingView>
      </>
    );
  };
};

export default withTransactionHeader;
