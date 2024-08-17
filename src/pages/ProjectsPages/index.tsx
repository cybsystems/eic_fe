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
import { getProjects } from "./helper";

const columns= [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
  },
  
];


const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    (async () => {
      try {
        const projectsResponse = await getProjects();
        setProjects(projectsResponse.data);
      } catch (error:any) {
        showToast("error", error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onRowClick = (row: any) => {
    console.log({ row });
    navigate(`/projects/${row.id}`);
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
            title="Create Project"
            onClick={() => navigate("/projects/new")}
            fullWidth={isMobile}
            prefixIcon={<AddIcon />}
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={1}>
          <DataTable
            columns={columns}
            rows={projects}
            pageSize={10}
            onRowClick={onRowClick}
            loading={loading}
          />
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default ProjectsPage;
