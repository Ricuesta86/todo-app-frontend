// theme.js

// 1. import `extendTheme` function
import type {StyleFunctionProps} from "@chakra-ui/styled-system";

import {extendTheme} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const breakpoints = {
  sm: "375px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1440px",
};
const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("hsl(0, 0%, 98%)", "hsl(235, 21%, 11%)")(props),
    },
  }),
};
// 3. extend the theme
const theme = extendTheme({config, breakpoints, styles});

export default theme;
