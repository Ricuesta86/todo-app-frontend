// theme.js

// 1. import `extendTheme` function
import {extendTheme} from "@chakra-ui/react";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
  breakpoints: {
    sm: "375px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1440px",
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        "font-family": `'Josefin Sans', sans-serif`,
      },
    },
  },
  fonts: {
    body: `'Josefin Sans', sans-serif`,
  },
  colors: {
    // veryDarkBlue: "hsl(235, 21%, 11%)",
    // veryDarkDesaturatedBlue: "hsl(235, 24%, 19%)",
    // lightGrayishBlue: "hsl(234, 39%, 85%)",
    // lightGrayishBlue (hover): 'hsl(236, 33%, 92%)'
    // darkGrayishBlue: "hsl(234, 11%, 52%)",
    // veryDarkGrayishBlue: "hsl(233, 14%, 35%)",
    // veryDarkGrayishBlue: "hsl(237, 14%, 26%)",
  },
};

// 3. extend the theme
const theme = extendTheme({config});

export default theme;
