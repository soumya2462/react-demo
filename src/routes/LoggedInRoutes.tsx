import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';


const LoggedInRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default LoggedInRoutes;
