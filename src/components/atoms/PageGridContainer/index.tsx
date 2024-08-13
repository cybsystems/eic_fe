import { Grid, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

interface PageGridContainerProps {
  children: React.ReactNode;
}

const PageGridContainer = (props: PageGridContainerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid container padding={isMobile ? 1 : 4} style={{marginBottom: 10}}>
      {props.children}
    </Grid>
  );
};

export default PageGridContainer;
