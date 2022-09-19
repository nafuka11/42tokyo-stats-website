import "../src/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../src/styles/theme";


export const decorators = [
  (Story) => {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
