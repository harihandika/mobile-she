import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../constants";
import { FatigueListScreen } from "../screens";
import { useAccessToken } from "../contexts";
import { useJwt } from "react-jwt";

const Tab = createMaterialTopTabNavigator();

const initialTabList = [
  {
    name: "Tidak Boleh Bekerja",
    component: FatigueListScreen,
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
  {
    name: "Kerja Normal",
    component: FatigueListScreen,
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
];

const FatigueListTopTabNavigation = () => {
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");

  const [tabList, setTabList] = useState(initialTabList);

  useEffect(() => {
    if (decodedToken) {
      setTabList((prev) => {
        if (
          decodedToken?.Role?.name === "SHE System" ||
          decodedToken?.Role?.name === "PM"
        )
          return prev;

        return [
          {
            name: "Tidak Boleh Bekerja",
            component: FatigueListScreen,
            focusColor: colors.primary,
            blurColor: colors.text0,
          },
          {
            name: "Dibawah Pengawasan",
            component: FatigueListScreen,
            focusColor: colors.primary,
            blurColor: colors.text0,
          },
          {
            name: "Kerja Normal",
            component: FatigueListScreen,
            focusColor: colors.primary,
            blurColor: colors.text0,
          },
        ];
      });
    }
  }, [decodedToken]);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Submitted"
        tabBarOptions={{
          indicatorStyle: { backgroundColor: colors.primary },
        }}
        screenOptions={{
          tabBarScrollEnabled: true,
        }}
      >
        {tabList.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.name}
            component={item.component}
            options={{
              tabBarLabel: ({ focused }) => (
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 13,
                    textAlign: "center",
                    color: focused ? item.focusColor : item.blurColor,
                  }}
                >
                  {item.name.toUpperCase()}
                </Text>
              ),
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

export default FatigueListTopTabNavigation;
