import React, { FunctionComponent } from 'react';
import {
  createStyles,
  IconButton,
  IconProps,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      color: 'rgb(95, 122, 142)',
      '&:hover': {
        color: 'rgb(149, 170, 201)',
      },
    },
  })
);

type SideMenuIconButtonProps = {
  icon: IconProps,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
};

const SideMenuIconButton: FunctionComponent<SideMenuIconButtonProps> = ({icon, onClick}) => {
  const classes = useStyles();

  return(
    <IconButton
      aria-label="open drawer"
      onClick={onClick}
      disableRipple={true}
      classes={{
        root: classes.button,
      }}
    >
      {icon}
    </IconButton>
  );
};

export default SideMenuIconButton;