import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#bed6ed',
      light: '#f1ffff',
      dark: '#8da5bb',
      contrastText: '#000'
    },
    primary: {
      main: '#eac0a8',
      light: '#fff3da',
      dark: '#b79079',
      contrastText: '#000'
    }
  },
  typography: {
    fontSize: 16
  }
});

export default theme;
