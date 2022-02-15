import React from "react";
import { Typography } from "@material-ui/core";
import { ContentLayout } from "../../components/Layout";
import PropTypes from 'prop-types';

export default function Childclass (props:any){
    const {
        onPressRight,
      } = props;

      console.log(onPressRight)
  return (
    
    <div  >
    <li>
        <button onClick={() => onPressRight("some")}>hello test </button>
        </li>

    </div>
  );
  }
  Childclass.propTypes = {
    onPressRight: PropTypes.func,

  };
  
  Childclass.defaultProps = {
 
    onPressRight: () => {},

  };
