import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { useJwt } from "react-jwt";
import { useNavigation } from "@react-navigation/native";
import { useMainLayout, useAccessToken } from "../../../contexts";
import MenuItem from "../../../components/menuItem";
import { carousel1, carousel2, carousel3, carousel4 } from "../../../assets";
import { CustomCarousel } from "../../../components";

import { styleSheet } from "./style";

const data = [
  { source: carousel1 },
  { source: carousel2 },
  { source: carousel3 },
  { source: carousel4 },
];

const menuInit = [
  {
    label: "Green Card",
    ionIconName: "duplicate-outline",
    redirect: "GreenCardTab",
  },
  { label: "Daily Inspection", ionIconName: "search", redirect: null },
  { label: "Incident Report", ionIconName: "warning-outline", redirect: null },
];

const HomeScreen = () => {
  const styles = styleSheet();
  const { setLayoutTitle } = useMainLayout();
  const navigation = useNavigation();
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");

  const generateMenu = (arr) => {
    const temp = arr.filter((item) => item !== null);
    const currentLength = temp.length;
    const remainder = currentLength % 4;
    if (remainder !== 0) {
      const nullCount = 4 - remainder;
      for (let i = 0; i < nullCount; i++) {
        temp.push(null);
      }
    }
    return temp;
  };

  const [menu, setMenu] = useState(generateMenu(menuInit));

  const handleRedirect = (route) => {
    if (route === null) return;
    navigation.navigate(route);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLayoutTitle("");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (decodedToken) {
      setMenu((prev) => {
        const temp = prev.slice();
        if (decodedToken.Role.name !== "Super Admin") {
          temp.push({
            label: "Fatigue",
            ionIconName: "body-outline",
            redirect: "FatigueListTab",
          });
        }
        return generateMenu(temp);
      });
    }
  }, [decodedToken]);
  return (
    <View style={styles.screenContainer}>
      <CustomCarousel data={data} />

      <ScrollView style={styles.scrollContainer}>
        <FlatList
          data={menu}
          renderItem={({ item }) => (
            <>
              {item ? (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 10,
                  }}
                >
                  <MenuItem
                    label={item.label}
                    ionIconName={item.ionIconName}
                    onPress={() => handleRedirect(item.redirect)}
                  />
                </View>
              ) : (
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "center",
                    margin: 10,
                  }}
                ></View>
              )}
            </>
          )}
          keyExtractor={(_, index) => index.toString()}
          numColumns={4}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
