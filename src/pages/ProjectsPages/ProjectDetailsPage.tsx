/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectAndContractorDetails } from "./AddEditProjectPages/helper";
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import { Grid, Paper, Typography, List, ListItem, ListItemText, Divider } from "@mui/material";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState<any>({});
  const [loading, setLoading] = useState(true);

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
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom>
            {projectDetails.projectDetails.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Contractors and Units
          </Typography>
          <List>
            {projectDetails.contractorUnits.map((unit:any) => (
              <div key={unit.id}>
                <ListItem>
                  <ListItemText
                    primary={`Unit: ${unit.ContractorUnit.name}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Contractor: {unit.Contractor.name}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.primary">
                          Email: {unit.Contractor.email}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.primary">
                          Phone: {unit.Contractor.phoneNumber}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default ProjectDetailsPage;
