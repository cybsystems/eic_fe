
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


const AddEditWorkOrderPage = () => {

  const navigate= useNavigate()
  
  const handleSubmit = () => {
    navigate("/work-orders")
  };

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
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
                title="Next"
              />

              <Button
                type="secondary"
                onClick={() => navigate("/work-orders")}
                title="Cancel"
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditWorkOrderPage;
