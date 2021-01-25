import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import "./index.css";

interface NavbarProps {
  isLoggedIn: boolean;
}

class Navbar extends Component<NavbarProps> {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <AppBar position="static" id="appbar">
        <Toolbar
          >
          <Link to="/" >
            <img src={'/INSTANDA-logo-tm-RGB-vector-white.svg'} alt="home-img" id="appbar-img" />
          </Link>
          {
            isLoggedIn ?
              <IconButton
                color="inherit"
                aria-label="open drawer"
                //onClick={handleDrawerToggle} //to be passed as props [to open temp drawer in side menu]
                //className={classes.menuButton} // change shape, change background color to white, change MenuIcon to have same color as appbar
              >
                <MenuIcon />
              </IconButton>
            : null
          }
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;

//rgb(13, 37, 58);