import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import { Button } from "native-base";
import { useJwt } from "react-jwt";
import { useNavigation } from "@react-navigation/native";
import { useAccessToken, useMainLayout } from "../../../contexts";
import { LetterAvatar, Paper } from "../../../components";
import UserInfo from "./UserInfo";
import ChangePassword from "./changePassword";
import { styleSheet } from "./style";

const ProfileScreen = () => {
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const { accessToken, removeAccessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");
  const navigation = useNavigation();

  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    setTimeout(() => {
      setLogoutLoading(false);
      removeAccessToken();
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("Profile");
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.scrollContainer}>
        <Paper style={styles.paperStyle}>
          <View style={styles.avatarContainer}>
            <LetterAvatar shape="circle" size="medium" />

            <View style={styles.avatarDetail}>
              <Text style={styles.avatarName}>{decodedToken?.fullName}</Text>
              <Text style={styles.avatarNrp}>{decodedToken?.nrp}</Text>
            </View>
          </View>
        </Paper>

        <Paper title="User Info" style={styles.paperStyle}>
          <UserInfo />
        </Paper>

        <Paper title="Change Password" style={styles.paperStyle}>
          <ChangePassword />
        </Paper>

        <View style={styles.footer}>
          <Button
            w="100%"
            isLoading={logoutLoading}
            isLoadingText="Logging out"
            onPress={handleLogout}
            colorScheme="danger"
          >
            Log out
          </Button>
        </View>

        <View style={styles.emptySpace}></View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
