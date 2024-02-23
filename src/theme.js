import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === 'dark' ? {
                background: {
                    default: '#222',
                    paper: '#272727'
                },
            } : {
                background: {
                    default: '#f7f7f7f7',
                    paper: '#fff'
                },
            })
            // ...(mode === "dark"
            //   ? {
            //     // palette values for dark mode
            //     primary: {
            //       main: colors.primary[500],
            //     },
            //     secondary: {
            //       main: colors.greenAccent[500],
            //     },
            //     neutral: {
            //       dark: colors.grey[700],
            //       main: colors.grey[500],
            //       light: colors.grey[100],
            //     },
            //     background: {
            //       default: colors.primary[500],
            //     },
            //   }
            //   : {
            //     // palette values for light mode
            //     primary: {
            //       main: colors.primary[100],
            //     },
            //     secondary: {
            //       main: colors.greenAccent[500],
            //     },
            //     neutral: {
            //       dark: colors.grey[700],
            //       main: colors.grey[500],
            //       light: colors.grey[100],
            //     },
            //     background: {
            //       default: "#fcfcfc",
            //     },
            //   }),
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

export const useMode = () => {
    const [mode, setMode] = useState("light");

    const colorMode = useMemo(() => ({ toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")) }), []);

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    return [theme, colorMode];
};