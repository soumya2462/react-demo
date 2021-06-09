import React, { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  IconProps,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';
import Color, { addAlpha } from '../../constants/colors';

const useStyles = makeStyles(() => ({
  button: {
    color: addAlpha(Color.White, 0.6),
    '&:hover': {
      color: Color.White,
    },
  },
  text: {
    margin: 0,
  },
}));

type SideMenuListItemLinkProps = {
  text: string,
  icon: IconProps,
  to: string,
};

const SideMenuListItemLink = ({ text, icon, to }: SideMenuListItemLinkProps) => {
  const classes = useStyles();
  const CustomLink = useMemo(
    () =>
      forwardRef<HTMLAnchorElement>((linkProps, ref) => 
        <Link ref={ref} to={to} {...linkProps} />
      ),
    [to],
  );
  
  return(
    <ListItem
      button
      component={CustomLink}
      disableRipple={true}
      classes={{
        button: classes.button,
      }}
      data-test="component-side-menu-list-item-link"
    >
      {icon}
      <ListItemText
        primary={text}
        classes={{
          root: classes.text,
        }}
        data-test="item-link-text"
      />
      <NavigateNext data-test="item-link-right-arrow" />
    </ListItem>
  );
};

export default SideMenuListItemLink;