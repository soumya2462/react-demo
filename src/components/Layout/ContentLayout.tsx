import React, { FunctionComponent, ReactChild } from 'react';
import { Box, Divider, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  header: {
    paddingTop: "1.5rem",
    paddingBottom: "1.5rem",
  },
  children: {
    flexGrow: 1,
    paddingTop: "1.5rem",
  },
}));

type ContentLayoutProps = {
  children: ReactChild,
  title: string,
};

const ContentLayout: FunctionComponent<ContentLayoutProps> = props => {
  const {
    children,
    title
  } = props;
  const classes = useStyles();

  return (
    <div data-test="component-content-layout">
      <div className={classes.header}>
        <Typography
          align="left"
          variant="h5"
        >
          <Box fontWeight={420} data-test="title">
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

export default ContentLayout;