/* eslint-disable @typescript-eslint/no-explicit-any */
import DataTable from "@components/atoms/DataTable";
import { Grid, Paper } from "@mui/material";
import { getItems } from "@pages/StocksPages/helper";
import { showToast } from "@utils/index";
import { useEffect, useState } from "react";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "item",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "category",
    headerName: "Category",
    renderCell: (params: any) => params.row.category.name,
    flex: 1,
  },
  {
    field: "feature",
    headerName: "Feature",
    renderCell: (params: any) => params.row.feature.feature,
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
  },
];


const InventoryTable = () => {
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

  return (
    <Grid item xs={12}>
      <Paper elevation={1}>
        <DataTable
          columns={columns}
          rows={items}
          pageSize={10}
          loading={loading}
        />
      </Paper>
    </Grid>
  );
};

export default InventoryTable;
