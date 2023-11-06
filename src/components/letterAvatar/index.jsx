import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { useJwt } from "react-jwt";
import { useAccessToken } from "../../contexts";
import { generateColor } from "../../utils";
import { styleSheet } from "./style";

const LetterAvatar = ({ shape, size, style }) => {
  const styles = styleSheet({
    shape,
    size,
  });
  const { accessToken } = useAccessToken();
  const { decodedToken } = useJwt(accessToken || "");

  const [userData, setUserData] = useState({});

  const generateLetter = (fullName) => {
    if (fullName === "") return "";
    const fullNameArr = fullName.split(" ");
    if (fullNameArr.length > 1) {
      return fullNameArr[0][0] + fullNameArr[1][0];
    } else {
      return fullNameArr[0][0];
    }
  };

  useEffect(() => {
    if (decodedToken) {
      setUserData(decodedToken);
    }
  }, [decodedToken]);

  return (
    <>
      <View
        style={{
          ...styles.container,
          backgroundColor: generateColor(`${userData.fullName}`).lightShade,
          ...style,
        }}
      >
        <Text
          style={{
            ...styles.letter,
            color: generateColor(`${userData.fullName}`).darkShade,
          }}
        >
          {Object.keys(userData).length > 0 &&
            generateLetter(userData.fullName)}
        </Text>
      </View>
    </>
  );
};

export default LetterAvatar;
