import React, { createContext, useContext, useState } from "react";

const MainLayoutContext = createContext(null);

export const useMainLayout = () => {
  return useContext(MainLayoutContext);
};

const MainLayoutProvider = ({ children }) => {
  const [title, setTitle] = useState("");

  const setLayoutTitle = (value) => {
    setTitle(value);
  };

  return (
    <>
      <MainLayoutContext.Provider
        value={{
          layoutTitle: title,
          setLayoutTitle,
        }}
      >
        {children}
      </MainLayoutContext.Provider>
    </>
  );
};

export default MainLayoutProvider;
