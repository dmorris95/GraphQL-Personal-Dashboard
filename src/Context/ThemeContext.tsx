import React, { createContext, useState, useContext, ReactNode } from "react";

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeContext = createContext<any>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDark = () => {
        setDarkMode(!darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);