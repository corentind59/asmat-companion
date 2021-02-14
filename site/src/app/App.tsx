import { BrowserRouter, Switch } from 'react-router-dom';
import HomePage from '../home/views/HomePage';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from '../auth/views/LoginPage';
import ProtectedRoute from '../auth/components/ProtectedRoute';
import AuthProvider from '../auth/components/AuthProvider';
import UnprotectedRoute from '../auth/components/UnprotectedRoute';
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-toastify/dist/ReactToastify.min.css';
import MuiToastContainer from '../common/toast/MuiToastContainer';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <MuiToastContainer />
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Switch>
              <UnprotectedRoute path="/login" exact component={LoginPage}/>
              <ProtectedRoute path="/" component={HomePage}/>
            </Switch>
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </MuiThemeProvider>
  );
}

export default App;
