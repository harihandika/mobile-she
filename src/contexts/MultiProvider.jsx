import React from "react";
import AccessTokenProvider from "./AccessTokenProvider";
import NativeBaseProvider from "./NativeBaseProvider";
import MainLayoutProvider from "./MainLayoutProvider";

const MultiProvider = ({ children }) => {
  const providers = [
    AccessTokenProvider,
    NativeBaseProvider,
    MainLayoutProvider,
  ];

  return providers.reduceRight((child, Provider) => {
    return <Provider>{child}</Provider>;
  }, children);
};

export default MultiProvider;
