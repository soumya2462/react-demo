import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { Layout } from '../components/Layout';
import LoggedInRoutes from './LoggedInRoutes';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';

const Routes = () => {
  
  return (
    <Router>
      <Layout>
      
          <Switch>
            <Route exact path="/" component={Home} />
            <Redirect from="*" to="/" />
          </Switch>
        
      </Layout>
    </Router>
  );
}

export default Routes;