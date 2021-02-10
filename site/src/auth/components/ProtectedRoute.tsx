import { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context';

export default function ProtectedRoute({ children, ...rest }: PropsWithChildren<RouteProps>) {
  const { pathname, search } = useLocation();
  const { isAuthenticated } = useAuthContext();
  return (
    <Route {...rest}>
      {isAuthenticated ?
        children :
        <Redirect to={`/login?redirect=${encodeURIComponent(`${pathname}${search}`)}`}/>}
    </Route>
  );
}
