import React from "react";
import { NativeBaseProvider as NBProvider, extendTheme } from "native-base";
import { colors } from "../constants";

const NativeBaseProvider = ({ children }) => {
  const theme = extendTheme({
    colors: {
      primary: {
        300: "#677cdb",
        600: colors.primary,
        800: "#121a4a",
      },
    },
    components: {
      Input: {
        defaultProps: {
          _input: {
            selectionColor: colors.primary,
            cursorColor: colors.primary,
          },
          bgColor: colors.light,
          focusOutlineColor: colors.primary,
        },
      },
      Button: {
        defaultProps: {
          colorScheme: "primary",
        },
      },
    },
  });
  return (
    <>
      <NBProvider theme={theme}>{children}</NBProvider>
    </>
  );
};

export default NativeBaseProvider;
