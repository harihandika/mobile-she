import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { withMainHeader } from "../layouts";
import { colors } from "../constants";
import { HomeScreen, ProfileScreen } from "../screens";
import { Platform, Text } from "react-native";

const Tab = createBottomTabNavigator();

const tabList = [
  {
    name: "Home",
    component: HomeScreen,
    focusIcon: "home",
    blurIcon: "home-outline",
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
  {
    name: "Profile",
    component: ProfileScreen,
    focusIcon: "person",
    blurIcon: "person-outline",
    focusColor: colors.primary,
    blurColor: colors.text0,
  },
];

const MainTab = () => {
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

const MainTabNavigation = withMainHeader(MainTab);
export default MainTabNavigation;
