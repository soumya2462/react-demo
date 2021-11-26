import React, { ReactElement } from 'react';
import { ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core';
import Color from '../../constants/colors';
import ListButtonGroup from './ListButtonGroup';

const useStyles = makeStyles({
  row: {
    padding: '8px 16px',
    borderBottom: `1px solid ${Color.LightGray}`,
  },
  name: {
    '&:hover': {
      color: Color.LightBlue,
      cursor: 'pointer',
    },
    fontWeight: 500,
  },
  middleCols: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    color: Color.Gray,
  },
  textRoot: {
    flexGrow: 0,
    width: '15%',
    overflowWrap: 'break-word',
  },
  col: {
    flexGrow: 0,
  },
});

export type RowProps = {
  id: string;
  name: string;
  columns: Array<string>;
};

export type ListRowProps = {
  data: RowProps;
  icon?: ReactElement;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

const ListRow = (props: ListRowProps) => {
  const { icon, data, onEditClick, onDeleteClick } = props;
  const classes = useStyles();

  return (
    <ListItem className={classes.row} data-test="component-list-row" divider>
      {icon && <ListItemIcon data-test="list-row-icon">{icon}</ListItemIcon>}
      <ListItemText
        data-test="list-row-name"
        primaryTypographyProps={{
          variant: 'body1',
          className: `${classes.name}`,
        }}
        classes={{ root: classes.textRoot }}
        onClick={onEditClick}
      >
        {data.name}
      </ListItemText>
      <div className={classes.middleCols}>
        {data.columns.map((col, index) => (
          <ListItemText
            data-test="list-row-map-column"
            primaryTypographyProps={{ variant: 'body2' }}
            key={index}
            className={classes.col}
          >
            {col}
          </ListItemText>
        ))}
      </div>
      <div>{onEditClick && <ListButtonGroup onEditClick={onEditClick} onDeleteClick={onDeleteClick} />}</div>
    </ListItem>
  );
};

export default ListRow;
