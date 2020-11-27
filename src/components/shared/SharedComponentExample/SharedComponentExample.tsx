import { Button, makeStyles } from "@material-ui/core";
import React from "react";

/*
Example of a styled functional component, no need for redux as the main purpose
is to style it so it meets the look and feel needed for Instanda Claims and be reused in other components
*/

interface ISharedComponentExample {
  text: string;
  onClick?: () => void;
  type: "primary" | "secondary";
}

const useStyles = makeStyles((theme) => ({
  primary: {
    backgroundColor: "#06aabb",
    color: "white",
    "&:hover": {
      background: "#1395a3",
    },
  },
  secondary: {
    backgroundColor: "#d5d5d5",
    color: "white",
    "&:hover": {
      background: "#979696",
    },
  },
}));

const SharedComponentExample = (props: ISharedComponentExample) => {
  const classes = useStyles();
  return (
    <Button
      fullWidth
      type="submit"
      variant="contained"
      className={props.type === "primary" ? classes.primary : classes.secondary}
      onClick={props.onClick}
    >
      {props.text}
    </Button>
  );
};

export default SharedComponentExample;
