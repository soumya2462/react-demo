import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import "./App.css";
import ComponentExample from "./components/ComponentExample/ComponentExample";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

const Home = () => <h1>Home Page</h1>;

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={ComponentExample} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
