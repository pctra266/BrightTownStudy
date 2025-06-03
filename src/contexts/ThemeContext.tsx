import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

type ThemeMode = "system" | "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  actualTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("themeMode");
    return (saved as ThemeMode) || "system";
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    localStorage.setItem("themeMode", mode);

    if (mode === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setActualTheme(mediaQuery.matches ? "dark" : "light");

      const handler = (e: MediaQueryListEvent) => {
        setActualTheme(e.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setActualTheme(mode);
    }
  }, [mode]);

  const theme = createTheme({
    palette: {
      mode: actualTheme,
      ...(actualTheme === "light"
        ? {
            primary: {
              main: "#1976d2",
            },
            text: {
              primary: "#000000",
              secondary: "#666666",
            },
            background: {
              default: "#ffffff",
              paper: "#f5f5f5",
            },
          }
        : {
            primary: {
              main: "#90caf9",
            },
            text: {
              primary: "#ffffff",
              secondary: "#b0b0b0",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: actualTheme === "dark" ? "#1e1e1e" : "#1976d2",
            color: "#ffffff",
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, setMode, actualTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
