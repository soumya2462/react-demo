import React, { ReactChild, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStyles, Drawer, Grid, Hidden, makeStyles, Theme } from '@material-ui/core';
import { RootState } from '../../store';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
import { FunctionComponent } from 'react';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
  },
  sideMenu: {
    width: '250px',
    flexShrink: 0,
  },
  nav: {
    height: '50px',
  },
  navHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  content: {
    padding: '0 30px 0 30px',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    minHeight: '10%',
  },
  logoImg: {
    width: '80%',
  },
}));

type LayoutProps = {
  children: ReactChild
};
  
const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const [mobileSideMenuOpen, setMobileSideMenuOpen] = useState(false);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const classes = useStyles();

  const handleSideMenuToggle = () => {
    setMobileSideMenuOpen(!mobileSideMenuOpen);
  };

  return (
    <div data-test="component-layout">
      <Grid
        container
        direction="column"
        className={classes.root}
      >
      { isLoggedIn ?
        <nav className={`${classes.nav} ${classes.navHide}`} data-test="navbar-logged-in">
          <Navbar isLoggedIn={true} handleSideMenuToggle={handleSideMenuToggle} />
        </nav>
      :
        <nav className={classes.nav} data-test="navbar">
          <Navbar isLoggedIn={false} />
        </nav>
      }
        <div className={classes.root}>
        { isLoggedIn ?
          <div data-test="drawer">
            <Hidden mdUp>
              <Drawer
                variant="persistent"
                anchor="left"
                open={mobileSideMenuOpen}
                onClose={handleSideMenuToggle}
                classes={{
                  paper: classes.sideMenu
                }}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                <SideMenu>
                  <div className={classes.header} />
                </SideMenu>
              </Drawer>
            </Hidden>
            <Hidden smDown>
              <nav className={classes.sideMenu}>
                <Drawer
                  variant="permanent"
                  open
                  classes={{
                    paper: classes.sideMenu,
                  }}
                > 
                  <SideMenu>
                    <Grid
                      container
                      justify="space-evenly"
                      alignItems="center"
                      className={classes.header}
                    >
                      <Link to="/" className={classes.logoImg}>
                        <img src="/images/INSTANDA-logo-tm-RGB-vector-white.svg" alt="home-img" />
                      </Link>
                    </Grid>
                  </SideMenu>
                </Drawer>
              </nav>
            </Hidden>
          </div>
        : null
        }
          <main className={classes.content}>
            { children }
          </main>
        </div>
      </Grid>
    </div>
  );
};

export default Layout;