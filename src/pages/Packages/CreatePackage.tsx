import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import { Paper, TextField, Typography, makeStyles } from '@material-ui/core';

import { RootState } from '../../store';
import { ContentLayout } from '../../components/Layout';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import SaveAndCancelButtons from '../../components/Buttons/SaveAndCancelButtons';
import { ValidationErrorEntry } from '../../constants/apiTypes';

const useStyles = makeStyles(() => ({
  form: {
    padding: 20,
    marginBottom: 20,
  },
}));

const CreatePackage = () => {
  const [packageName, setPackageName] = useState('');

  const [validationErrors, setValidationErrors] = useState<{
    [id: string]: string;
  }>({});

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const history = useHistory();
  const classes = useStyles();

  const handleCancelPackageButton = () => {
    history.push('/packages');
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPackageName(e.target.value);
    setValidationErrors((x) => ({ ...x, [e.target.name]: '' }));
  };

  const handleSavePackageButton = () => {
    const body = {
      name: packageName,
    };

    axios
      .post(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/Packages`, body, {
        headers: {
          ContentType: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(
        () => {
          //created
          history.push('/packages');
        },
        (error) => {
          if (error.response) {
            console.log(error.response.data);
            if (error.response.data.hasValidations) {
              console.log('got validations');
              const validations: Array<ValidationErrorEntry> = error.response.data.validationEntries;

              console.log(validations);
              var errorArray: { [id: string]: string } = {};

              validations.forEach((x) => {
                errorArray[x.property] = x.message;
              });

              setValidationErrors(errorArray);
            } else if (error.response.data.hasErrors) {
              console.log('got errors');
              //Generic error
              //TODO: Decide how we present them to the user
            }
            console.log('got nothing');
          } else {
          }
        }
      );
  };

  return (
    <ContentLayout title="Create Package" data-test="component-create-package">
      <Paper elevation={2}>
        <div className={classes.form}>
          <Typography data-test="create-package-name-label" variant="subtitle1" align="left">
            Name
          </Typography>
          <TextField
            name="Name"
            data-test="create-package-name-input"
            error={validationErrors['Name'] !== undefined && validationErrors['Name'] !== ''}
            helperText={validationErrors['Name']}
            size="small"
            required={true}
            onChange={handleTextChange}
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
