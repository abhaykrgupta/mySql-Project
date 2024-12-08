"use client"
import { createTheme } from '@mui/material/styles';

// Create a theme using MUI's `createTheme` function
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Example primary color
    },
    secondary: {
      main: '#d32f2f',  // Example secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export default theme;
