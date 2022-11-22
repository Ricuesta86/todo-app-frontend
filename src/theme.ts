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
};

// 3. extend the theme
const theme = extendTheme({config});

export default theme;
