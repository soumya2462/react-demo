import { Button, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { LetterRange, NumberRange } from '../../../constants/apiTypes';

export type NumberFormatRangeProps = {
  range: Array<LetterRange | NumberRange>,
  errorMessage: string,
  title: string,
  key: React.Key,
  handleRangeAdd: () => void,
  handleRangeRemove: (index: number) => void,
  handleRangeChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void,
  handleErrorTextChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const NumberFormatRange = (props: NumberFormatRangeProps) => {
  const {
    range,
    errorMessage,
    title,
    key,
    handleRangeAdd,
    handleRangeRemove,
    handleRangeChange,
    handleErrorTextChange,
  } = props;
  
  return (
    <div>
      <div>
        <Typography
          variant="subtitle1"
          align="left"
          data-test={`${key}-range-label`}
        >
          {title}
        </Typography>
        {range.map((x: LetterRange | NumberRange, i: number) => 
          <div key={i}>
            <Typography
              variant="subtitle1"
              align="left"
              data-test={`${key}-range-start-label`}
              display="inline"
            >
              Start:
            </Typography>
            <TextField
              name="start"
              value={x.start}
              size="small"
              required={false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleRangeChange(e, i)}
              variant="outlined"
              fullWidth={false}
              data-test={`${key}-range-start-input`} />
            <Typography
              variant="subtitle1"
              align="left"
              data-test={`${key}-range-end-label`}
              display="inline"
            >
              End:
            </Typography>
            <TextField
              name = "end"
              value = {x.end}
              size="small"
              required={false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleRangeChange(e, i)}
              variant="outlined"
              fullWidth={false}
              data-test={`${key}-range-end-input`} />
            <Button onClick={() => handleRangeRemove(i)}>Remove</Button>
          </div>
        )}
      </div>        
      <Button data-test={`${key}-range-add`} onClick={handleRangeAdd}>Add</Button>
      <div>
        <Typography
          data-test={`message-if-${key}s-outside-range-label`}
          variant="subtitle1"
          align="left"
        >
          Message if reference number outside these ranges
        </Typography>
        <TextField
          data-test={`message-if-${key}s-outside-range-input`}
          value={errorMessage}
          // error={nameError !== ""}
          // helperText={nameError}
          name="messageIfNumbersOutsideRange"
          size="small"
          required={false}
          onChange={handleErrorTextChange}
          variant="outlined"
          fullWidth />
      </div>
    </div>  
  );
}

export default NumberFormatRange;