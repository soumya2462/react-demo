import React, { Component, ReactChild } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { Drawer, Grid, Hidden, Theme } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RootState } from '../../store';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

const useStyles = (theme: Theme) => ({
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
    padding: '20px',
    flexGrow: 1,
  },
  header: {
    width: '100%',
    minHeight: '10%',
  },
  logoImg: {
    width: '80%',
  },
});

const mapStateToProps = ({ auth }: RootState) => ({
  isLoggedIn: auth.isLoggedIn,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type LayoutProps = PropsFromRedux & {
  children: ReactChild,
  classes: {
    root: string,
    sideMenu: string,
    nav: string,
    navHide: string,
    content: string,
    header: string,
    logoImg: string,
  },
};
  
type LayoutState = {
  mobileSideMenuOpen: boolean,
};
  
class Layout extends Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);

    this.state = {
      mobileSideMenuOpen: false,
    };
  };

  handleSideMenuToggle = () => {
    this.setState({ ...this.state, mobileSideMenuOpen: !this.state.mobileSideMenuOpen });
  };

  render() {
    const {
      children,
      classes,
      isLoggedIn,
    } = this.props;
    const { mobileSideMenuOpen } = this.state;

    return (
      <Grid
        container
        direction="column"
        className={classes.root}
      >
      { isLoggedIn ?
        <nav className={`${classes.nav} ${classes.navHide}`}>
          <Navbar isLoggedIn={true} handleSideMenuToggle={this.handleSideMenuToggle} />
        </nav>
      :
      <nav className={classes.nav}>
          <Navbar isLoggedIn={false} />
        </nav>
      }
        <div className={classes.root}>
        { isLoggedIn ?
          <div>
            <Hidden mdUp>
              <Drawer
                variant="persistent"
                anchor="left"
                open={mobileSideMenuOpen}
                onClose={this.handleSideMenuToggle}
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
                        <img src="/INSTANDA-logo-tm-RGB-vector-white.svg" alt="home-img" />
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
    );
  };
};

export default connector(withStyles(useStyles)(Layout));