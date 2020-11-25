import { Button, makeStyles } from "@material-ui/core";
import React from "react";

/*
Example of a styled functional component, no need for redux as the main purpose
is to style it so it meets the look and feel needed for Instanda Claims and be reused in other components
*/

interface ISharedComponentExample {
  text: string;
  onClick?: () => void;
}

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#06aabb",
    color: "white",
    "&:hover": {
      background: "#1395a3",
    },
  },
}));

const SharedComponentExample = (props: ISharedComponentExample) => {
  const classes = useStyles();
  return (
    <Button
      color="primary"
      fullWidth
      type="submit"
      variant="contained"
      className={classes.button}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default SharedComponentExample;
