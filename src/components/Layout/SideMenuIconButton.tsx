import React, { FunctionComponent } from 'react';
import {
  IconButton,
  IconProps,
  makeStyles,
} from '@material-ui/core';
import Color, { addAlpha } from '../../constants/Colors';

const useStyles = makeStyles(() => ({
  button: {
    color: addAlpha(Color.White, 0.4),
    '&:hover': {
      color: addAlpha(Color.White, 0.7),
    },
  },
}));

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
      data-test="component-side-menu-icon-button"
    >
      {icon}
    </IconButton>
  );
};

export default SideMenuIconButton;