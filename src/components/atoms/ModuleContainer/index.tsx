import { Box } from "@mui/material";
import React from "react";

interface ModuleContainerProps {
  children: React.ReactNode;
}

const ModuleContainer = (props: ModuleContainerProps) => {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3 }}
      style={{ marginTop: 60, overflow:'auto',maxHeight:'95vh',marginBottom:50,padding:0}}
    >
        {props.children}
    </Box>
  );
};

export default ModuleContainer;
