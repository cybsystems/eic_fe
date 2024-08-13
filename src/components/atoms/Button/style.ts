import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/system";

interface CustomButtonProps extends ButtonProps {
  buttonType: "primary" | "secondary";
}

export const MUIButton = styled(Button)<CustomButtonProps>(({ theme, buttonType }) => {
    return {
    color: "white",
    backgroundColor:
      buttonType === "primary"
        ? theme?.palette?.primary?.main
        : theme?.palette?.secondary?.main,
  };
});
