import React, { useState, useEffect , ChangeEvent } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router";
import { useSelector } from "react-redux";
import {
  Divider,
  Paper,
  TextField,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";

import { RootState } from "../../store";
import { ContentLayout } from "../../components/Layout";
import SaveAndCancelButtons from "../../components/Buttons/SaveAndCancelButtons";
import { apiPackage } from "../../constants/apiTypes";


const useStyles = makeStyles(() => ({
  formControl:
  {
    padding: "20px",
  },
  divider:
  {
    marginBottom: "40px", 
    marginTop: "40px",
  },
  buttonGroup: {
    display: "flex", 
    justifyContent: "space-between",
  },
}));

type paramsType = {
  id: string,
}

const EditPackage = () => {
  const [nameError, setNameError] = useState('');
  const [workflowId, setWorkflowId] = useState('');  
  const [packageToEdit, setPackageToEdit] = useState<apiPackage>({
    name: "",
    id: "",
    packageId : "",
    clientId: "",
    createdDate: {
      seconds: 0,
      nanos: 0,
    },
  });  
 
  const history = useHistory();
  const classes = useStyles();
  
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { id } = useParams<paramsType>();

  useEffect(() => {     
    axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages/${id}`,      
    { 
      headers: {
        ContentType: 'application/json',
        Authorization: `Bearer ${accessToken}`
      }        
    })
    .then(response => {
      setPackageToEdit(response.data);
     //TO get a date: console.log(new Date((response.data.createdDate.seconds)*1000));
    },
    (error) => {           
      if (error.response){    
        setNameError(error.response.data);
      }
      else
      {
        //Generic error
        setNameError("Something went wrong, please try again.");
      }
     
    });
  }, [id, accessToken]);

  const handleWorkflowId = (event: ChangeEvent<{ value: unknown }>) => {
    setWorkflowId(event.target.value as string);
  };

  const handleCancelPackageButton = () => {
    history.push("/packages");
  }
  
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackageToEdit(packageToEdit => {
      return {...packageToEdit, name:e.target.value}
    });

    setNameError("");
  }

  const handleSavePackageButton = () => {
    const body = {
      name: packageToEdit.name,
      packageId: packageToEdit.packageId
    };    

    axios.put(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/packages/${id}`,
      body,
      { headers: {
         ContentType: 'application/json',
         Authorization: `Bearer ${accessToken}`
        }         
      })
    .then(response => {
      //created    
      history.push("/packages");
    },
    (error) => {      
      if (error.response){    
        setNameError(error.response.data);
      }
      else
      {
        //Generic error
        setNameError("Something went wrong, please try again.");
      }   
    });
  };

  return (
    <ContentLayout 
      title="Edit Package"
      data-test="component-edit-package"
    >
      <Paper elevation={2}>      
        <FormControl variant="filled" size="small" fullWidth>
          <div className={classes.formControl}>
            <Typography 
              data-test="edit-package-name-label"
              variant="subtitle1"
              align="left"
            >
              Name
            </Typography>
            <TextField 
              data-test="edit-package-name-input"
              value ={packageToEdit.name}
              error={nameError !== ""}
              helperText={nameError}  
              size="small" 
              required={true}
              onChange= {handleTextChange} 
              variant="outlined"
              fullWidth />
            <Divider className={classes.divider} />
            <Typography
              variant="subtitle1"
              align="left"
              data-test="initial-workflow-label"
            >
              Workflow that runs when a claim is first started  
            </Typography>
            <Select
              data-test="initial-workflow-select"
              labelId="input-label"
              id="input"
              value={workflowId}
              onChange={handleWorkflowId}
              variant="outlined"
              fullWidth
            >
              <MenuItem value="workflow1guid">Workflow 1</MenuItem>
              <MenuItem value="workflow2guid">Workflow 2</MenuItem>
            </Select>      
            <Divider className={classes.divider} /> 
            <Typography
              variant="subtitle1"
              align="left"
              data-test="claim-statuses-label"
            >
              Claims Statuses
            </Typography>            
          </div>          
          <SaveAndCancelButtons 
            data-test="save-cancel-buttons"
            saveButtonLabel="Save package"
            handleSaveButton={handleSavePackageButton}
            handleCancelButton={handleCancelPackageButton} />
        </FormControl>
      </Paper>      
    </ContentLayout>
  );
};

export default EditPackage;