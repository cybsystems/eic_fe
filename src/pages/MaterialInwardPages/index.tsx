/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Grid, Paper, Stack } from "@mui/material";

import Button from "@components/atoms/Button";
import DataTable from "@components/atoms/DataTable";
import PageGridContainer from "@components/atoms/PageGridContainer";
import useDeviceType from "@hooks/useMediaDevice";
import { useEffect, useState } from "react";
import { getInwards } from "./helper";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "Item",
    headerName: "Item",
    flex:0.5,
    renderCell: (params: any) => {
      return params?.row?.item      ?.item
      ;
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex:0.5,
    
  },
  {
    field: "contractor",
    headerName: "Contractor",
    flex:0.5,
    renderCell: (params: any) => {
      return params?.row?.contractor?.name || '-';
    },
  },
  {
    field: "vendor",
    headerName: "Vendor",
    flex:0.5,
    renderCell: (params: any) => {
      return params?.row?.vendor?.name || '-';
    },
  },
];

const InwardPage = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await getInwards();
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRowClick = (row: any) => {
    console.log({ row });
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
            title="Inward"
            onClick={() => navigate("/inwards/new")}
            fullWidth={isMobile}
            prefixIcon={<AddIcon />}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <DataTable
            columns={columns}
            rows={users}
            pageSize={10}
            onRowClick={onRowClick}
            loading={loading}
          />
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default InwardPage;
