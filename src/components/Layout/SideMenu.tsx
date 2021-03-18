import React, { Component, MouseEvent, ReactChild } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import axios from 'axios';
import qs from 'querystring';
import {
  List,
  Grid,
  Menu,
  MenuItem,
  withStyles,
} from '@material-ui/core';
import {
  Person,
  CloudUpload,
  Notifications,
  HomeOutlined,
  AccessibleForwardOutlined
} from '@material-ui/icons';
import { RootState } from '../../store';
import { logOff } from '../../ducks/Auth';
import SideMenuListItemLink from './SideMenuListItemLink';
import SideMenuIconButton from './SideMenuIconButton';

const useStyles = () => ({
  sideMenu: {
    backgroundColor: 'rgb(13, 37, 58)',
    height: '100vh',
    color: 'rgb(95, 122, 142)',
    paddingTop: '12px',
  },
  footer: {
    width: '100%',
    height: '10%',
    borderTop: '1px solid white',
  },
  profileMenu: {
    padding: '5px 0px 5px 0px',
  },
  contentRoot: {
    width: '100%',
    flexGrow: 1,
  },
});

const mapStateToProps = ({ auth }: RootState) => ({
  username: auth.username,
  accessToken: auth.accessToken,
  isLoggedIn: auth.isLoggedIn,
});

const mapDispatchToProps = ({
  logOff: () => logOff()
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type SideMenuProps = PropsFromRedux & {
  classes: {
    sideMenu: string,
    footer: string,
    profileMenu: string,
    contentRoot: string,
  },
  children?: ReactChild,
};

type SideMenuState = {
  profileAnchor: null | Element | ((element: Element) => Element),
};

class SideMenu extends Component<SideMenuProps, SideMenuState> {
  constructor(props: SideMenuProps) {
    super(props);

    this.state = {
      profileAnchor: null,
    };
  }

  handleMenu = (event: MouseEvent<HTMLElement>) => {
    this.setState({ ...this.state, profileAnchor: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ ...this.state, profileAnchor: null });
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
      headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': `Bearer ${accessToken}`},
      })
    .then(response => {
      //log off based on response. How can a non error response be invalid? Maybe only after 
      logOff();
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });
  };

  render() {
    const { classes } = this.props;
    const { profileAnchor } = this.state;
    const open = Boolean(profileAnchor);

    return (
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="flex-start"
        className={classes.sideMenu}
      >
        { this.props.children }
        <List className={classes.contentRoot} >
          <SideMenuListItemLink text="RichTextEditor" icon={<AccessibleForwardOutlined />} to="/editor/richtext" />
          <SideMenuListItemLink text="CssEditor" icon={<AccessibleForwardOutlined />} to="/editor/css" />
          <SideMenuListItemLink text="JsEditor" icon={<AccessibleForwardOutlined />} to="/editor/js" />
          <SideMenuListItemLink text="Parser" icon={<AccessibleForwardOutlined />} to="/editor/parser" />
        </List>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
          className={classes.footer}
        >
          <Menu
            PopoverClasses={{
              paper: classes.profileMenu
            }}
            anchorEl={profileAnchor}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={open}
            onClose={this.handleClose}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={this.handleLogoutButton}>Logout</MenuItem>
          </Menu>
          <SideMenuIconButton icon={<Person />} onClick={this.handleMenu} />
          <SideMenuIconButton icon={<CloudUpload />} onClick={()=>{}} />
          <SideMenuIconButton icon={<Notifications />} onClick={()=>{}} />
        </Grid>
      </Grid>
    );
  }
}

export default connector(withStyles(useStyles)(SideMenu));