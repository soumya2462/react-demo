import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
import {
  IconButton,
  Typography,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AccountCircle, Menu as MenuIcon } from "@material-ui/icons";
import axios from "axios";
import qs from "querystring";
//import "./index.css";
import { logOff } from "../../ducks/Auth"
import { Link } from "react-router-dom";
import { inherits } from "util";

interface NavbarProps {
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  children: any;
  logOff: () => void;
}

type NavbarState = {
  anchorEl: any;
};

class Navbar extends Component<NavbarProps, NavbarState> {
  constructor(props: NavbarProps) {
    super(props);

    this.state = {
      anchorEl: null,
    };
  }

  handleMenu = (event: any) => {
    this.setState({ ...this.state, anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ ...this.state, anchorEl: null });
  };

  handleLogoutButton = () => {
    this.handleClose();

    const { accessToken, logOff } = this.props;

    const body = {
      client_id: 'design_ui',
      client_secret: 'secret',
      token: accessToken,
      token_type_hint: 'access_token',
    };

    axios({
      method: 'post',
      url: 'http://localhost:10080/connect/revocation',
      data: qs.stringify(body),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${accessToken}` },
      })
    .then(response => {
      console.log(response);
      logOff();
    },
    (error) => {
      console.log(error);
      // alert with error message
    });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Link to={"/"}>
              <img src={`${process.env.PUBLIC_URL}/favicon.ico`} style={{ maxHeight: "20px" }} /> { /* change to instanda image, change inline style accordingly */}
            </Link>
            {
              this.props.isLoggedIn ?
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem >Profile</MenuItem>
                    <MenuItem onClick={this.handleLogoutButton}>Logout</MenuItem>
                  </Menu>
                </div>
              : null
            }
            
          </Toolbar>
        </AppBar>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    username: state.auth.username,
    accessToken: state.auth.accessToken,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    logOff: () => {
      return dispatch(logOff());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
