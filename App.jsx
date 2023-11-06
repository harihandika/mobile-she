import React from "react";
import { MultiProvider } from "./src/contexts";
import AppNavigation from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

const App = () => {
  return (
    <>
      <View style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <NavigationContainer>
          <MultiProvider>
            <AppNavigation />
          </MultiProvider>
        </NavigationContainer>
      </View>
    </>
  );
};

export default App;
