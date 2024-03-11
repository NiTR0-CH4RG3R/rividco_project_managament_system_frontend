// MyThemeComponent.js
import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getContrastRatio } from '@mui/material';

const MyThemeComponent = ({ children }) => {
  const theme = React.useMemo(
    () =>
      createTheme({

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
        




        palette: {
          primary: {
            main: '#09BEB1',
            contrastText:
              getContrastRatio('#09BEB1', '#fff') > 4.5 ? '#fff' : '#111',
          },
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default MyThemeComponent;
