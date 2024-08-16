import React from "react";
import { MUIButton } from "./style";
import { CircularProgress } from "@mui/material";

interface ButtonProps {
  type: "primary" | "secondary";
  title: string;
  fullWidth?: boolean;
  onClick: () => void;
  prefixIcon?: React.ReactNode;
  disabled?: boolean;
  isLoading?: boolean;
  style?:React.CSSProperties
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type, title, fullWidth, onClick, prefixIcon, disabled, isLoading,style={} } =
    props;
  return (
    <MUIButton
      startIcon={prefixIcon}
      style={{width:200,...style}}
      onClick={onClick}
      variant={"contained"}
      fullWidth={fullWidth}
      buttonType={type}
      disabled={disabled || isLoading}
      sx={{
        textTransform: "none", // This will prevent the text from being capitalized
      }}
    >
      {isLoading ? <CircularProgress size={20} /> : title}
    </MUIButton>
  );
};

export default Button;
