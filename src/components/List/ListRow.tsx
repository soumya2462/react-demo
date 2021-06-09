import React, { ReactChild, ReactElement } from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import Color from '../../constants/colors';

const useStyles = makeStyles({
  row: {
    height: '56px',
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
    color: Color.Gray,
  },
  textRoot: {
    flexBasis: 0,
  }
});

export type RowProps = {
  id: string,
  name: string,
  columns: Array<string>,
};

export type ListRowProps = {
  data: RowProps,
  icon?: ReactElement,
  children?: ReactChild,
  onEditClick?: () => void,
};

const ListRow = (props: ListRowProps) => {
  const {
    icon,
    data,
    children,
    onEditClick,
  } = props;
  const classes = useStyles();
  
  return (
    <ListItem className={classes.row} data-test="component-list-row">
      { icon &&
        <ListItemIcon data-test="list-row-icon">
          {icon}
        </ListItemIcon>
      }
      <ListItemText
        data-test="list-row-name"
        primaryTypographyProps={{
          variant: "body1",
          className: `${classes.name}`
        }}
        classes={{ root: classes.textRoot}}
        onClick={onEditClick}
      >
        {data.name}
      </ListItemText>
      { data.columns.map((col, index) =>
        <ListItemText
          data-test="list-row-map-column"
          primaryTypographyProps={{ variant: "body2" }}
          className={classes.middleCols}
          key={index}
        >
          {col}
        </ListItemText>)
      }
      { children }
    </ListItem>
  );
};

export default ListRow;