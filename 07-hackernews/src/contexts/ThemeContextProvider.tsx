import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {
    throw new Error("Using toggleTheme!");
  },
});

interface IProps {
  children: React.ReactNode;
}

const ThemeContextProvider: React.FC<IProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("hn_darkmode", false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
