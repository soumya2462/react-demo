import React, { Component } from "react";
import { connect } from "react-redux";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
//import ComponentExample from "./components/ComponentExample/ComponentExample";

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

const Banana = () => { return(<img src="/banana.gif" alt="image" />); }

class App extends Component<{ isLoggedIn: boolean }>{
  render(){
    return (
      <StylesProvider jss={jss}>
        <Router>
          <Layout>
            { this.props.isLoggedIn ?
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/banana" component={Banana} />
                <Route exact path="/" component={Home} />
                <Redirect from="*" to="/" />
              </Switch>
            :
              <Switch>
                <Route exact path="/" component={Login} />
                <Redirect from="*" to="/" />
              </Switch>
            }
          </Layout>
        </Router>
      </StylesProvider>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);