import React from "react";
import MyContext from "./MyContext";

const MyContextProvider = ({ children }) => {
  const sharedText = "this is a shared text";

  return <MyContext.Provider value={sharedText}>{children}</MyContext.Provider>;
};

export default MyContextProvider;
