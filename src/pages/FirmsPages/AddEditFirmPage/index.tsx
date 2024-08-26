
import Button from "@components/atoms/Button";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PageGridContainer from "@components/atoms/PageGridContainer";
import {
  Grid,
  Paper,
  Stack,
  TextField
} from "@mui/material";

import { useNavigate } from "react-router-dom";


const AddEditFirmPage = () => {

  const navigate= useNavigate()
  
  const handleSubmit = () => {
    navigate("/firms")
  };

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper  sx={{ padding: 4 }}>
          <Stack spacing={3}>
             
            <TextField
              fullWidth
              label="Name"
              sx={{ mb: 2 }}
            />
            

            <TextField
              fullWidth
              label="Description"
              sx={{ mb: 2 }}
            />
            
            <Stack direction="row-reverse" spacing={2}>
              <Button
                type="primary"
                onClick={handleSubmit}
                title="Create Project"
              />

              <Button
                type="secondary"
                onClick={() => navigate("/firms")}
                title="Cancel"
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditFirmPage;
