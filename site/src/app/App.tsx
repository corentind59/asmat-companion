import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import HomePage from '../home/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from '../auth/views/LoginPage';
import ProtectedRoute from '../auth/components/ProtectedRoute';
import Authenticator from '../auth/components/Authenticator';
import UnprotectedRoute from '../auth/components/UnprotectedRoute';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Authenticator>
        <BrowserRouter>
          <Switch>
            <UnprotectedRoute path="/login" exact component={LoginPage}/>
            <ProtectedRoute path="/" exact component={HomePage}/>
            <Redirect to="/"/>
          </Switch>
        </BrowserRouter>
      </Authenticator>
    </MuiThemeProvider>
  );
}

export default App;
