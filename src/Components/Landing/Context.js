import React, { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [fromCode, setFromCode] = useState("");
  const [fromFlag, setFromFlag] = useState("");
  const [toCode, setToCode] = useState("");
  const [toFlag, setToFlag] = useState("");
  const [open, toggleOpen] = useState(false)
  const [source, setSource] = useState(true)

  return (
    <CurrencyContext.Provider
      value={{
        fromCode,
        fromFlag,
        toCode,
        toFlag,
        open,
        source,
        setFromCode,
        setFromFlag,
        setToCode,
        setToFlag,
        toggleOpen,
        setSource
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
