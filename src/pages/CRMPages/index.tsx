/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Grid, Paper, Stack } from "@mui/material";

import Button from "@components/atoms/Button";
import DataTable from "@components/atoms/DataTable";
import PageGridContainer from "@components/atoms/PageGridContainer";
import useDeviceType from "@hooks/useMediaDevice";
import { showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { getContractors } from "./helper";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
  },
  {
    field: "email",
    headerName: "Email",
  },
  {
    field: "phoneNumber",
    headerName: "Phone Number",
  },
];


const CRMPage = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [contractors, setContractors] = useState<Array<ContractorType>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const contractorsResponse = await getContractors();
        setContractors(contractorsResponse.data);
      } catch (error: any) {
        showToast("error", error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRowClick = (row: any) => {
    console.log({ row });
    navigate(`/crm/${row.id}`);
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
            title="Create Contractor"
            onClick={() => navigate("/crm/new")}
            fullWidth={isMobile}
            prefixIcon={<AddIcon />}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <DataTable
            columns={columns}
            rows={contractors}
            pageSize={10}
            onRowClick={onRowClick}
            loading={loading}
          />
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default CRMPage;
