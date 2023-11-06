import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FormControl, Input, Pressable, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { AppStatusBar } from "../../../components";
import { colors } from "../../../constants";
import { acsetLogo, isafeLogo } from "../../../assets";
import { useAxios } from "../../../hooks";
import { userService } from "../../../services";
import { config } from "../../../configs";
import { hashPassword } from "../../../utils";
import { useAccessToken } from "../../../contexts";
import { styleSheet } from "./style";

const LoginScreen = () => {
  const styles = styleSheet();
  const { setAccessToken } = useAccessToken();
  const userLogin = useAxios(true);
  const refPassword = useRef();

  const [isNrpFocus, setIsNrpFocus] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nrp, setNrp] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = () => {
    if (nrp === null) setNrp("");
    if (password === null) setPassword("");
    if (nrp === null || password === null) return;
    if (nrp === "" || password === "") return;

    const payload = {
      nrp,
      password: hashPassword(password),
      encrypted: true,
      platform: config.appPlatform,
    };
    userLogin.axiosFetch(userService.login(payload));
  };

  useEffect(() => {
    if (!userLogin.isSuccess) return;
    setAccessToken(userLogin.response.payload.token);
  }, [userLogin.isSuccess]);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" && "padding"}
        style={styles.screenContainer}
      >
        <AppStatusBar backgroundColor={colors.light} textColor="dark" />

        <SafeAreaView style={styles.loginContainer}>
          <View style={styles.body}>
            <Image source={acsetLogo} style={styles.companyLogo} />
            <Text style={styles.loginTitle}>Selamat Datang di SHE Mobile</Text>
            <Text style={styles.loginSubtitle}>
              Silahkan masukkan NRP dan password Anda
            </Text>

            <View style={styles.loginForm}>
              <FormControl isRequired isInvalid={nrp === ""}>
                <Input
                  h="10"
                  fontSize="sm"
                  InputLeftElement={
                    <Ionicons
                      name="person-outline"
                      size={18}
                      color={isNrpFocus ? colors.primary : colors.text2}
                      style={{ marginLeft: 10 }}
                    />
                  }
                  placeholder="NRP"
                  placeholderTextColor={colors.text2}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onFocus={() => setIsNrpFocus(true)}
                  onBlur={() => setIsNrpFocus(false)}
                  onSubmitEditing={() => refPassword.current.focus()}
                  onChangeText={(value) => setNrp(value)}
                />
                <FormControl.ErrorMessage>
                  NRP is required!
                </FormControl.ErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={password === ""}>
                <Input
                  ref={refPassword}
                  h="10"
                  fontSize="sm"
                  InputLeftElement={
                    <Ionicons
                      name="lock-closed-outline"
                      size={18}
                      color={isPasswordFocus ? colors.primary : colors.text2}
                      style={{ marginLeft: 10 }}
                    />
                  }
                  InputRightElement={
                    <Pressable
                      style={{
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      onPress={() => setShowPassword((prev) => !prev)}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={colors.text2}
                        style={{ marginRight: 10 }}
                      />
                    </Pressable>
                  }
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  placeholderTextColor={colors.text2}
                  onFocus={() => setIsPasswordFocus(true)}
                  onBlur={() => setIsPasswordFocus(false)}
                  onChangeText={(value) => setPassword(value)}
                />
                <FormControl.ErrorMessage>
                  Password is required!
                </FormControl.ErrorMessage>
              </FormControl>

              <Button
                w="100%"
                isLoading={userLogin.loading}
                isLoadingText="Log in"
                onPress={handleLogin}
              >
                Log in
              </Button>
            </View>
          </View>

          <View style={styles.footer}>
            <Image source={isafeLogo} style={styles.appLogo} />
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </>
  );
};

export default LoginScreen;
