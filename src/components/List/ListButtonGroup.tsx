import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ActionButtonGroup, { ActionButtonGroupProps } from './ActionButtonGroup';
import Color from '../../constants/colors';

const useStyles = makeStyles(() => ({
  btnGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 0,
  },
  btn: {
    padding: '2px 8px',
    fontSize: '13px',
    fontWeight: 400,
    width: 'auto',
    minWidth: '20px',
    marginLeft: '4px',
    marginRight: '4px',
  },
  editBtn: {
    backgroundColor: Color.LightGray,
  },
}));

export type ListButtonGroupProps = ActionButtonGroupProps & {
  onDeleteClick: () => void,
  onEditClick: () => void,
};

const ListButtonGroup = (props: ListButtonGroupProps) => {
  const { onEditClick, onDeleteClick } = props;
  const classes = useStyles();
  
  return(
    <div className={classes.btnGroup} data-test="component-list-button-group">
      <Button
        data-test="btn-group-edit"
        className={`${classes.btn} ${classes.editBtn}`}
        variant="contained"
        size="small"
        disableElevation
        onClick={onEditClick}
      >
        Edit
      </Button>
      <ActionButtonGroup
        btnClass={classes.btn}
        actionButtons={props.actionButtons} />
      <Button
        data-test="btn-group-delete"
        className={classes.btn}
        variant="outlined"
        color="secondary"
        size="small"
        onClick={onDeleteClick}
      >
        Delete
      </Button>
    </div>
  );
};

export default ListButtonGroup;