import React, { Component } from 'react';
import { Box, Button, Chip, makeStyles, TextField, Theme, withStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

type StyleProps = {
  chipBackgroundColor: string, //change to color constants
  chipBorderColor: string, //change to color constants
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  root: {
    display: 'flex',
    padding: '0 0 10px 0',
  },
  title: {
    flexShrink: 0,
    height: 'auto',
    paddingRight: '10px',
  },
  button: {
    color: 'black',
    height: '100%',
    width: '120px',
  },
  input: {
    flexGrow: 1,
    height: 'auto',
  },
  autocompleteInput: {
    padding: '8px 12px 8px 12px',
    minHeight: '26px',
    height: 'auto',
  },
  inputRoot: {
    padding: 0,
    border: 'none',
    borderRadius: 0,
    borderBottomRightRadius: 0,
  },
  textFieldRoot: {
    border: 'none',
  },
  chipRoot: {
    height: '24px',
    marginRight: '4px',
    borderRadius: '4px',
    backgroundColor: props => props.chipBackgroundColor,
    color: 'rgb(255, 255, 255)',
    borderColor: props => props.chipBorderColor,
    '&:hover': {
      backgroundColor: props => props.chipBackgroundColor,
    },
  },
}));

type VariableDropdownProps = StyleProps & {
  variableList: Array<string>,
  id: string,
  title: string,
  placeholder: string,
};

function VariableDropdown(props: VariableDropdownProps) {

  const handleButtonClick = (event: any) => {
    console.log(`You clicked ${event.target.innerText}`);
  };

  const handleVariableClick = (event: any) => {
    //insert into editor: event.target.innerText
  };

  const {
    variableList,
    id,
    title,
    placeholder,
    chipBackgroundColor,
    chipBorderColor,
  } = props;

  const classes = useStyles({ chipBackgroundColor, chipBorderColor });

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>
        <Button
          variant="contained"
          disableElevation
          //onClick={handleButtonClick}
          className={classes.button}
        >
          {title}
        </Button>
      </Box>
      <Box className={classes.input}>
        <Autocomplete
          multiple
          disableClearable
          autoComplete
          id={id}
          options={variableList}
          filterSelectedOptions
          ChipProps={{ onClick: handleVariableClick, className: classes.chipRoot }}
          ListboxProps={{ onClick: handleVariableClick }}
          //noOptionsText
          classes={{ input: classes.autocompleteInput, inputRoot: classes.inputRoot }}
          renderInput={(params) => {
            params.InputProps = {...params.InputProps, ...{ endAdornment: undefined, className: 'VariableDropdown-inputRoot-60' }};
            //params.inputProps = {...params.inputProps, ...{ className: '' }};
            //console.log(params.InputProps);
            return(
            <TextField
              {...params}
              variant="outlined"
              placeholder={placeholder}
              classes={{ root: classes.textFieldRoot}}
            />
          )}} />
      </Box>
    </Box>
  );
};

export default VariableDropdown;