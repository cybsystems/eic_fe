import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const H5 = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: theme.typography.h5.fontSize,
}));
