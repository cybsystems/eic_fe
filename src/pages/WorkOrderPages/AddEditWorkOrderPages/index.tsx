/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumbs from "@components/atoms/Breadcrumbs";
import Button from "@components/atoms/Button";
import DatePicker from "@components/atoms/DatePicker";
import PageGridContainer from "@components/atoms/PageGridContainer";
import { WithLoaderWrapper } from "@components/molecules/WithLoaderWrapper";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { getProjectAndContractorDetails } from "@pages/ProjectsPages/AddEditProjectPages/helper";
import { getProjects } from "@pages/ProjectsPages/helper";
import { getUsers } from "@pages/UsersPage/helper";
import { formatError, showToast } from "@utils/index";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveWorkOrder } from "./helper";
import ProjectSection from "./ProjectSection";
import { workOrderSchema } from "./schema";

const AddEditWorkOrderPage = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [contractorUnits, setContractorUnits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [unitsLoading, setUnitsLoading] = useState(false); // New state for contractor units loading
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const projectResponse = await getProjects();
        const usersResponse = await getUsers();
        setUsers(usersResponse.data);
        setProjects(projectResponse.data);
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const onSubmit = async (values: any) => {
    try {
      await saveWorkOrder(values);
      showToast("success", "Work order created sucessfully");
      navigate("/work-orders");
    } catch (error) {
      showToast("error", formatError(error));
    }
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      projectId: "",
      contractorUnit: "",
      authorizedBy: "",
      orderStartDate: undefined,
      expectedStartDate: undefined,
      expectedEndDate: undefined,
      description: "",
    },
    validationSchema: workOrderSchema,
    onSubmit: onSubmit,
  });

  const onProjectSelect = async (e: any) => {
    try {
      const projectId = e.target.value;
      formik.setFieldValue("projectId", projectId);
      setUnitsLoading(true); // Start loading for contractor units
      const projectDetailsResponse = await getProjectAndContractorDetails(
        projectId
      );
      setSelectedProject(projectDetailsResponse.data.projectDetails);
      setContractorUnits(projectDetailsResponse.data.contractorUnits);
      formik.setFieldValue(
        "contractorUnits",
        projectDetailsResponse.data.contractorUnits.map((unit: any) => unit.id)
      );
    } catch (error) {
      showToast("error", formatError(error));
    } finally {
      setUnitsLoading(false); // Stop loading once data is fetched
    }
  };

  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Work Orders", href: "/work-orders" },
        ]}
        title="Create Work Order"
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <WithLoaderWrapper loading={loading}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <FormControl fullWidth>
                  <TextField
                    label="Title"
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    {...formik.getFieldProps("title")}
                    error={Boolean(formik.errors.title && formik.touched.title)}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </FormControl>
                <FormControl fullWidth style={{ marginTop: 0 }}>
                  <TextField
                    label="Description"
                    variant="outlined"
                    required
                    margin="normal"
                    fullWidth
                    multiline
                    rows={4}
                    {...formik.getFieldProps("description")}
                    error={Boolean(
                      formik.errors.description && formik.touched.description
                    )}
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel id="authorizedBy-select-label" required>
                    Authorized By
                  </InputLabel>
                  <Select
                    labelId="authorizedBy-select-label"
                    id="authorizedBy-select"
                    label="Authorized By"
                    {...formik.getFieldProps("authorizedBy")}
                    value={formik.values.authorizedBy}
                    error={Boolean(
                      formik.errors.authorizedBy && formik.touched.authorizedBy
                    )}
                  >
                    {users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.authorizedBy &&
                    formik.errors.authorizedBy && (
                      <FormHelperText error>
                        {formik.errors.authorizedBy}
                      </FormHelperText>
                    )}
                </FormControl>
                <DatePicker
                  label="Order Start Date *"
                  value={formik.values.orderStartDate}
                  onChange={(value) =>
                    formik.setFieldValue("orderStartDate", value)
                  }
                  error={
                    formik.touched.orderStartDate &&
                    formik.errors.orderStartDate
                  }
                />

                <DatePicker
                  label="Expected Start Date *"
                  value={formik.values.expectedStartDate}
                  onChange={(value) =>
                    formik.setFieldValue("expectedStartDate", value)
                  }
                  error={
                    formik.touched.expectedStartDate &&
                    formik.errors.expectedStartDate
                  }
                />

                <DatePicker
                  label="Expected End Date *"
                  value={formik.values.expectedEndDate}
                  onChange={(value) =>
                    formik.setFieldValue("expectedEndDate", value)
                  }
                  error={
                    formik.touched.expectedEndDate &&
                    formik.errors.expectedEndDate
                  }
                />
                <FormControl fullWidth>
                  <InputLabel id="project-select-label" required>
                    Project
                  </InputLabel>
                  <Select
                    labelId="project-select-label"
                    id="project-select"
                    label="Project"
                    {...formik.getFieldProps("projectId")}
                    onChange={onProjectSelect}
                    value={formik.values.projectId}
                    error={Boolean(
                      formik.errors.projectId && formik.touched.projectId
                    )}
                  >
                    {projects.map((project) => (
                      <MenuItem key={project.id} value={project.id}>
                        {project.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.projectId && formik.errors.projectId && (
                    <FormHelperText error>
                      {formik.errors.projectId}
                    </FormHelperText>
                  )}
                </FormControl>

                <ProjectSection
                  formik={formik}
                  selectedProject={selectedProject}
                  unitsLoading={unitsLoading}
                  contractorUnits={contractorUnits}
                />

                <Stack direction="row-reverse" spacing={2}>
                  <Button
                    type="primary"
                    title="Create Workorder"
                    onClick={formik.handleSubmit}
                    isLoading={formik.isSubmitting}
                  />
                  <Button
                    type="secondary"
                    onClick={() => navigate("/work-orders")}
                    title="Cancel"
                  />
                </Stack>
              </Stack>
            </form>
          </WithLoaderWrapper>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditWorkOrderPage;
