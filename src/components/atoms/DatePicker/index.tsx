/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MUIDatePicker } from './style';
import { FormHelperText, Stack } from '@mui/material';

interface DatePickerProps {
  label: string;
  value: any;
  onChange: (value: any) => void;
  error: any;
  fullWidth?:boolean
}
const DatePicker = (props: DatePickerProps) => {
  const { label,value,onChange,error } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Stack direction={'column'}>
    <DemoContainer components={['DatePicker', 'DatePicker']}>
       <MUIDatePicker
        label={label}
        value={value}
        onChange={onChange}
        error={Boolean(error)}
      />
     </DemoContainer>
     {!!error && <FormHelperText style={{marginLeft:14}} className='MuiFormHelperText-root Mui-error'>{error}</FormHelperText>}

    </Stack>
  </LocalizationProvider>
  );
};
export default DatePicker;
