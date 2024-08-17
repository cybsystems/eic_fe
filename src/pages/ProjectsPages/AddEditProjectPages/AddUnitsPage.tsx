/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import { H5 } from "@components/atoms/Typographies";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { unitsSchema } from "@pages/LoginPage/schema";
import { formatError, showToast } from "@utils/index";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetails, saveUnitsToProject } from "./helper";

const AddUnitsPage = () => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectDetails(id);
        setProjectDetails(res.data);
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = async (values: any) => {
    if (id) {
      try {
        await saveUnitsToProject(values.units, id);
        showToast("success", "Units added successfully");
        navigate(`/projects/${id}/contractor`)
      } catch (error) {
        showToast("error", formatError(error));
      }
    }
  };
  // Formik setup with initial values and validation schema
  const initialValues = {
    units: projectDetails?.units?.length?  projectDetails?.units: [{ name: "" }],
  };

  if (loading) {
    return <PaperLoader />;
  }

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={unitsSchema}
            onSubmit={onSubmit}
          >
            {({
              values,
              handleChange,
              handleBlur,
              errors,
              touched,
              handleSubmit,
              isSubmitting,
            }) => (
              <Form>
                <Stack spacing={2}>
                  <H5>{projectDetails?.name}</H5>
                  <Divider />
                  <FieldArray
                    name="units"
                    render={(arrayHelpers) => (
                      <Stack spacing={2}>
                        {values.units.map((unit: any, index: number) => (
                          <Stack
                            key={index}
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <TextField
                              fullWidth
                              label={`Unit ${index + 1}`}
                              name={`units[${index}].name`}
                              value={unit.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.units &&
                                //@ts-ignore

                                touched.units[index] &&
                                //@ts-ignore
                                Boolean(errors.units?.[index]?.name)
                              }
                              helperText={
                                touched.units &&
                                //@ts-ignore

                                touched.units[index] &&
                                //@ts-ignore
                                errors.units?.[index]?.name
                              }
                            />
                            <IconButton
                              onClick={() => arrayHelpers.remove(index)}
                              disabled={values.units.length === 1}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Stack>
                        ))}
                        <Button
                          type="secondary"
                          prefixIcon={<AddIcon />}
                          onClick={() => arrayHelpers.push({ name: "" })}
                          title="Add Unit"
                        />
                      </Stack>
                    )}
                  />
                  <Divider />
                  <Stack direction="row-reverse" spacing={2}>
                    <Button
                      type="primary"
                      title="Next"
                      onClick={handleSubmit}
                      isLoading={isSubmitting}
                    />
                    <Button
                      type="secondary"
                      onClick={() => {}}
                      title="Cancel"
                    />
                  </Stack>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddUnitsPage;
