import useDeviceType from "@hooks/useMediaDevice";
import { Grid } from "@mui/material";
import React from "react";

interface PageGridContainerProps {
  children: React.ReactNode;
}

const PageGridContainer = (props: PageGridContainerProps) => {
  const { isMobile } = useDeviceType();

  return (
    <Grid container padding={isMobile ? 1 : 4} style={{marginBottom: 10}}>
      {props.children}
    </Grid>
  );
};

export default PageGridContainer;
