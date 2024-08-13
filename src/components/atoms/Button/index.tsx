import React from "react";
import { MUIButton } from "./style";

interface ButtonProps {
  type: "primary" | "secondary";
  title: string;
  fullWidth?: boolean;
  onClick: () => void;
  prefixIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, title, fullWidth, onClick, prefixIcon } = props;
  return (
    <MUIButton
      startIcon={prefixIcon}
      onClick={onClick}
      variant={"contained"}
      fullWidth={fullWidth}
      buttonType={type}
      sx={{
        textTransform: "none", // This will prevent the text from being capitalized
      }}
    >
      {title}
    </MUIButton>
  );
};

export default Button;
