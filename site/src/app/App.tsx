import { BrowserRouter, Switch } from 'react-router-dom';
import HomePage from '../home/views/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from '../auth/views/LoginPage';
import ProtectedRoute from '../auth/components/ProtectedRoute';
import AuthProvider from '../auth/components/AuthProvider';
import UnprotectedRoute from '../auth/components/UnprotectedRoute';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <UnprotectedRoute path="/login" exact component={LoginPage}/>
            <ProtectedRoute path="/" component={HomePage}/>
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
