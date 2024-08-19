import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from "@mui/system";

interface MUIDatePickerProps {
  error?: boolean;
}

export const MUIDatePicker = styled(DatePicker, {
  shouldForwardProp: (prop) => prop !== "error",
})<MUIDatePickerProps>(({ error }) => ({
   

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: error ? "#d23030" : "#c4c4c4", // Custom border color for error state
    },
    "&:hover fieldset": {
      borderColor: error ? "#a00" : "currentColor", // Custom border color on hover if there's an error
    },
    "&.Mui-focused fieldset": {
      borderColor: error ? "#d23030" : "currentColor", // Custom border color when focused if there's an error
    },
  },
  width: "100%", // Custom width
}));
