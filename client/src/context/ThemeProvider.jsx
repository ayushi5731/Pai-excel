// import { createContext, useState, useContext } from "react";

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("theme-orange");

//   const changeTheme = (newTheme) => setTheme(newTheme);

//   return (
//     <ThemeContext.Provider value={{ theme, changeTheme }}>
//       <div className={theme}>{children}</div>
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);












import React, { createContext, useContext, useState } from "react";

// Step 1: Define color themes
const themes = {
  default: {
    background: "#ffffff",
    text: "#000000",
    primary: "#e65100"
  },
  blue: {
    background: "#e3f2fd",
    text: "#0d47a1",
    primary: "#2196f3"
  },
  dark: {
    background: "#1e1e1e",
    text: "#ffffff",
    primary: "#90caf9"
  },
  // Add more themes here
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("default");

  const changeTheme = (name) => {
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
