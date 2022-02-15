import React, { ChangeEvent, Component } from "react";
import { connect } from "react-redux";
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
import { login,logout} from "./../../redux/actions/user_auth";


interface LoginProps {
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  user_auth:(object:any)=>void
}

type LoginState = {
  username: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean; 
};

export class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false,
      rememberMe: false,
    };
  }

  handlePasswordVisibility = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleRememberCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ ...this.state, rememberMe: event.target.checked });
  };

  handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    this.setState({ ...this.state, [name]: value })
  };

  handleLoginButton = () => {
    const body = {
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
      grant_type: 'password',
      username: this.state.username,
      password: this.state.password,
      scope: 'open id profile api email',
    };
    this.props.user_auth(body);
  };

  render() {
    const {
      username,
      password,
      showPassword,
      rememberMe,
    } = this.state;

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
                  <Typography variant="subtitle1" align="left">
                    Username
                  </Typography>
                  <TextField
                    value={username}
                    name="username"
                    onChange={this.handleTextChange}
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
                    value={password}
                    name="password"
                    placeholder="Enter your password"
                    required={true}
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    onChange={this.handleTextChange}
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
                {/* needs css */}
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

const mapStateToProps = (state: any) => {
  return {
    is_success: state.user_auth.is_success,
    login_data: state.user_auth.login_data,
    is_fetching: state.user_auth.is_fetching,
    error: state.user_auth.error,
  };
};

const mapDispatchToProps = (dispatch:any)=> ({
  user_auth: (request_data:any) => dispatch(login(request_data)),
 // logout: (request_data:any) => dispatch(logout(request_data)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
