import React, { Component } from "react";
import {
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Theme, withStyles } from "@material-ui/core/styles";
import { AccountCircleOutlined, LockOpenOutlined } from "@material-ui/icons";
import SharedComponentExample from "./../shared/SharedComponentExample/SharedComponentExample";
import {
  showError,
  setUsername,
  setPassword,
  logOn,
} from "../../ducks/componentExample";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

interface IComponentExample extends RouteComponentProps {
  showError: () => void;
  hideError: () => void;
  setPassword: (value: string) => void;
  setUsername: (value: string) => void;
  logOn: () => void;
  error: boolean;
  username: string;
  password: string;
  isLoggedIn: boolean;
  classes: {
    text: string;
    title: string;
    container: string;
    innerContainer: string;
  };
}

const useStyles = (theme: Theme) => ({
  text: {
    fontSize: "0.8rem !important",
    color: "#585956",
  },
  title: {
    color: "#0d253a",
  },
  innerContainer: {
    padding: theme.spacing(2),
    backgroundColor: "white",
    borderRadius: "10px",
  },
  container: {
    minHeight: "80vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

class ComponentExample extends Component<IComponentExample> {
  handleClick = () => {
    this.props.hideError();

    if (this.props.username === "test") {
      this.props.history.push("/home");
    }
    
    if(this.props.username === "invalid"){
      this.props.showError();
    }
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setPassword(e.target.value);
  };

  handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setUsername(e.target.value);
  };

  render() {
    const classes = this.props.classes;

    return (
      <Grid container className={classes.container}>
        <Container className={classes.innerContainer} maxWidth="xs">
          <Grid container spacing={3} justify="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h5" className={classes.title}>
                Sign In
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="caption">
                You are testing the Test release
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="User Name"
                    name="username"
                    variant="outlined"
                    placeholder="User Name"
                    onChange={this.handleUsernameChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    placeholder="Enter your password"
                    onChange={this.handlePasswordChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOpenOutlined />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <FormControlLabel
                    control={<Checkbox color="default" />}
                    label="Remember me?"
                  />
                </Grid>
                <div className={classes.text}>
                  This site is provided solely for clients and staff of F2X
                  Group Limited. All authentication attempts are subject to
                  monitoring. It is an offence for any other third party or
                  commercial organisation to continue without prior express
                  written consent from F2X Group Limited.
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="middle" light />
            </Grid>
            <Grid item xs={12}>
              {this.props.error ? (
                <Alert severity="error">
                  The account does exist or values are incorrect
                </Alert>
              ) : (
                undefined
              )}
            </Grid>
            <Grid item xs={12}>
              <SharedComponentExample
                text="Sign In"
                onClick={this.handleClick}
              />
            </Grid>
          </Grid>
        </Container>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    username: state.componentExample.username,
    password: state.componentExample.password,
    error: state.componentExample.error,
    isLoggedIn: state.componentExample.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    showError: () => {
      return dispatch(showError(true));
    },
    hideError: () => {
      return dispatch(showError(false));
    },
    setUsername: (username: string) => {
      return dispatch(setUsername(username));
    },
    setPassword: (password: string) => {
      return dispatch(setPassword(password));
    },
    logOn: () => {
      return dispatch(logOn());
    },
  };
}

export default withStyles(useStyles)(
  connect(mapStateToProps, mapDispatchToProps)(ComponentExample)
);
