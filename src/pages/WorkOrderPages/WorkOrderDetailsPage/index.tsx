/* eslint-disable @typescript-eslint/no-explicit-any */
import PageGridContainer from "@components/atoms/PageGridContainer";
import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkOrderDetails } from "./helper";
import PaperLoader from "@components/atoms/PaperLoader";
import { H5 } from "@components/atoms/Typographies";

const WorkOrderDetailsPage = () => {
  const [workOrderDetails, setWorkOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id: workOrderId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        if (workOrderId) {
          const workOrderResponse = await getWorkOrderDetails(workOrderId);
          setWorkOrderDetails(workOrderResponse.data);
        }
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [workOrderId]);

  if (loading) {
    return <PaperLoader />;
  }
const statusMap:any = { 1: "Created", 2: "Approved", 3: "Completed" };
  return (
    <PageGridContainer>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Work Order Details
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              {workOrderDetails && (
                <Box>
                  <Grid container spacing={2} direction="column">
                    {/* General Information */}
                    <Grid item>
                      <H5 gutterBottom>
                        General Information
                      </H5>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Title:</strong> {workOrderDetails.title}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Status:</strong> {statusMap[workOrderDetails.status]}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1"><strong>Description:</strong> {workOrderDetails.description}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Order Start Date:</strong> {new Date(workOrderDetails.orderStartDate).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Expected Start Date:</strong> {new Date(workOrderDetails.expectedStartDate).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Expected End Date:</strong> {new Date(workOrderDetails.expectedEndDate).toLocaleDateString()}</Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ marginY: 2 }} />
                    </Grid>

                    {/* Project and Contractor Details */}
                    <Grid item>
                      <H5 gutterBottom>
                        Project and Contractor Details
                      </H5>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Project:</strong> {workOrderDetails.Project.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Unit:</strong> {workOrderDetails.ContractorUnitAssignment.ContractorUnit.name}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Contractor:</strong> {workOrderDetails.ContractorUnitAssignment.Contractor.name}</Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ marginY: 2 }} />
                    </Grid>

                    {/* User Details */}
                    <Grid item>
                      <H5 gutterBottom>
                        User Details
                      </H5>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Creator:</strong> {workOrderDetails.creator.username}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1"><strong>Authorized User:</strong> {workOrderDetails.authorizedUser.username}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageGridContainer>
  );
};

export default WorkOrderDetailsPage;
