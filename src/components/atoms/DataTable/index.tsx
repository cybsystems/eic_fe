/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

interface DataTableProps {
  columns: Array<any>;
  rows: Array<any>;
  pageSize: number;
  onRowClick?: (row: any) => void;
  loading?:boolean
}

const DataTable = (props: DataTableProps) => {
  const { rows, columns, pageSize = 5, onRowClick,loading } = props;
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        loading={loading}
        onRowClick={onRowClick}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default DataTable;
