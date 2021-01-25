import React, { Component, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import qs from "querystring";
import {
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Grid,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  Person,
  CloudUpload,
  Notifications,
  NavigateNext,
  HomeOutlined,
  AccessibleForwardOutlined
} from "@material-ui/icons";
import { logOff } from "../../ducks/Auth";
import "./index.css";

interface SideMenuProps {
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  logOff: () => void;
}

type SideMenuState = {
  anchorEl: null | Element | ((element: Element) => Element)
};

type MyListItemProps = {
  text: string,
  icon: any,
  to: string,
}

type MyIconButtonProps = {
  icon: any,
  onClick?: any,
}

const MyListItemLink: FunctionComponent<MyListItemProps> = ({text, icon, to}) => {  
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement>((linkProps, ref) => 
        <Link ref={ref} to={to} {...linkProps} />
      ),
    [to],
  );
  
  return(
    <ListItem
      button
      component={CustomLink}
      disableRipple={true}
      classes={{
        button: "side-menu-buttons"
      }}
    >
      {icon}
      <ListItemText primary={text} />
      <NavigateNext />
    </ListItem>
  );
}

const MyIconButton: FunctionComponent<MyIconButtonProps> = ({icon, onClick}) => {
  return(
    <IconButton
      color="inherit"
      aria-label="open drawer"
      disableRipple={true}
      onClick={onClick}
      className="side-menu-buttons" >
      {icon}
    </IconButton>
  );
}

class SideMenu extends Component<SideMenuProps, SideMenuState> {
  constructor(props: SideMenuProps) {
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
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      token: accessToken,
      token_type_hint: 'access_token',
    };

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_AUTHENTICATION_URL}/connect/revocation`,
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
      <Drawer
        variant="permanent"
        open
        classes={{
          paper: "side-menu-root"
        }}
      >
        <Grid
          container
          direction="column"
          justify="space-between"
          alignItems="flex-start"
          className="side-menu"
        >
          <Grid
            container
            justify="space-evenly"
            alignItems="center"
            id="side-menu-header">
          <Link to="/" className="logo-img">
            <img src={'/INSTANDA-logo-tm-RGB-vector-white.svg'} alt="home-img" />
          </Link>
          </Grid>
          <List className="content-root" >
            <MyListItemLink text="Home" icon={<HomeOutlined /> } to="/home" />
            <MyListItemLink text="Banana" icon={<AccessibleForwardOutlined />} to="/banana" />
          </List>
          <Grid
            container
            direction="row"
            justify="space-evenly"
            alignItems="center"
            id="side-menu-footer"
          >
            <Menu
              id="profile-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <MenuItem >Profile</MenuItem>
              <MenuItem onClick={this.handleLogoutButton}>Logout</MenuItem>
            </Menu>
            <MyIconButton icon={<Person />} onClick={this.handleMenu} />
            <MyIconButton icon={<CloudUpload />} />
            <MyIconButton icon={<Notifications />} />
          </Grid>
        </Grid>
      </Drawer>
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

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);