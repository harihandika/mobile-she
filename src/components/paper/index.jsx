import React from "react";
import { styleSheet } from "./style";
import { Text, View } from "react-native";

const Paper = ({ children, style, title, description }) => {
  const styles = styleSheet();
  return (
    <>
      <View style={{ ...styles.container, ...style }}>
        {title && (
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            {description && (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        )}

        {children}
      </View>
    </>
  );
};

export default Paper;
