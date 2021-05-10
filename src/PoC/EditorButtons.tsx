import React, { Component } from 'react';
import { Button, Divider, Grid, Theme, withStyles } from '@material-ui/core';

const useStyles = (theme: Theme) => ({
  buttonGroup: {
    paddingTop: "1.5rem",
  },
});

type EditorButtonsState = {};

type EditorButtonsProps = {
  classes: {
    buttonGroup: string,
  },
  saveClick: React.MouseEventHandler<HTMLButtonElement>,
  cancelClick: React.MouseEventHandler<HTMLButtonElement>,
  defaultClick: React.MouseEventHandler<HTMLButtonElement>,
};

class EditorButtons extends Component<EditorButtonsProps, EditorButtonsState> {
  constructor(props: EditorButtonsProps) {
    super(props);

    this.state = {};
  }
  
  render() {
    const {
      classes,
      saveClick,
      cancelClick,
      defaultClick,
    } = this.props;

    return (
      <div className={classes.buttonGroup}>
        <Grid container>
          <Grid item xs={8}>
            <Grid container spacing={2} justify="flex-start">
              <Grid item md={2} xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  onClick={saveClick}
                  >
                  Save
                </Button>
              </Grid>
              <Grid item md={2} xs={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  fullWidth
                  onClick={cancelClick}
                  >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="flex-end">
              <Button
                variant="outlined"
                color="default"
                disableElevation
                onClick={defaultClick}
              >
                Restore Default
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };
};

export default withStyles(useStyles)(EditorButtons);