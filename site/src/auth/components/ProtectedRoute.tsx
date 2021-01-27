import { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useAuthSession } from '../context';

export default function ProtectedRoute({ children, ...rest }: PropsWithChildren<RouteProps>) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuthSession();
  return (
    <Route {...rest}>
      {isAuthenticated ?
        children :
        <Redirect to={`/login?redirect=${pathname}${search}`}/>}
    </Route>
  );
}
