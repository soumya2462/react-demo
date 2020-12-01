import React, { Component } from "react";
import {
  Container,
  Grid,
  TextField,
  Checkbox,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Button,
  Link,
  Typography,
  Divider,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import "./index.css";

interface LoginProps {
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  setUsername: (value: string) => void;
  setAccessToken: (value: string) => void;
  logOn: () => void;
  classes: {
    text: string;
    title: string;
    container: string;
    innerContainer: string;
    input: string;
  };
}

type LoginState = {
  showPassword: boolean;
  rememberMe: boolean;
};

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);

    this.state = {
      showPassword: false,
      rememberMe: false,
    };
  }

  handlePasswordVisibility = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleRememberCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, rememberMe: event.target.checked });
  };

  handleLoginButton = () => {
    console.log("login clicked, do stuff");
  };

  render() {
    const { showPassword, rememberMe } = this.state;

    return (
      <Container maxWidth="lg" className="container">
        <Grid container justify="center">
          <Grid item xs={12} sm={4} lg={5}>
            <Grid container direction="column" spacing={3}>
              <Grid container className="innerContainer" justify="center">
                <Grid item>
                  <Typography variant="h4" className="Login-title-2">
                    Sign In
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
              <Grid container direction="column" className="innerContainer">
                <Grid item>
                  <Typography>You are testing the Test release</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1" align="left">
                    Username
                  </Typography>
                  <TextField
                    //className={input}
                    placeholder="Username"
                    required={true}
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid container>
                  <Grid item sm={6}>
                    <Typography variant="subtitle1" align="left">
                      Password
                    </Typography>
                  </Grid>
                  <Grid item sm={6}>
                    <Link href="/recover-password" align="right">
                      <Typography variant="subtitle2">
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    placeholder="Enter your password"
                    required={true}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    //className={input}
                    InputProps={{
                      endAdornment: (
                        <div>
                          <Divider orientation="vertical" flexItem />{" "}
                          {/* not showing */}
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handlePasswordVisibility}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        </div>
                      ),
                    }}
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={rememberMe}
                        onChange={this.handleRememberCheckbox}
                      />
                    }
                    label="Remember me?"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="caption" className="small-text">
                    This site is provided solely for clients and staff of F2X
                    Group Limited. All authentication attempts are subject to
                    monitoring. It is an offence for any other third party or
                    commercial organisation to continue without prior express
                    written consent from F2X Group Limited.
                  </Typography>
                </Grid>
                <Divider variant="middle" />
                <Grid item>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleLoginButton}
                    fullWidth
                  >
                    Sign In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default Login;
