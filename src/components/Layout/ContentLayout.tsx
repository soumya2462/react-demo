import React, { Component, ReactChild } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Box, Divider, Grid, Theme, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { RootState } from '../../store';

const useStyles = (theme: Theme) => ({
  root: {
    
  },
  header: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  },
  children: {
    flexGrow: 1,
    paddingTop: "1.5rem",
  },
  title: {

  }
});

const mapStateToProps = ({}: RootState) => ({
  
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type ContentLayoutProps = PropsFromRedux & {
  children: ReactChild,
  classes: {
    root: string,
    header: string,
    children: string,
    title: string,
  },
  title: string,
};
  
type ContentLayoutState = {
  
};
  
class ContentLayout extends Component<ContentLayoutProps, ContentLayoutState> {
  constructor(props: ContentLayoutProps) {
    super(props);

    this.state = {
    
    };
  };

  render() {
    const {
      children,
      classes,
      title
    } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography
            align="left"
            variant="h5"
            className={classes.title}>
            <Box fontWeight={420}>
              {title}
            </Box>
          </Typography>
        </div>
        <Divider/>
        <div className={classes.children}>
          {children}
        </div>
      </div>
    );
  };
};

export default connector(withStyles(useStyles)(ContentLayout));