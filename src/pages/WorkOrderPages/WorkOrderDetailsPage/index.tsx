/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import { H5 } from "@components/atoms/Typographies";
import { WithLoaderWrapper } from "@components/molecules/WithLoaderWrapper";
import useDeviceType from "@hooks/useMediaDevice";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWorkOrderDetails, updateWorkOrderStatus } from "./helper";
import Breadcrumbs from "@components/atoms/Breadcrumbs";

const WorkOrderDetailsPage = () => {
  const [workOrderDetails, setWorkOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [statusLoader, setStatusLoader] = useState(false);
  const { id: workOrderId } = useParams();
  const { isMobile } = useDeviceType();

  const loadWorkOrderDetails = async (workOrderId: string) => {
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
  };

  useEffect(() => {
    if (workOrderId) {
      loadWorkOrderDetails(workOrderId);
    }
  }, [workOrderId]);

  const onStatusChangeClicked = async () => {
    if (workOrderId) {
      try {
        setStatusLoader(true);
        await updateWorkOrderStatus(workOrderId, 3);
        setWorkOrderDetails({ ...workOrderDetails, status: 3 });
        showToast("success", "Work order completed");
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setStatusLoader(false);
        loadWorkOrderDetails(workOrderId);
      }
    }
  };
 

  const statusMap: any = { 1: "Created", 2: "Approved", 3: "Completed" };

  return (
    <PageGridContainer>
        <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work Orders", href: "/work-orders" },
        ]}
        title={workOrderDetails?.title}
      />
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <WithLoaderWrapper loading={loading}> 
              {workOrderDetails && (
                <Box>
                  <Grid container spacing={2} direction="column">
                    {/* General Information */}
                    <Grid item>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        marginBottom={1}
                      >
                        <Grid item>
                          <H5 gutterBottom>General Information</H5>
                        </Grid>
                        {workOrderDetails.status !== 3 && (
                          <Grid item flex={isMobile ? 1 : 0.2}>
                            <Button
                              onClick={onStatusChangeClicked}
                              type="secondary"
                              title="Mark as Completed"
                              isLoading={statusLoader}
                              fullWidth
                            />
                          </Grid>
                        )}
                      </Grid>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Title:</strong> {workOrderDetails.title}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Status:</strong>{" "}
                            {statusMap[workOrderDetails.status]}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="body1">
                            <strong>Description:</strong>{" "}
                            {workOrderDetails.description}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Order Start Date:</strong>{" "}
                            {new Date(
                              workOrderDetails.orderStartDate
                            ).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Expected Start Date:</strong>{" "}
                            {new Date(
                              workOrderDetails.expectedStartDate
                            ).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Expected End Date:</strong>{" "}
                            {new Date(
                              workOrderDetails.expectedEndDate
                            ).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ marginY: 2 }} />
                    </Grid>

                    {/* Project and Contractor Details */}
                    <Grid item>
                      <H5 gutterBottom>Project and Contractor Details</H5>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Project:</strong>{" "}
                            {workOrderDetails.Project.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Unit:</strong>{" "}
                            {
                              workOrderDetails.ContractorUnitAssignment
                                .ContractorUnit.name
                            }
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Contractor:</strong>{" "}
                            {
                              workOrderDetails.ContractorUnitAssignment
                                .Contractor.name
                            }
                          </Typography>
                        </Grid>
                      </Grid>
                      <Divider sx={{ marginY: 2 }} />
                    </Grid>

                    {/* User Details */}
                    <Grid item>
                      <H5 gutterBottom>User Details</H5>
                      <Divider sx={{ marginBottom: 2 }} />
                      <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                          <Typography variant="body1">
                            <strong>Authorized By:</strong>{" "}
                            {workOrderDetails.authorizedUser.firstName}{" "}
                            {workOrderDetails.authorizedUser.lastName}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              )}
              </WithLoaderWrapper>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageGridContainer>
  );
};

export default WorkOrderDetailsPage;
