/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import Breadcrumbs from "@components/atoms/Breadcrumbs";
import PageGridContainer from "@components/atoms/PageGridContainer";
import {
  DISPATCHES_COLUMNS,
  getDispatchReports,
  getInwardReports,
  getStockReports,
  INWARD_COLUMNS,
  STOCKS_COULMNS,
} from "./helper";
import { formatError, showToast } from "@utils/index";
import DataTable from "@components/atoms/DataTable";

const reportTypes: any = {
  inward: {
    id: "inward",
    title: "Inward",
    controller: getInwardReports,
    cols: INWARD_COLUMNS,
  },
  dispatch: {
    id: "dispatch",
    title: "Dispatch",
    controller: getDispatchReports,

    cols: DISPATCHES_COLUMNS,
  },
  stock: {
    id: "stock",
    title: "Stock",
    controller: getStockReports,
    cols: STOCKS_COULMNS,
  },
};

const ReportsPage = () => {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [cols, setCols] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchReportData = async (reportType: string) => {
    try {
      const reportMap = reportTypes[reportType];
      if (reportMap.controller) {
        const reportData = await reportMap.controller();
        return reportData;
      }
      return [];
    } catch (error) {
      showToast("error", formatError(error));
      return [];
    } finally {
      setLoading(false);
    }
  };
  const handleChange = async (event: any) => {
    const reportType = event.target.value;
    const reportMap = reportTypes[reportType];
    setData([]);
    setCols(reportMap.cols);

    setLoading(true);
    setSelectedReportType(reportType);

    const reportData = await fetchReportData(reportType);
    setData(reportData.data);
  };

  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Reports", href: "/reports" },
        ]}
        title="Reports"
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="report-type-label">Report Type</InputLabel>
            <Select
              labelId="report-type-label"
              value={selectedReportType}
              onChange={handleChange}
              label="Report Type"
            >
              {Object.values(reportTypes).map((type: any) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        {selectedReportType && (
          <Stack marginTop={5}>
            <Paper>
              <DataTable loading={loading} columns={cols} rows={data} />
            </Paper>
          </Stack>
        )}
      </Grid>
    </PageGridContainer>
  );
};

export default ReportsPage;
