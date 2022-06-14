import { createTheme, responsiveFontSizes } from "@mui/material";

const userTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-disabled": {
            color: "#fff",
          },
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(userTheme);
