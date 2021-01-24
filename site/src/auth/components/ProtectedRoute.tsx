import { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useAuth } from '../context';

export default function ProtectedRoute({ children, ...rest }: PropsWithChildren<RouteProps>) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuth();
  return (
    <Route {...rest}>
      {isAuthenticated ?
        children :
        <Redirect to={`/login?redirect=${pathname}${search}`}/>}
    </Route>
  );
}
