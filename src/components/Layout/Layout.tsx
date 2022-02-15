import React, { ReactChild, useState } from 'react';

import { createStyles, Drawer, Grid, Hidden, makeStyles, Theme } from '@material-ui/core';

import Navbar from './Navbar';

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
  
const Layout = ({ children }: LayoutProps) => {
  const [mobileSideMenuOpen, setMobileSideMenuOpen] = useState(false);
 // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
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
     
        <nav className={classes.nav} data-test="navbar">
          <Navbar isLoggedIn={false} />
        </nav>
      
        <div className={classes.root}>
       
          <main className={classes.content}>
            { children }
          </main>
        </div>
      </Grid>
    </div>
  );
};

export default Layout;