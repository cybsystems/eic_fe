/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectAndContractorDetails } from "./AddEditProjectPages/helper";
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import { Grid, Paper, Typography, List, ListItem, ListItemText, Divider, Stack } from "@mui/material";
import Button from "@components/atoms/Button";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectAndContractorDetails(id);
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
        <Paper  sx={{ padding: 4 }}>
          <Stack direction="row" alignItems="center" mb={2}>
            <Typography variant="h4" gutterBottom sx={{ flexGrow: 1 }}>
              {projectDetails.projectDetails.name}
            </Typography>
            <Button type="secondary" title="Add Units and Contractors" onClick={() => navigate(`/projects/${id}/units`)} />
          </Stack>
          {!!projectDetails.contractorUnits?.length && (
            <>
              <Typography variant="h6" gutterBottom>
                Contractors and Units
              </Typography>
              <List>
                {projectDetails.contractorUnits.map((unit: any) => (
                  <div key={unit.id}>
                    <ListItem>
                      <ListItemText
                        primary={`Unit: ${unit.contractorUnit.name}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              Contractor: {unit.contractor.name}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.primary">
                              Email: {unit.contractor.email}
                            </Typography>
                            <br />
                            <Typography component="span" variant="body2" color="text.primary">
                              Phone: {unit.contractor.phoneNumber}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </div>
                ))}
              </List>
            </>
          )}
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default ProjectDetailsPage;
