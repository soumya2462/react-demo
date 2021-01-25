import React, { Component } from "react";
import { connect } from "react-redux";
import SideMenu from "./SideMenu";
import Navbar from "./Navbar";
import "./index.css";
import { Grid } from "@material-ui/core";

interface LayoutProps {
  isLoggedIn: boolean;
  children: any;
}
  
type LayoutState = {};
  
class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {};
  }

  render() {
    const { children, isLoggedIn } = this.props;

    return (
      <Grid
        direction={isLoggedIn ? "row" : "column"}
        id="layout"
      >
          { isLoggedIn ?
            <nav className="side-menu-root">
              <SideMenu />
            </nav>
          :
            <nav>
              <Navbar isLoggedIn={false} />
            </nav>
          }
        <main className="content-root content">
          { children }
        </main>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Layout);