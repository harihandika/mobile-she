import React from "react";
import { Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { colors } from "../constants";
import { GreenCardTicketsScreen } from "../screens";

const Tab = createMaterialTopTabNavigator();

const tabList = [
  {
    name: "Submitted",
    component: GreenCardTicketsScreen,
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
  {
    name: "On Process",
    component: GreenCardTicketsScreen,
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
  {
    name: "Closed",
    component: GreenCardTicketsScreen,
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
  {
    name: "Rejected",
    component: GreenCardTicketsScreen,
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
];

const GreenCardTicketsTopTabNavigation = () => {
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

export default GreenCardTicketsTopTabNavigation;
