import React, { ReactChild } from 'react';
import { useHistory } from 'react-router';
import { Paper, makeStyles, Button, List as MaterialList, ListItem } from '@material-ui/core';

const useStyles = makeStyles({
  row: {
    padding: '14px 24px',
  },
  header: {
    justifyContent: 'flex-end',
  },
});

export type ListProps = {
  createLabel?: string;
  children: ReactChild;
};

const List = ({ createLabel, children }: ListProps) => {
  const classes = useStyles();
  const history = useHistory();

  const createItem = () => history.push(`${history.location.pathname}/create`);

  return (
    <MaterialList data-test="component-list" component={Paper} disablePadding>
      <ListItem className={`${classes.row} ${classes.header}`} divider>
        <span data-test="list-sort">Sort</span>
        {createLabel && (
          <Button data-test="list-create-btn" variant="contained" color="primary" size="small" onClick={createItem}>
            {createLabel}
          </Button>
        )}
      </ListItem>
      <ListItem className={classes.row} divider>
        <span data-test="list-search">Search</span>
      </ListItem>
      {children}
    </MaterialList>
  );
};

export default List;
