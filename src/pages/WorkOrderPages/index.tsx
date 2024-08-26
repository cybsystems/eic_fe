/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Grid, Paper, Stack } from "@mui/material";

import Button from "@components/atoms/Button";
import DataTable from "@components/atoms/DataTable";
import PageGridContainer from "@components/atoms/PageGridContainer";
import useDeviceType from "@hooks/useMediaDevice";
import { formatDate, formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { getWorkOrders } from "./helper";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "Work Order",
    width: 190
  },
  {
    field: "Project",
    headerName: "Project",
    renderCell: (params: any) => {
      return params?.row?.Project?.name;
    },
    width: 90
  },
  {
    field: "ContractorUnitAssignment",
    headerName: "Unit",
    renderCell: (params: any) => {
      return params?.row?.ContractorUnitAssignment?.contractorUnit?.name;
    },
    width: 90
  },
  {
    field: "ContractorUnitAssignment.Contractor",
    headerName: "Contractor",
    renderCell: (params: any) => {
      return params?.row?.ContractorUnitAssignment?.contractor?.name;
    },
    width: 140
  },
  {
    field: "expectedStartDate",
    headerName: "Expected Start Date",
    renderCell: (params: any) => {
      return formatDate(params?.row?.expectedStartDate)
    },
    width: 140
  },
  {
    field: "expectedEndDate",
    headerName: "Expected End Date",
    renderCell: (params: any) => {
      return formatDate(params?.row?.expectedEndDate)
    },
    width: 140
  },
  
];

const WorkOrderPage = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();

  useEffect(() => {
    (async () => {
      try {
        const workOrderResponse = await getWorkOrders();
        console.log({ workOrderResponse });
        setWorkOrders(workOrderResponse.data);
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRowClick = (row: any) => {
    console.log({ row });
    navigate(`/work-orders/${row.id}`);
  };
  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 2 }} // Margin bottom for spacing
        >
          <Button
            type="primary"
            title="Create Workorder"
            onClick={() => navigate("/work-orders/new")}
            fullWidth={isMobile}
            prefixIcon={<AddIcon />}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <DataTable
            columns={columns}
            rows={workOrders}
            loading={loading}
            pageSize={10}
            onRowClick={onRowClick}
          />
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default WorkOrderPage;
