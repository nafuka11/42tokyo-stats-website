import { createTheme, responsiveFontSizes } from "@mui/material";

const userTheme = createTheme({
  palette: {
    background: {
      default: "#f8f9fa",
    },
  },
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
