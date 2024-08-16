import PageGridContainer from "@components/atoms/PageGridContainer";
import { Grid, Paper } from "@mui/material";

const AddEditProjectPage = () => {
  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}></Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditProjectPage;
