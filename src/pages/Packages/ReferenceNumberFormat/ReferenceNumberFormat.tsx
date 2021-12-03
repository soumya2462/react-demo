import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  Divider,
  TextField,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl,
  Button,
  Box,
  FormHelperText,
} from '@material-ui/core';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { apiNumberFormat, ValidationErrorEntry } from '../../../constants/apiTypes';
import NumberFormatRange from './NumberFormatRange';

const useStyles = makeStyles(() => ({
  divider: {
    marginBottom: '40px',
    marginTop: '40px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  btn: {
    fontSize: '13px',
    fontWeight: 400,
    height: 'auto',
    width: 'auto',
    minWidth: '20px',
    marginLeft: '4px',
    marginTop: '2px',
  },
  buttonRoot: {
    width: '43%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

type NumberFormatProps = {
  id: string;
};

const NumberFormat = ({ id }: NumberFormatProps) => {
  const classes = useStyles();
  const [numberFormat, setNumberFormat] = useState<apiNumberFormat>({
    id: '',
    numberFormatId: '',
    packageId: '',
    clientId: '',
    livePrefix: '',
    testPrefix: '',
    suffix: '',
    numberPadding: 0,
    numberRange: [],
    letterRange: [],
    messageIfNumbersOutsideRange: '',
    messageIfLettersOutsideRange: '',
  });

  const [validationErrors, setValidationErrors] = useState<{
    [id: string]: string;
  }>({});

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/NumberFormat/package/${id}`, {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const numberFormat = response.data;
          setNumberFormat(numberFormat);
        });
    }
  }, [id, accessToken]);

  const menuRows = (start: number, end: number) => {
    let rows = [];

    for (let index = start; index < end + 1; index++) {
      rows.push(
        <MenuItem key={index} value={index}>
          {index}
        </MenuItem>
      );
    }
    return rows;
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNumberFormat((refNumberFormat) => ({ ...refNumberFormat, [name]: value }));
    setValidationErrors((x) => ({ ...x, [name]: '' }));
  };

  const handlePaddingChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    const { name, value } = e.target;
    const elementName = name ? name : '';
    setNumberFormat((refNumberFormat) => ({ ...refNumberFormat, numberPadding: value as number }));
    setValidationErrors((x) => ({ ...x, [elementName]: '' }));
  };

  const handleNumberRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...numberFormat.numberRange];
    if (name === 'start' || name === 'end') {
      list[index][name] = parseInt(value) || 0;
      setNumberFormat((prevNumberFormat) => ({ ...prevNumberFormat, numberRange: list }));
      var elementName = `numberRange[${index}].${name}`;
      setValidationErrors((x) => ({ ...x, [elementName]: '' }));
    }
  };

  const handleNumberRangeRemove = (index: number) => {
    const list = numberFormat.numberRange;
    list.splice(index, 1);
    setNumberFormat((prevNumberFormat) => ({ ...prevNumberFormat, numberRange: list }));
  };

  const handleNumberRangeAdd = () => {
    setNumberFormat((prevNumberFormat) => ({
      ...prevNumberFormat,
      numberRange: [...prevNumberFormat.numberRange, { start: 0, end: 0 }],
    }));
  };

  const handleLetterRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...numberFormat.letterRange];

    if (name === 'start' || name === 'end') {
      list[index][name] = value;
      setNumberFormat((prevNumberFormat) => ({ ...prevNumberFormat, letterRange: list }));
    }
  };

  const handleLetterRangeRemove = (index: number) => {
    const list = [...numberFormat.letterRange];
    list.splice(index, 1);
    setNumberFormat((prevNumberFormat) => ({ ...prevNumberFormat, letterRange: list }));
  };

  const handleLetterRangeAdd = () => {
    setNumberFormat((prevNumberFormat) => ({
      ...prevNumberFormat,
      letterRange: [...prevNumberFormat.letterRange, { start: '', end: '' }],
    }));
  };

  const handleReferenceNumberFormatSave = () => {
    const numberFormatBody = _.cloneDeep(numberFormat);
    numberFormatBody.packageId = id;

    if (numberFormatBody.numberFormatId === '') {
      axios
        .post(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/numberformat`, numberFormatBody, {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          () => {},
          (error) => {
            if (error.response) {
              if (error.response.data.hasValidations) {
                const validations: Array<ValidationErrorEntry> = error.response.data.validationEntries;
                var errorArray: { [id: string]: string } = {};

                validations.forEach((x) => {
                  errorArray[x.property] = x.message;
                });
                setValidationErrors(errorArray);
              } else if (error.response.data.hasErrors) {
                //Generic error
                //TODO: Decide how we present them to the user
              }
            } else {
            }
          }
        );
    } else {
      axios
        .put(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/numberformat`, numberFormatBody, {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(
          () => {},
          (error) => {
            if (error.response) {
              if (error.response.data.hasValidations) {
                const validations: Array<ValidationErrorEntry> = error.response.data.validationEntries;
                var errorArray: { [id: string]: string } = {};

                validations.forEach((x) => {
                  errorArray[x.property] = x.message;
                });
                setValidationErrors(errorArray);
              } else if (error.response.data.hasErrors) {
                //Generic error
                //TODO: Decide how we present them to the user
              }
            } else {
            }
          }
        );
    }
  };

  return (
    <FormControl variant="filled" size="small" fullWidth data-test="component-number-format">
      <div>
        <Typography data-test="live-prefix-label" variant="subtitle1" align="left">
          Live reference number prefix
        </Typography>
        <TextField
          data-test="live-prefix-input"
          name="livePrefix"
          value={numberFormat.livePrefix}
          error={validationErrors['livePrefix'] !== undefined && validationErrors['livePrefix'] !== ''}
          helperText={validationErrors['livePrefix']}
          size="small"
          required={true}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <Typography data-test="test-prefix-label" variant="subtitle1" align="left">
          Test reference number prefix
        </Typography>
        <TextField
          data-test="test-prefix-input"
          value={numberFormat.testPrefix}
          name="testPrefix"
          error={validationErrors['testPrefix'] !== undefined && validationErrors['testPrefix'] !== ''}
          helperText={validationErrors['testPrefix']}
          size="small"
          required={true}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
        />
      </div>
      <div>
        <Typography data-test="suffix-label" variant="subtitle1" align="left">
          Suffix (optional)
        </Typography>
        <TextField
          data-test="suffix-input"
          value={numberFormat.suffix}
          name="suffix"
          error={validationErrors['suffix'] !== undefined && validationErrors['suffix'] !== ''}
          helperText={validationErrors['suffix']}
          size="small"
          required={false}
          onChange={handleTextChange}
          variant="outlined"
          fullWidth
        />
      </div>
      <Divider className={classes.divider} />
      <div>
        <Typography variant="subtitle1" align="left" data-test="number-padding-label">
          Number of following digits
        </Typography>
        <Select
          data-test="number-padding-input"
          labelId="input-label"
          id="input"
          name="numberPadding"
          error={validationErrors['numberPadding'] !== undefined && validationErrors['numberPadding'] !== ''}
          value={numberFormat.numberPadding === 0 ? '' : numberFormat.numberPadding}
          onChange={handlePaddingChange}
          variant="outlined"
          fullWidth
        >
          {menuRows(1, 10)}
        </Select>
        <FormHelperText
          error={validationErrors['numberPadding'] !== undefined && validationErrors['numberPadding'] !== ''}
        >
          {validationErrors['numberPadding']}
        </FormHelperText>
      </div>
      <Divider className={classes.divider} />
      <NumberFormatRange
        range={numberFormat.numberRange}
        errorMessage={numberFormat.messageIfNumbersOutsideRange}
        title="Number Range"
        name="number"
        handleRangeAdd={handleNumberRangeAdd}
        handleRangeRemove={handleNumberRangeRemove}
        handleRangeChange={handleNumberRangeChange}
        handleErrorTextChange={handleTextChange}
        validationErrors={validationErrors}
      />
      <Divider className={classes.divider} />
      <NumberFormatRange
        range={numberFormat.letterRange}
        errorMessage={numberFormat.messageIfLettersOutsideRange}
        title="Letter Range"
        name="letter"
        handleRangeAdd={handleLetterRangeAdd}
        handleRangeRemove={handleLetterRangeRemove}
        handleRangeChange={handleLetterRangeChange}
        handleErrorTextChange={handleTextChange}
        validationErrors={validationErrors}
      />
      <Box className={classes.buttonRoot}>
        <Box>
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={handleReferenceNumberFormatSave}
            data-test="save-button"
          >
            Save
          </Button>
        </Box>
      </Box>
    </FormControl>
  );
};

export default NumberFormat;
