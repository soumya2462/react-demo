import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import {
  Paper,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { RootState } from "../../store";
import { ContentLayout } from "../../components/Layout";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import SaveAndCancelButtons from "../../components/Buttons/SaveAndCancelButtons";

const useStyles = makeStyles(() => ({
  form: {
    padding:20,
    marginBottom:20  
  },
}));

const CreatePackage = () => {  
  const [packageName, setPackageName] = useState('');
  const [nameError, setNameError] = useState('');
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const history = useHistory();
  const classes = useStyles();

  const handleCancelPackageButton = () => {
    history.push("/packages");
  }
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackageName(e.target.value);
    setNameError('');
  }

  const handleSavePackageButton = () => {
    const body = {
      name: packageName
    };

    axios.post(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/Packages`,
      body,
      { headers: {
         ContentType: 'application/json',
         Authorization: `Bearer ${accessToken}`
        }         
      })
    .then(() => {
      //created    
      history.push('/packages');
    },
    (error) => {      
      if (error.response){    
        setNameError(error.response.data);
      }else
      {
        //Generic error
        setNameError("Something went wrong, please try again.");
      }  
    });
  };

  return (
    <ContentLayout 
      title="Create Package"
      data-test="component-create-package" 
    >
      <Paper elevation={2} >
        <div className={classes.form}>
          <Typography 
            data-test="create-package-name-label"
            variant="subtitle1"
            align="left"
          >
            Name
          </Typography>
          <TextField  
            data-test="create-package-name-input"
            error={nameError !== ""}
            helperText={nameError}  
            size="small" 
            required={true}
            onChange= {handleTextChange} 
            variant="outlined"
            fullWidth
          />    
        </div>
        <SaveAndCancelButtons 
          data-test="save-cancel-buttons"
          saveButtonLabel="Save package"
          handleSaveButton={handleSavePackageButton}
          handleCancelButton={handleCancelPackageButton}
        />
      </Paper>      
    </ContentLayout>
  );
};

export default CreatePackage;