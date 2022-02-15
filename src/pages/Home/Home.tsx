import React, { useState } from "react";
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
import Childclass from "./child"
const Home = () => {
  const [username, setusername] = useState("");

  return (
    <Container title="Home" maxWidth="lg" className="container" >
      <div >
        <TextField
          value={username}
          name="username"
          placeholder="Username"
          variant="outlined"
          fullWidth
        />
      </div>
      <div >
        <Childclass onPressRight={(data) => {
          setusername(data);
        }} />
      </div>
    </Container>
  );
};

export default Home;