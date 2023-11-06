import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useJwt } from "react-jwt";
import { useToast } from "native-base";
import { useAccessToken } from "../contexts";
import { ErrorToast } from "../components";
import {
  GreenCardDetailScreen,
  LoginScreen,
  FatigueScreen,
  FatigueDetailScreen,
} from "../screens";
import MainTabNavigation from "./MainTabNavigation";
import GreenCardTabNavigation from "./GreenCardTabNavigation";
import { useAxios } from "../hooks";
import { fatigueService } from "../services";
import FatigueListTabNavigation from "./FatigueListTabNavigation";

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const { accessToken, removeAccessToken } = useAccessToken();
  const { decodedToken, isExpired } = useJwt(accessToken || "");
  const getDataToday = useAxios();

  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const [routeName, setRouteName] = useState("");

  useEffect(() => {
    if (decodedToken === null) {
      setIsTokenExpired(false);
    } else if (decodedToken !== null && isExpired) {
      setIsTokenExpired(true);
      toast.show({
        placement: "top",
        render: () => <ErrorToast message="Your session has expired!" />,
      });
    } else {
      setIsTokenExpired(false);
    }
  }, [decodedToken, isExpired, accessToken]);

  useEffect(() => {
    // check exp token every screen change (this function only active when user has login access)
    const unsubscribe = navigation.addListener("state", () => {
      if (decodedToken !== null) {
        const currentTime = Math.floor(Date.now() / 1000);
        const newIsExpired = decodedToken?.exp;
        if (newIsExpired && newIsExpired < currentTime) {
          setIsTokenExpired(true);
          removeAccessToken();
        }
      }
    });

    return unsubscribe;
  }, [decodedToken]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", (e) => {
      if (e.data.state && e.data.state.routeNames.length > 0) {
        const currentScreenName = e.data.state.routeNames[e.data.state.index];
        setRouteName(currentScreenName);
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    if (decodedToken !== null) {
      const queryParams = { userId: decodedToken.id };
      getDataToday.axiosFetch(fatigueService.getDataToday(queryParams));
    }
  }, [routeName, decodedToken]);

  useEffect(() => {
    if (getDataToday.isSuccess) {
      navigation.navigate("Fatigue", {
        id: getDataToday.response.payload.id,
      });
    }
  }, [getDataToday.isSuccess]);

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={
          decodedToken !== null && !isTokenExpired ? "MainTab" : "Login"
        }
      >
        {decodedToken !== null && !isTokenExpired ? (
          <>
            <Stack.Screen name="MainTab" component={MainTabNavigation} />
            <Stack.Screen
              name="GreenCardTab"
              component={GreenCardTabNavigation}
            />
            <Stack.Screen
              name="GreenCardDetail"
              component={GreenCardDetailScreen}
            />
            <Stack.Screen
              options={{ gestureEnabled: false }}
              name="Fatigue"
              component={FatigueScreen}
            />
            <Stack.Screen
              name="FatigueListTab"
              component={FatigueListTabNavigation}
            />
            <Stack.Screen
              name="FatigueDetail"
              component={FatigueDetailScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </>
  );
};

export default AppNavigation;
