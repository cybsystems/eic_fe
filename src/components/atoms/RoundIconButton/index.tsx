import { ArrowBack } from "@mui/icons-material";
import { IconButton, Paper } from "@mui/material";

interface BackButtonProps {
  onClick: () => void;
}

const RoundIconButton = (props: BackButtonProps) => {
  const { onClick } = props;
  return (
    <Paper
      onClick={onClick}
      style={{ borderRadius: "50%", width: 50, height: 50 }}
    >
      <IconButton style={{ width: "100%", height: "100%" }}>
        <ArrowBack />
      </IconButton>
    </Paper>
  );
};

export default RoundIconButton;
