import React, {
  useState,
  useEffect,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import {
  Divider,
  TextField,
  Typography,
  makeStyles,
  Select,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { apiNumberFormat } from "../../../constants/apiTypes";
import NumberFormatRange from './NumberFormatRange';

const useStyles = makeStyles(() => ({
  formControl: {
    padding: "20px",
  },
  divider: {
    marginBottom: "40px",
    marginTop: "40px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

type NumberFormatProps = {
  id: string;
  updateParentValue: Dispatch<SetStateAction<apiNumberFormat>>;
}

const NumberFormat = ({ id, updateParentValue }: NumberFormatProps) => {
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

  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_DESIGN_GATEWAY_URL}/NumberFormat/package/${id}`,
        {
          headers: {
            ContentType: 'application/json',
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(response => {
          const numberFormat = response.data;
        
          numberFormat.numberRange = JSON.parse(response.data.numberRange);
          numberFormat.letterRange = JSON.parse(response.data.letterRange);
        
          helperSetNumberFormat(numberFormat);
        });
    }
  }, [id, accessToken]);

  const menuRows = (start: number, end: number) => {
    let rows = [];
    
    for (let index = start; index < end + 1; index++) {                
      rows.push(<MenuItem key={index} value={index}>{index}</MenuItem>);
    }    
    return rows;
  }
  
  const helperSetNumberFormat = (setFunction: (prevState: apiNumberFormat) => apiNumberFormat) => {
    setNumberFormat(setFunction);
    updateParentValue(setFunction);
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    helperSetNumberFormat(refNumberFormat => ({ ...refNumberFormat, [name]: value }));
  };

  const handlePaddingChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    const { value } = e.target;
    helperSetNumberFormat(refNumberFormat => ({ ...refNumberFormat, numberPadding: value as number }));
  };
    
  const handleNumberRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...numberFormat.numberRange];

    if (name === 'start' || name === 'end'){
      list[index][name] = parseInt(value);
      helperSetNumberFormat(prevNumberFormat => ({...prevNumberFormat, numberRange: list}));
    }    
  };
    
  const handleNumberRangeRemove = (index: number) => {
    const list = numberFormat.numberRange;
    list.splice(index, 1);
    helperSetNumberFormat(prevNumberFormat => ({...prevNumberFormat, numberRange: list}));
  };
    
  const handleNumberRangeAdd = () => {
    helperSetNumberFormat(prevNumberFormat => ({...prevNumberFormat, numberRange: [...prevNumberFormat.numberRange, { start: 0, end: 0 }] }));
  };
  
  const handleLetterRangeChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value } = e.target;
    const list = [...numberFormat.letterRange];
    
    if (name === 'start' || name === 'end') {
      list[index][name] = value;
      helperSetNumberFormat(prevNumberFormat => ({ ...prevNumberFormat, letterRange: list }));
    }
  };
    
  const handleLetterRangeRemove = (index: number) => {
    const list = [...numberFormat.letterRange];
    list.splice(index, 1);
    helperSetNumberFormat(prevNumberFormat => ({...prevNumberFormat, letterRange: list}));
  };
    
  const handleLetterRangeAdd = () => {
    helperSetNumberFormat(prevNumberFormat => ({...prevNumberFormat, letterRange: [...prevNumberFormat.letterRange, { start: '', end: '' }] }));
  };  

  return (
    <FormControl
      variant="filled"
      size="small"
      fullWidth
      data-test="component-number-format"
    >
      <div className={classes.formControl}>
        <div>
          <Typography
            data-test="live-prefix-label"
            variant="subtitle1"
            align="left"
          >
            Live reference number prefix
          </Typography>
          <TextField
            data-test="live-prefix-input"
            name="livePrefix"
            value={numberFormat.livePrefix}
            // error={nameError !== ""}
            // helperText={nameError}
            size="small"
            required={true}
            onChange={handleTextChange}
            variant="outlined"
            fullWidth />
        </div>
        <div>
          <Typography
            data-test="test-prefix-label"
            variant="subtitle1"
            align="left"
          >
            Test reference number prefix
          </Typography>
          <TextField
            data-test="test-prefix-input"
            value={numberFormat.testPrefix}
            name="testPrefix"
            // error={nameError !== ""}
            // helperText={nameError}
            size="small"
            required={true}
            onChange={handleTextChange}
            variant="outlined"
            fullWidth />
        </div>
        <div>
          <Typography
            data-test="suffix-label"
            variant="subtitle1"
            align="left"
          >
            Suffix (optional)
          </Typography>
          <TextField
            data-test="suffix-input"
            value={numberFormat.suffix}
            name="suffix"
            // error={nameError !== ""}
            // helperText={nameError}
            size="small"
            required={false}
            onChange={handleTextChange}
            variant="outlined"
            fullWidth />
        </div>
        <Divider className={classes.divider} />
        <div>
          <Typography
            variant="subtitle1"
            align="left"
            data-test="number-padding-label"
          >
            Number of following digits
          </Typography>
          <Select
            data-test="number-padding-input"
            labelId="input-label"
            id="input"
            name="numberPadding"
            value={numberFormat.numberPadding === 0 ? '' : numberFormat.numberPadding}
            onChange={handlePaddingChange}
            variant="outlined"
            fullWidth
          >
            { menuRows(3, 10) }
          </Select>
        </div>
        <Divider className={classes.divider} />
        <NumberFormatRange
          range={numberFormat.numberRange}
          errorMessage={numberFormat.messageIfNumbersOutsideRange}
          title="Number Range"
          key="number"
          handleRangeAdd={handleNumberRangeAdd}
          handleRangeRemove={handleNumberRangeRemove}
          handleRangeChange={handleNumberRangeChange}
          handleErrorTextChange={handleTextChange} />
        <Divider className={classes.divider} />
        <NumberFormatRange
          range={numberFormat.letterRange}
          errorMessage={numberFormat.messageIfLettersOutsideRange}
          title="Letter Range"
          key="letter"
          handleRangeAdd={handleLetterRangeAdd}
          handleRangeRemove={handleLetterRangeRemove}
          handleRangeChange={handleLetterRangeChange}
          handleErrorTextChange={handleTextChange} />
        {/* 
        <Divider className={classes.divider} />
        <SaveAndCancelButtons
          data-test="button-group"
          saveButtonLabel="Save"
          handleSaveButton={handleSaveNumberFormatButton}
          handleCancelButton={handleCancelNumberFormatButton} /> */}
      </div>
    </FormControl>
  );
}

export default NumberFormat;