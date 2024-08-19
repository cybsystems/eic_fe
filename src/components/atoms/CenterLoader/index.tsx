import { CircularProgress, Grid } from "@mui/material";

const CenterLoader = () => {
  return (
    <Grid item xs={12}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 304,
        }}
      >
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default CenterLoader;
