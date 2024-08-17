import { CircularProgress, Grid, Paper } from '@mui/material'
import PageGridContainer from '../PageGridContainer'

const PaperLoader = () => {
  return (
    <PageGridContainer>
    <Grid item xs={12}>
      <Paper elevation={3} sx={{ padding: 4 }}>
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
      </Paper>
    </Grid>
  </PageGridContainer>
  )
}

export default PaperLoader