import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from '../home/Home';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import LoginPage from '../auth/views/LoginPage';
import ProtectedRoute from '../auth/components/ProtectedRoute';
import Authenticator from '../auth/components/Authenticator';


function App() {
  return (
    <Authenticator>
      <BrowserRouter>
        <CssBaseline/>
        <Container component="main">
          <Switch>
            <Route path="/login" exact component={LoginPage}/>
            <ProtectedRoute path="/" exact component={Home}/>
            <Redirect to="/"/>
          </Switch>
        </Container>
      </BrowserRouter>
    </Authenticator>
  );
}

export default App;
