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
      main: '#d3aa93',
      light: '#ffdcc4',
      dark: '#a17b65',
      contrastText: '#000'
    }
  },
  typography: {
    fontSize: 14
  }
});

export default theme;
