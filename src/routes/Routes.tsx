import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { RootState } from '../store';
import { Layout } from '../components/Layout';
import LoggedInRoutes from './LoggedInRoutes';
import Login from '../pages/Login/Login';

const Routes = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  
  return (
    <Router>
      <Layout>
        { isLoggedIn ?
          <LoggedInRoutes />
        :
          <Switch>
            <Route exact path="/" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        }
      </Layout>
    </Router>
  );
}

export default Routes;