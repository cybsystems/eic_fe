/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";
import { Box } from "@mui/material";
import { formatDate } from "@utils/index";

export const DISPATCHES_COLUMNS = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "itemName",
    headerName: "Item",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
  },
  {
    field: "projectName",
    headerName: "Project",
    flex: 1,
  },
  {
    field: "unitName",
    headerName: "Unit",

    flex: 1,
  },
  {
    field: "contractorName",
    headerName: "Contractor",

    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Date",
    renderCell: (params: any) => <Box>{formatDate(params.value)}</Box>,
    flex: 1,
  },
];

export const STOCKS_COULMNS = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    align: "center",
  },
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
    renderCell: (params: any) => <Box>{params.value}</Box>,
    flex: 1,
  },
  {
    field: "createdAt",
    headerName: "Date",
    renderCell: (params: any) => <Box>{formatDate(params.value)}</Box>,
    flex: 1,
  },
];
export const INWARD_COLUMNS = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
  },
  {
    field: "itemName",
    headerName: "Item",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 1,
  },
  {
    field: "warehouseName",
    headerName: "Warehouse",
    flex: 1,
    renderCell: (params: any) => <Box>{params.value || "-"}</Box>,
  },
  {
    field: "contractorName",
    headerName: "Contractor",
    renderCell: (params: any) => <Box>{params.value || "-"}</Box>,
    flex: 1,
  },
  {
    field: "vendorName",
    headerName: "Vendor",

    flex: 1,
    renderCell: (params: any) => <Box>{params.value || "-"}</Box>,
  },
  {
    field: "createdAt",
    headerName: "Date",
    renderCell: (params: any) => <Box>{formatDate(params.value)}</Box>,
    flex: 1,
  },
];

export const getInwardReports = async () => {
  const res = await apiInstance.get("reports/inward");
  return res;
};

export const getStockReports = async () => {
  const res = await apiInstance.get("reports/stock");
  return res;
};

export const getDispatchReports = async () => {
  const res = await apiInstance.get("reports/dispatch");
  return res;
};
