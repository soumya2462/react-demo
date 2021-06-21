import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home/Home';
import PackageList from '../pages/Packages/PackageList';
import CreatePackage from '../pages/Packages/CreatePackage';
import EditPackage from '../pages/Packages/EditPackage';
import CreateSite from '../pages/Sites/CreateSite';
import EditSite from '../pages/Sites/EditSite';

import RichTextEditorPoC from '../PoC/RichTextEditorPoC';
import CssJsEditorPoC from '../PoC/CssJsEditorPoC';
import ParserPoC from '../PoC/ParserPoC';
import DragAndDropPoC from '../PoC/DnDPoc/DragAndDropPoC';

const LoggedInRoutes = () => {
  return(
    <Switch>
      <Route path="/packages/create" component={CreatePackage} />
      <Route path="/packages/:packageid" component={EditPackage} />
      <Route path="/packages" component={PackageList} />
      <Route path="/sites/create" component={CreateSite} />
      <Route path="/sites/:siteid" component={EditSite} />

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
      <Route
        path="/dragndrop"
        render={(props) => (
          <DragAndDropPoC {...props}
            title="Drag And Drop" />
        )} />
        
      <Route exact path="/" component={Home} />
      <Redirect from="*" to="/" />
    </Switch>
  );
};

export default LoggedInRoutes;