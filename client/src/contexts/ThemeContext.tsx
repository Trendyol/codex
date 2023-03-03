// theme context
import React, { createContext, FC, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContext = {
  theme: 'light' | 'dark';
  toggleDarkTheme: () => void;
  toggleLightTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext);

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') toggleDarkTheme();
  }, []);

  const toggleDarkTheme = () => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    setTheme('dark');
  };

  const toggleLightTheme = () => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
    setTheme('light');
  };

  const contextValue = { theme, toggleDarkTheme, toggleLightTheme };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
