/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import { H5 } from "@components/atoms/Typographies";
import { Divider, Grid, Paper, Stack, TextField, IconButton } from "@mui/material";
import { formatError, showToast } from "@utils/index";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formik, FieldArray, Form } from "formik";
import * as Yup from "yup";
import Button from "@components/atoms/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getProjectDetails } from "./helper";

const AddUnitsPage = () => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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

  // Formik setup with initial values and validation schema
  const initialValues = {
    units: [{ name: "" }],
  };

  const validationSchema = Yup.object({
    units: Yup.array().of(
      Yup.object({
        name: Yup.string().required("Unit name is required"),
      })
    ),
  });

  if (loading) {
    return <PaperLoader />;
  }

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              // Handle form submission logic here
              console.log(values);
              showToast("success", "Units added successfully");
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <Stack spacing={2}>
                  <H5>{projectDetails?.name}</H5>
                  <Divider />
                  <FieldArray
                    name="units"
                    render={(arrayHelpers) => (
                      <Stack spacing={2}>
                        {values.units.map((unit, index) => (
                          <Stack key={index} direction="row" spacing={2} alignItems="center">
                            <TextField
                              fullWidth
                              label={`Unit ${index + 1}`}
                              name={`units[${index}].name`}
                              value={unit.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.units &&
                                touched.units[index] &&
                                //@ts-ignore
                                Boolean(errors.units?.[index]?.name)
                              }
                              helperText={
                                touched.units &&
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
                    <Button type="primary" title="Next" onClick={() => {}}/>
                    <Button type="secondary" onClick={() => {}} title="Cancel" />
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
