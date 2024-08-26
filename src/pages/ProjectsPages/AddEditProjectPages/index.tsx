/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/atoms/Button";
import { useFormik } from "formik";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PageGridContainer from "@components/atoms/PageGridContainer";
import { Grid, Paper, Stack, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { projectValidationSchema } from "./schema";
import { saveProject } from "./helper";
import { showToast } from "@utils/index";

const AddEditProjectPage = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    try {
      const res=await saveProject(values);
      showToast("success", "Project Created Sucessfully");
      navigate(`/projects/${res.data.id}/units`)
    } catch (error: any) {
      showToast("error", error?.message);
    }
  };
  // Set up formik
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: projectValidationSchema,
    onSubmit: onSubmit,
  });

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper  sx={{ padding: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                sx={{ mb: 2 }}
              />

              <Stack direction="row-reverse" spacing={2}>
                <Button
                  type="primary"
                  title="Create Project"
                  onClick={formik.handleSubmit}
                  isLoading={formik.isSubmitting}
                />

                <Button
                  type="secondary"
                  onClick={() => navigate("/projects")}
                  title="Cancel"
                />
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditProjectPage;
