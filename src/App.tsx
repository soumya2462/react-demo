import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { create } from "jss";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import ComponentExample from "./components/ComponentExample/ComponentExample";
import Login from "./components/Login/Login";

const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: document.getElementById("jss-insertion-point")!,
});

function App() {
  return (
    <StylesProvider jss={jss}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={ComponentExample} />
        </Switch>
      </Router>
    </StylesProvider>
  );
}

export default App;
