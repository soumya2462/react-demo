import React, { useState, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
import { Paper, TextField, Typography, makeStyles } from '@material-ui/core';
import { RootState } from '../../store';
import { ContentLayout } from '../../components/Layout';
import SaveAndCancelButtons from '../../components/Buttons/SaveAndCancelButtons';

const useStyles = makeStyles(() => ({
  form: {
    padding: 20,
    marginBottom: 20,
  },
}));

type paramsType = {
  packageId: string;
};

const CreateWorkflow = () => {
  const { packageId } = useParams<paramsType>();
  const [workflowName, setWorkflowName] = useState('');
  const [nameError, setNameError] = useState('');

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const history = useHistory();
  const classes = useStyles();

  const handleCancelWorkflowButton = () => {
    history.push('/workflows');
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkflowName(e.target.value);
    setNameError('');
  };

  const handleSaveWorkflowButton = () => {
    const body = {
      name: workflowName,
      packageId: packageId,
    };

    axios
      .post(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/Workflows`, body, {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        () => {
          //created
          history.push(`/packages/${packageId}/workflows`);
        },
        (error) => {
          if (error.response) {
            console.log(error.response.data);
            setNameError(error.response.data);
          } else {
            //Generic error
            setNameError('Something went wrong, please try again.');
          }
        }
      );
  };

  return (
    <ContentLayout title="Create Workflow" data-test="component-create-workflow">
      <Paper elevation={2}>
        <div className={classes.form}>
          <Typography data-test="create-workflow-name-label" variant="subtitle1" align="left">
            Name
          </Typography>
          <TextField
            name="Name"
            data-test="create-workflow-name-input"
            error={nameError !== ''}
            helperText={nameError}
            size="small"
            required={true}
            onChange={handleTextChange}
            variant="outlined"
            fullWidth
          />
        </div>
        <SaveAndCancelButtons
          data-test="save-cancel-buttons"
          saveButtonLabel="Save workflow"
          handleSaveButton={handleSaveWorkflowButton}
          handleCancelButton={handleCancelWorkflowButton}
        />
      </Paper>
    </ContentLayout>
  );
};

export default CreateWorkflow;
