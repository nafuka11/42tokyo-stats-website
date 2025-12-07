import { createTheme, responsiveFontSizes } from "@mui/material/styles";

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
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#000",
          },
          padding: "8px 12px",
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(userTheme);
