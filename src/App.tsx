import { Component } from "react";
import { connect } from "react-redux";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
//import ComponentExample from "./components/ComponentExample/ComponentExample";

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

const Home = () => { return(<img src="https://media.tenor.com/images/81fa2ba3412aa97cb37deaa4b18b024f/tenor.gif" />); }

class App extends Component<{ isLoggedIn: boolean }>{
  render(){
    return (
      <StylesProvider jss={jss}>
        <Router>
          { this.props.isLoggedIn ?
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Home} />
            </Switch>
          :
            <Switch>
              <Route exact path="/" component={Login} />
              <Redirect from="*" to="/" />
            </Switch>
          }
        </Router>
      </StylesProvider>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.login.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);