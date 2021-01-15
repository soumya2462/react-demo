import { ChangeEvent, Component } from "react";
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
import axios from "axios";
import qs from "querystring";
import "./index.css";
import { logOn } from "../../ducks/Auth";

interface LoginProps {
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  logOn: (username: string, accessToken: string) => void;
}

type LoginState = {
  username: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean; // not used atm
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
      scope: 'openid profile api email',
    };

    axios.post(`${process.env.REACT_APP_AUTHENTICATION_URL}/connect/token`,
      qs.stringify(body),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    .then(response => {
      if(response?.data?.access_token)
      {
        this.props.logOn(this.state.username, response.data.access_token);
      }
      else{
        console.log("show error");
      }
    },
    (error) => {
      const { data } = error.response;

      if(data.error_description === "invalid_username_or_password") {
        console.log("show error");
      }
      else {
        console.log("show error_description");
      }
    });
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
                  <Typography>You are testing the Test release</Typography>
                </Grid>
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
    username: state.auth.username,
    accessToken: state.auth.accessToken,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch: any) {
  return {
    logOn: (username: string, accessToken: string) => {
      return dispatch(logOn(username, accessToken));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
