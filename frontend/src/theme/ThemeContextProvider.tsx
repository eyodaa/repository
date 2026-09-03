import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import type { PaletteMode } from "@mui/material/styles";
import { getAppTheme } from './theme';

interface ThemeContextType {
    mode: PaletteMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within a ThemeProviderWrapper');
    }
    return context;
};

export const ThemeProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<PaletteMode>('light');

    // Load from local storage
    useEffect(() => {
        const savedMode = localStorage.getItem('app-theme-mode');
        if (savedMode === 'dark' || savedMode === 'light') {
            setMode(savedMode);
        }
    }, []);

    const toggleTheme = () => {
        setMode((prevMode) => {
            const nextMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('app-theme-mode', nextMode);
            return nextMode;
        });
    };

    const theme = useMemo(() => getAppTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
