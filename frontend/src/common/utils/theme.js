import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#484b4b',
      main: '#1b1e1f',
      dark: '#121515',
      contrastText: '#fff',
    },
    secondary: {
      light: '#8de4e9',
      main: '#71dee4',
      dark: '#4f9b9f',
      contrastText: '#000',
    },
  },
});