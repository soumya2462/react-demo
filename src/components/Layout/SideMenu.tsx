import React, { FunctionComponent, MouseEvent, ReactChild, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'querystring';
import {
  List,
  Grid,
  Menu,
  MenuItem,
  makeStyles,
} from '@material-ui/core';
import {
  Person,
  CloudUpload,
  Notifications,
  AccessibleForwardOutlined
} from '@material-ui/icons';
import { RootState } from '../../store';
import { logOff } from '../../ducks/Auth';
import SideMenuListItemLink from './SideMenuListItemLink';
import SideMenuIconButton from './SideMenuIconButton';
import Color from '../../constants/Colors';

const useStyles = makeStyles(() => ({
  sideMenu: {
    backgroundColor: Color.DarkBlue,
    height: '100vh',
    color: 'rgb(95, 122, 142)',
    paddingTop: '12px',
  },
  footer: {
    width: '100%',
    height: '10%',
    borderTop: `1px solid ${Color.White}`,
  },
  profileMenu: {
    padding: '5px 0px 5px 0px',
  },
  contentRoot: {
    width: '100%',
    flexGrow: 1,
  },
}));

type SideMenuProps = {
  children?: ReactChild,
};

const SideMenu: FunctionComponent<SideMenuProps> = props => {
  const [profileAnchor, setProfileAnchor]: any = useState();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const classes = useStyles();
  const dispatch = useDispatch();
  const open = Boolean(profileAnchor);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setProfileAnchor(null);
  };

  const handleLogoutButton = () => {
    handleClose();

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
      dispatch(logOff());
    },
    (error) => {
      console.log(error);
      // alert with error message
      // which error message might also need for logOff()?
    });
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="flex-start"
      className={classes.sideMenu}
      data-test="component-side-menu"
    >
      { props.children }
      <List className={classes.contentRoot} data-test="link-list">
        <SideMenuListItemLink text="Rich Text Editor" icon={<AccessibleForwardOutlined />} to="/editor/richtext" />
        <SideMenuListItemLink text="Css Editor" icon={<AccessibleForwardOutlined />} to="/editor/css" />
        <SideMenuListItemLink text="Js Editor" icon={<AccessibleForwardOutlined />} to="/editor/js" />
        <SideMenuListItemLink text="Parser" icon={<AccessibleForwardOutlined />} to="/editor/parser" />
        <SideMenuListItemLink text="Drag And Drop" icon={<AccessibleForwardOutlined />} to="/dragndrop" />
      </List>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
        className={classes.footer}
        data-test="bottom-icons"
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
          onClose={handleClose}
          data-test="popup-menu"
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem onClick={handleLogoutButton}>Logout</MenuItem>
        </Menu>
        <SideMenuIconButton icon={<Person />} onClick={handleMenu} data-test="person-icon" />
        <SideMenuIconButton icon={<CloudUpload />} onClick={()=>{}} />
        <SideMenuIconButton icon={<Notifications />} onClick={()=>{}} />
      </Grid>
    </Grid>
  );
}

export default SideMenu;