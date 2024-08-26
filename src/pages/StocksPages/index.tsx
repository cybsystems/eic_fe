/* eslint-disable @typescript-eslint/no-explicit-any */

import { useNavigate } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import {  Grid, Paper, Stack } from "@mui/material";

import Button from "@components/atoms/Button";
import DataTable from "@components/atoms/DataTable";
import PageGridContainer from "@components/atoms/PageGridContainer";
import useDeviceType from "@hooks/useMediaDevice";
import { showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { getItems } from "./helper";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "item",
    headerName: "Name",
  },
  {
    field: "category",
    headerName: "Category",
    renderCell: (params: any) => params.row.category.name,
  },
  {
    field: "feature",
    headerName: "Feature",
    renderCell: (params: any) => params.row.feature.feature,
  },
  // {
  //   field: "quantity",
  //   headerName: "Quantity",
  //   headerAlign: "center",
  //   renderCell: (params: any) => (
  //     <Box sx={{ textAlign: "center", width: "100%" }}>{params.value}</Box>
  //   ),
  // },
];

const StocksPages = () => {
  const navigate = useNavigate();
  const { isMobile } = useDeviceType();
  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const itemsResponse = await getItems();
        setItems(itemsResponse.data);
      } catch (error: any) {
        showToast("error", error?.message);
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
            title="Add Item"
            onClick={() => navigate("/stocks/new")}
            fullWidth={isMobile}
            prefixIcon={<AddIcon />}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <DataTable
            columns={columns}
            rows={items}
            pageSize={10}
            onRowClick={onRowClick}
            loading={loading}
          />
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default StocksPages;
