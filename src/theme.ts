import { createTheme, Theme } from '@mui/material/styles';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#47126b',
    },
    secondary: {
      main: '#000000',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    fontSize:12
  },
  // Add other customizations here
});

export default theme;