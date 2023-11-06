import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styleSheet } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../constants";

const MenuItem = (props) => {
  const { label,ionIconName, onPress } = props;

  const [activeItem, setActiveItem] = useState(false);
  
  const styles = styleSheet({ activeItem });
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.container}
        onPress={onPress}
        onPressIn={() => {
          setActiveItem(true);
        }}
        onPressOut={() => {
          setActiveItem(false);
        }}
      >
        <View style={styles.iconContainer}>
          <Ionicons name={ionIconName} size={30} color={colors.primary} />
        </View>

        <Text style={styles.labelStyle}>{label}</Text>
      </TouchableOpacity>
    </>
  );
};

export default MenuItem;
