import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from './store';
import Theme from './MuiTheme';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import RichTextEditorPoC from './components/PoC/RichTextEditorPoC';
import CssJsEditorPoC from './components/PoC/CssJsEditorPoC';
import ParserPoC from './components/PoC/ParserPoC';

const mapStateToProps = ({ auth }: RootState) => ({
  isLoggedIn: auth.isLoggedIn,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Banana = () => (<img src="/banana.gif" alt="image" />);

class App extends Component<PropsFromRedux>{
  render(){
    return (
      <ThemeProvider theme={Theme}>
        <Router>
          <Layout>
            { this.props.isLoggedIn ?
              <Switch>
                <Route path="/login" component={Login} />
                <Route path="/banana" component={Banana} />
                <Route path="/editor/richtext" component={RichTextEditorPoC} />
                <Route
                  path="/editor/css"
                  render={(props) => (
                    <CssJsEditorPoC {...props}
                      //templateId="c2a95458-c0af-443e-86db-a5fe3678e192"
                      templateId="55e8d45f-ccaa-41b7-bdcc-245f816c8193"
                      title="Css Editor" />
                  )} />
                <Route
                  path="/editor/js"
                  render={(props) => (
                    <CssJsEditorPoC {...props}
                      //templateId="926b54e3-1817-4638-8564-904ec9456c42"
                      templateId="b9938dd0-2d7a-48ff-b8e4-494a343400e2"
                      title="Js Editor" />
                  )} />
                <Route path="/editor/parser" component={ParserPoC} />
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
      </ThemeProvider>
    );
  }
}

export default connector(App);