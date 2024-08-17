/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import { H5 } from "@components/atoms/Typographies";
import { Divider, Grid, Paper, Stack } from "@mui/material";
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectDetails } from "./helper";
import Button from "@components/atoms/Button";

const AddUnitsPage = () => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectDetails(id);
        setProjectDetails(res.data);
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <PaperLoader />;
  }

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Stack spacing={2}>
            <H5>
              {projectDetails?.name}
            </H5>
            <Divider />
            <Stack direction="row-reverse" spacing={2}>
                <Button
                  type="primary"
                  title={`Next`}
                  onClick={()=>{}}
                />

                <Button
                  type="secondary"
                  onClick={()=>{}}
                  title="Cancel"
                />
              </Stack>
          </Stack>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddUnitsPage;
