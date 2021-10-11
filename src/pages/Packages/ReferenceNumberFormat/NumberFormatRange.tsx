import { Button, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent } from 'react';
import { LetterRange, NumberRange } from '../../../constants/apiTypes';

export type NumberFormatRangeProps = {
  range: Array<LetterRange | NumberRange>,
  errorMessage: string,
  title: string,
  name: string,
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
    name,
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
          data-test={`${name}-range-label`}
        >
          {title}
        </Typography>
        {range.map((x: LetterRange | NumberRange, i: number) => 
          <div key={i}>
            <Typography
              variant="subtitle1"
              align="left"
              data-test={`${name}-range-start-label`}
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
              data-test={`${name}-range-start-input`} />
            <Typography
              variant="subtitle1"
              align="left"
              data-test={`${name}-range-end-label`}
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
              data-test={`${name}-range-end-input`} />
            <Button onClick={() => handleRangeRemove(i)}>Remove</Button>
          </div>
        )}
      </div>        
      <Button data-test={`${name}-range-add`} onClick={handleRangeAdd}>Add</Button>
      <div>
        <Typography
          data-test={`message-if-${name}s-outside-range-label`}
          variant="subtitle1"
          align="left"
        >
          Message if reference number outside these ranges
        </Typography>
        <TextField
          data-test={`message-if-${name}s-outside-range-input`}
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