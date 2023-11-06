import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAccessToken as getToken,
  setAccessToken as setToken,
  renewAccessToken as renewToken,
  removeAccessToken as removeToken,
} from "../utils";

const AccessTokenContext = createContext(null);

export const useAccessToken = () => {
  return useContext(AccessTokenContext);
};

const AccessTokenProvider = ({ children }) => {
  const [userToken, setUserToken] = useState("");
  const [trigger, setTrigger] = useState(true);

  const getAccessToken = async () => {
    const tokenValue = await getToken();
    setUserToken(tokenValue);
  };

  const setAccessToken = async (value) => {
    await setToken(value);
    setTrigger((prev) => !prev);
  };

  const renewAccessToken = async (value) => {
    await renewToken(value);
    setTrigger((prev) => !prev);
  };

  const removeAccessToken = async () => {
    await removeToken();
    setTrigger((prev) => !prev);
  };

  useEffect(() => {
    getAccessToken();
  }, [trigger]);

  return (
    <>
      <AccessTokenContext.Provider
        value={{
          accessToken: userToken,
          setAccessToken,
          renewAccessToken,
          removeAccessToken,
        }}
      >
        {children}
      </AccessTokenContext.Provider>
    </>
  );
};

export default AccessTokenProvider;
