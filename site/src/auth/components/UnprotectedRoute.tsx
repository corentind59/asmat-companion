import { PropsWithChildren } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthSession } from '../context';

export default function UnprotectedRoute({ children, ...rest }: PropsWithChildren<RouteProps>) {
  const { isAuthenticated } = useAuthSession();
  return (
    <Route {...rest}>
      {isAuthenticated ?
        <Redirect to="/"/> :
        children
      }
    </Route>
  );
}
