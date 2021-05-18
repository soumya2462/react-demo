import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import Color, { addAlpha } from '../../constants/Colors';

const useStyles = makeStyles(() => ({
  appbar: {
    backgroundColor: Color.DarkBlue,
    boxShadow: 'none',
    borderBottom: `1px solid ${Color.White}`,
  },
  toolbar: {
    height: '26px',
    minHeight: '26px',
    padding: '12px 16px 12px 16px',
    justifyContent: 'space-between',
  },
  logoLink: {
    height: '24px',
  },
  logo: {
    height: '100%',
  },
  menuButton: {
    backgroundColor: Color.White,
    color: Color.DarkBlue,
    padding: '2px 8px 2px 8px',
    height: '26px',
    minWidth: '11px',
    width: '27px',
    '&:hover': {
      backgroundColor: addAlpha(Color.White, 0.9),
    },
  },
  menuIcon: {
    height: '13px',
    minWidth: '11px',
    width: '11px',
    padding: 0,
  },
}));

type NavbarProps =
  | { isLoggedIn: false; handleSideMenuToggle?: never }
  | { isLoggedIn: true; handleSideMenuToggle: React.MouseEventHandler<HTMLButtonElement> }

const Navbar: FunctionComponent<NavbarProps> = ({isLoggedIn, handleSideMenuToggle}) => {
  const classes = useStyles();
  
  return (
  <AppBar
    position="fixed"
    className={classes.appbar}
    data-test="component-navbar"
  >
    <Toolbar classes={{root: classes.toolbar}}>
      <Link to="/" className={classes.logoLink} data-test="home-image" >
        <img
          src="/images/INSTANDA-logo-tm-RGB-vector-white.svg"
          alt="home-img"
          className={classes.logo} />
      </Link>
      { isLoggedIn ?
        <Button
          aria-label="open drawer"
          onClick={handleSideMenuToggle}
          classes={{
            root: classes.menuButton,
            label: classes.menuIcon,
          }}
          data-test="side-menu-toggle-btn"
        >
          <MenuIcon fontSize="small" />
        </Button>
      : null
      }
    </Toolbar>
  </AppBar>
  );
};

export default Navbar;