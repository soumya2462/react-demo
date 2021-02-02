import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  withStyles,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

const useStyles = () => ({
  appbar: {
    backgroundColor: 'rgb(13, 37, 58)',
    boxShadow: 'none',
    borderBottom: '1px solid white',
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
    backgroundColor: 'rgb(249, 251, 253)',
    color: 'rgb(40, 62, 89)',
    padding: '2px 8px 2px 8px',
    height: '26px',
    minWidth: '11px',
    width: '27px',
    '&:hover': {
      backgroundColor: 'rgb(233, 239, 248)',
    },
  },
  menuIcon: {
    height: '13px',
    minWidth: '11px',
    width: '11px',
    padding: 0,
  },
});

type DependentProps =
  | { isLoggedIn: false; handleSideMenuToggle?: never, }
  | { isLoggedIn: true; handleSideMenuToggle: React.MouseEventHandler<HTMLButtonElement>, }

type NavbarProps = DependentProps & {
  classes: {
    appbar: string,
    toolbar: string,
    logo: string,
    logoLink: string,
    menuButton: string,
    menuIcon: string,
  },
};

const Navbar: FunctionComponent<NavbarProps> = ({isLoggedIn, handleSideMenuToggle, classes}) => (
  <AppBar position="fixed" className={classes.appbar}>
    <Toolbar classes={{root: classes.toolbar}}>
      <Link to="/" className={classes.logoLink}>
        <img
          src="/INSTANDA-logo-tm-RGB-vector-white.svg"
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
        >
          <MenuIcon fontSize="small" />
        </Button>
      : null
      }
    </Toolbar>
  </AppBar>
);

export default withStyles(useStyles)(Navbar);