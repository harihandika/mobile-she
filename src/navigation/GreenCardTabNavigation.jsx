import React, { useEffect, useState } from "react";
import { Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { withTransactionHeader } from "../layouts";
import { colors } from "../constants";
import { GreenCardScreen, GreenCardTicketsScreen } from "../screens";
import GreenCardTicketsTopTabNavigation from "./GreenCardTicketsTopTabNavigation";
import { useAccessToken } from "../contexts";
import { useJwt } from "react-jwt";

const Tab = createBottomTabNavigator();

const initTabList = [
  {
    name: "Create",
    component: GreenCardScreen,
    focusIcon: "duplicate",
    blurIcon: "duplicate-outline",
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
  {
    name: "Tickets",
    component: GreenCardTicketsTopTabNavigation,
    focusIcon: "reader",
    blurIcon: "reader-outline",
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
];

const GreenCardTab = () => {
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");

  const [tabList, setTabList] = useState(initTabList);

  useEffect(() => {
    if (decodedToken) {
      if (decodedToken.Role.name === "PIC") {
        setTabList((prev) => [
          ...prev,
          {
            name: "Assignment",
            component: GreenCardTicketsScreen,
            focusIcon: "create",
            blurIcon: "create-outline",
            focusColor: colors.primary,
            blurColor: colors.text0,
          },
        ]);
      }
    }
  }, [decodedToken]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: Platform.OS === "ios" ? 85 : 55,
            backgroundColor: colors.bgColor0,
          },
        }}
      >
        {tabList.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name={focused ? item.focusIcon : item.blurIcon}
                  size={20}
                  color={focused ? item.focusColor : item.blurColor}
                />
              ),
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: focused ? "400" : "300",
                    color: focused ? item.focusColor : item.blurColor,
                    marginTop: -3,
                    marginBottom: 5,
                  }}
                >
                  {item.name}
                </Text>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const GreenCardTabNavigation = withTransactionHeader(GreenCardTab);
export default GreenCardTabNavigation;
