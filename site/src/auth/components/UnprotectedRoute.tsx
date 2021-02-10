import { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../context';

export default function UnprotectedRoute({ children, ...rest }: PropsWithChildren<RouteProps>) {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route {...rest}>
      {isAuthenticated ?
        <Redirect to="/"/> :
        children
      }
    </Route>
  );
}
