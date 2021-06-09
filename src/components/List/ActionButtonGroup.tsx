import React, { useState, MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
  Box,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles({
  multipleActionsBtn: {
    paddingRight: '0px',
  },
});

export type ActionButtonGroupType = Array<{
  actionName: string,
  actionUrl: string,
}>;

export type ActionButtonGroupProps = {
  actionButtons?: ActionButtonGroupType,
  btnClass?: string,
};

const ActionButtonGroup = ({ actionButtons, btnClass }: ActionButtonGroupProps) => {
  const [actionAnchor, setActionAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(actionAnchor);
  const history = useHistory();
  const classes = useStyles();
  
  if (actionButtons === undefined || actionButtons.length === 0){
    return null;
  };

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    setActionAnchor(event.currentTarget);
  };
  
  const closeMenu = () => {
    setActionAnchor(null);
  };
  

  return(
    <Box data-test="component-action-button-group">
      { actionButtons.length === 1 ?
        <Button
          data-test="single-action-btn"
          className={btnClass}
          variant="outlined"
          onClick={() => history.push(actionButtons[0].actionUrl) }>
          {actionButtons[0].actionName}
        </Button>
      : 
      <div>
        <Button
          data-test="multiple-action-btn"
          className={`${classes.multipleActionsBtn} ${btnClass}`}
          variant="outlined"
          onClick={openMenu}
        >
          Actions&nbsp;
          <ExpandMoreIcon />
        </Button>
        <Menu
          anchorEl={actionAnchor}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "left" }}
          open={open}
          onClose={closeMenu}
        >
          { actionButtons.map((btn, index) =>
            <MenuItem
              data-test="action-btn-menu-item"
              key={index}
              onClick={() => history.push(btn.actionUrl)}
            >
              {btn.actionName}
            </MenuItem>
          )}
        </Menu>
      </div>
      }
    </Box>
  );
};

export default ActionButtonGroup;