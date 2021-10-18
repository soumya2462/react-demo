import React, {
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import axios from "axios";
import {
  TextField,
  makeStyles,
  Button,
  IconButton,
  Box
} from "@material-ui/core";
import { DeleteOutline } from '@material-ui/icons';
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { apiClaimStatuses } from "../../../constants/apiTypes";

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '0 0 10px 0',
  },
  input: {
    width: '40%'
  },
  btn: {
    fontSize: '13px',
    fontWeight: 400,
    height: 'auto',
    width: 'auto',
    minWidth: '20px',
    marginLeft: '4px',
    marginTop: '2px'    
  },
  btnAdd: {
    fontSize: '13px',
    fontWeight: 400,
    height: 'auto',
    width: 'auto',
    minWidth: '20px',
    marginTop: '4px'    
  },
  buttonRoot: {
    width: '43%',
		display: "flex", 
		justifyContent: "space-between", 
  },
}));

type ClaimStatusesProps = {
  packageId: string;
}

const ClaimStatuses = ({ packageId }: ClaimStatusesProps) => {
  const classes = useStyles();
  const [claimStatuses, setClaimStatuses] = useState<apiClaimStatuses>({
    id: '',
    claimStatusesId: '',
    packageId: '',
    clientId: '',
    claimStatusesList: [],
  });

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {    
    if (packageId) {
      axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/claimStatuses/package/${packageId}`,
        {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          const claimStatuses = response.data; 
          setClaimStatuses(claimStatuses);
        });
    }
  }, [packageId, accessToken]);  

  const handleClaimStatusRemove = (index: number) => {
    const list = claimStatuses.claimStatusesList;
    list.splice(index, 1);
    setClaimStatuses(prevClaimStatuses => ({...prevClaimStatuses, claimStatusesList: list}));
  };

  const handleClaimStatusAdd = () => {
    setClaimStatuses(prevClaimStatuses => ({...prevClaimStatuses, claimStatusesList: [...prevClaimStatuses.claimStatusesList,  "" ] }));    
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const list = [...claimStatuses.claimStatusesList];
    list[index] = value;

    setClaimStatuses(prevClaimStatuses => ({ ...prevClaimStatuses, claimStatusesList: list }));    
  };

  const handleClaimStatusSave = () => {    
    const claimStatusesBody = claimStatuses;
    claimStatusesBody.packageId = packageId;
    claimStatusesBody.clientId = claimStatuses.clientId;
    claimStatusesBody.claimStatusesList = claimStatuses.claimStatusesList;
    if (claimStatusesBody.claimStatusesId === '') {
      axios.post(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/claimStatuses`,
      claimStatusesBody,
        {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
    }
    else {
       axios.put(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/claimStatuses`,
        claimStatusesBody,
        {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
    }  
  };

  return (        
      <div data-test="component-statuses">        
        {claimStatuses.claimStatusesList.map((x: string, i: number) => 
        <div key={i}>
          <Box className={classes.root} data-test="statuses-group-box">
            <Box>
              <IconButton
                aria-label="delete"             
                className={classes.btn}
                onClick={() => handleClaimStatusRemove(i)}
                data-test="delete-status-icon"
                >
                <DeleteOutline />
              </IconButton>                
            </Box>
            <Box className={classes.input}>
              <TextField
                value={x}
                data-test="claim-status-input"
                name="livePrefix"
                size="small"
                required={true}
                variant="outlined"
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleStatusChange(e, i)}
                fullWidth />              
            </Box>                   
          </Box>
        </div>
        )}
        <Box className={classes.buttonRoot}>
          <Box>
            <Button
              variant="contained"
              color="primary"		
              className={classes.btn}
              onClick={handleClaimStatusSave}
              data-test="save-button"
            >
            Save
            </Button>
          </Box>
          <Box>
            <Button 
              color="primary"
              variant="outlined"
              className={classes.btnAdd}
              onClick={handleClaimStatusAdd}
              data-test="add-button"
              >
            Add
            </Button>
          </Box>
        </Box>
        
      </div>  
  );
}

export default ClaimStatuses;