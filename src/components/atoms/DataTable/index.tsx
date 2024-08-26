/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@mui/material";
import { DataGrid, GridRowParams } from "@mui/x-data-grid";
import React from "react";

interface DataTableProps {
  columns: any[];
  rows: any[]; // Ideally, define a specific type for your rows instead of using `any`.
  pageSize?: number;
  onRowClick?: (row: GridRowParams) => void;
  loading?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  rows,
  columns,
  pageSize = 5,
  onRowClick,
  loading = false,
}) => {
  // Number of rows to display in the skeleton

  return (
    <Box sx={{ width: "100%", height: 500 }}>
      <DataGrid
        loading={loading}
        rows={rows}
        columns={columns}
        onRowClick={onRowClick}
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
        slotProps={{
          loadingOverlay: {
            variant: "linear-progress",
            noRowsVariant: "skeleton",
          },
        }}
        
      />
    </Box>
  );
};

export default DataTable;
