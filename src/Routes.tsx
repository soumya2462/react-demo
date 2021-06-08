import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { RootState } from './store';
import { Layout } from './components/Layout';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import RichTextEditorPoC from './PoC/RichTextEditorPoC';
import CssJsEditorPoC from './PoC/CssJsEditorPoC';
import ParserPoC from './PoC/ParserPoC';
import DragAndDropPoC from './PoC/DnDPoc/DragAndDropPoC';
import CreatePackage from './pages/Packages/CreatePackage';
import EditPackage from './pages/Packages/EditPackage';

const mapStateToProps = ({ auth }: RootState) => ({
  isLoggedIn: auth.isLoggedIn,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Routes = (props: PropsFromRedux) => {
  return (
    <Router>
      <Layout>
        { props.isLoggedIn ?
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/editor/richtext" component={RichTextEditorPoC} />
            <Route
              path="/editor/css"
              render={(props) => (
                <CssJsEditorPoC {...props}
                  //templateId="c2a95458-c0af-443e-86db-a5fe3678e192"
                  templateId="55e8d45f-ccaa-41b7-bdcc-245f816c8193"
                  title="Css Editor" />
              )} />
            <Route path="/packages/create" component={CreatePackage} />
            <Route path="/packages/:id" component={EditPackage} />
            <Route
              path="/editor/js"
              render={(props) => (
                <CssJsEditorPoC {...props}
                  //templateId="926b54e3-1817-4638-8564-904ec9456c42"
                  templateId="b9938dd0-2d7a-48ff-b8e4-494a343400e2"
                  title="Js Editor" />
              )} />
            <Route path="/editor/parser" component={ParserPoC} />
            <Route
              path="/dragndrop"
              render={(props) => (
                <DragAndDropPoC {...props}
                  title="Drag And Drop" />
              )} />
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
  );
}

export default connector(Routes);