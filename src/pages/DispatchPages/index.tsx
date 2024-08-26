/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Breadcrumbs from "@components/atoms/Breadcrumbs";
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
import { formatError, showToast } from "@utils/index";
import { Field, FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { loadInitialData, submitDispatch } from "./helper";
import Button from "@components/atoms/Button";
import { getProjectAndContractorDetails } from "@pages/ProjectsPages/AddEditProjectPages/helper";

// Define validation schema using Yup
const validationSchema = Yup.object({
  projectId: Yup.number().required("Project is required"),
  contractorUnit: Yup.number().required("Unit is required"),
  items: Yup.array()
    .of(
      Yup.object({
        itemId: Yup.number().required("Item is required"),
        quantity: Yup.number()
          .required("Quantity is required")
          .positive("Quantity must be positive")
          .integer("Quantity must be an integer"),
      })
    )
    .min(1, "At least one item is required"),
});

const DispatchPages = () => {
  const [projects, setProjects] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unitsLoading, setUnitsLoading] = useState(false); // New state for contractor units loading
  const [contractorUnits, setContractorUnits] = useState([]);

  const fetchInitialData = async () => {
    try {
      const { projects: projectsData, items: itemsData } =
        await loadInitialData();
      setProjects(projectsData);
      setItems(itemsData);
    } catch (error) {
      showToast("error", formatError(error));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchInitialData();
  }, []);

  const onProjectSelect = async (e: any, formik: any) => {
    try {
      const projectId = e.target.value;
      formik.setFieldValue("projectId", projectId);
      setUnitsLoading(true); // Start loading for contractor units
      const projectDetailsResponse = await getProjectAndContractorDetails(
        projectId
      );
      setContractorUnits(projectDetailsResponse.data.contractorUnits);
    } catch (error) {
      showToast("error", formatError(error));
    } finally {
      setUnitsLoading(false);
    }
  };

  const onSubmit = async (values: any, formik: any) => {
    try {
      await submitDispatch(values);
      showToast("success", "Dispatched Sucessfully");
      formik.resetForm();
      await fetchInitialData();
  
    } catch (error) {
      showToast("error", formatError(error));
    }
  };

  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Dispatch", href: "/dispatch" },
        ]}
        title="Dispatch"
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <WithLoaderWrapper loading={loading}>
            <Formik
              initialValues={{
                projectId: "",
                contractorUnit: "",
                items: [{ itemId: "", quantity: "" }],
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik: any) => {
                const { values, errors, touched, handleSubmit,isSubmitting } = formik;
                return (
                  <Form>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="project-select-label">Project</InputLabel>
                      <Select
                        labelId="project-select-label"
                        id="project-select"
                        name="projectId"
                        label="Project"
                        fullWidth
                        value={values.projectId}
                        onChange={(e: any) => onProjectSelect(e, formik)}
                      >
                        {projects.map((project: any) => (
                          //@ts-ignore
                          <MenuItem key={project.id} value={project.id}>
                            {project.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.projectId && touched.projectId && (
                        <FormHelperText error>
                          {formik.errors.projectId.toString()}
                        </FormHelperText>
                      )}
                    </FormControl>

                    {values.projectId && (
                      <WithLoaderWrapper loading={unitsLoading}>
                        <Stack direction={"column"} marginTop={2}>
                          <FormControl fullWidth>
                            <InputLabel required id="contractor-units-label">
                              Contractor Unit
                            </InputLabel>
                            <Select
                              labelId="contractor-units-label"
                              id="contractor-units-select"
                              label="Contractor Unit"
                              {...formik.getFieldProps("contractorUnit")}
                            >
                              {contractorUnits.map((unit: any) => (
                                <MenuItem key={unit.id} value={unit.id}>
                                  {unit.Contractor.name} -{" "}
                                  {unit.ContractorUnit.name}
                                </MenuItem>
                              ))}
                            </Select>
                            {formik.touched.contractorUnit &&
                              formik.errors.contractorUnit && (
                                <FormHelperText error>
                                  {formik.errors.contractorUnit.toString()}
                                </FormHelperText>
                              )}
                          </FormControl>

                          <Stack marginTop={2}>
                            <FieldArray name="items">
                              {({ push, remove }) => (
                                <Stack>
                                  {values.items.map((item: any, index: any) => (
                                    <Grid
                                      container
                                      spacing={2}
                                      alignItems="center"
                                      key={index}
                                      sx={{ marginBottom: 2 }}
                                    >
                                      <Grid item xs={5}>
                                        <FormControl fullWidth margin="normal">
                                          <InputLabel
                                            id={`item-select-label-${index}`}
                                          >
                                            Item
                                          </InputLabel>
                                          <Field
                                            as={Select}
                                            labelId={`item-select-label-${index}`}
                                            id={`item-select-${index}`}
                                            name={`items.${index}.itemId`}
                                            label="Item"
                                          >
                                            {items.map((i: any) => (
                                              <MenuItem key={i.id} value={i.id}>
                                                {i.item}
                                              </MenuItem>
                                            ))}
                                          </Field>
                                          {
                                            //@ts-ignore
                                            errors.items?.[index]?.itemId &&
                                              touched.items?.[index]
                                                ?.itemId && (
                                                <FormHelperText error>
                                                  {errors.items?.[
                                                    index
                                                  ]?.itemId.toString()}
                                                </FormHelperText>
                                              )
                                          }
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={5}>
                                        <FormControl fullWidth margin="normal">
                                          <Field
                                            as={TextField}
                                            type="number"
                                            name={`items.${index}.quantity`}
                                            label="Quantity"
                                            variant="outlined"
                                          />
                                          {
                                            //@ts-ignore

                                            errors.items?.[index]?.quantity &&
                                              touched.items?.[index]
                                                ?.quantity && (
                                                //@ts-ignore

                                                <FormHelperText error>
                                                  {errors.items?.[
                                                    index
                                                  ]?.quantity.toString()}
                                                </FormHelperText>
                                              )
                                          }
                                        </FormControl>
                                      </Grid>
                                      <Grid item xs={2}>
                                        <Button
                                          type="secondary"
                                          onClick={() => remove(index)}
                                          title="Remove Item"
                                        />
                                      </Grid>
                                    </Grid>
                                  ))}
                                  <Stack direction="row-reverse">
                                    <Button
                                      title="Add Item"
                                      type="secondary"
                                      onClick={() =>
                                        push({ itemId: "", quantity: "" })
                                      }
                                    />
                                  </Stack>
                                </Stack>
                              )}
                            </FieldArray>
                          </Stack>
                        </Stack>
                      </WithLoaderWrapper>
                    )}
                    <Stack direction="row-reverse" marginTop={2}>
                     
                      <Button
                        type="primary"
                        onClick={handleSubmit}
                        title="Submit"
                        isLoading={isSubmitting}
                      />
                    </Stack>
                  </Form>
                );
              }}
            </Formik>
          </WithLoaderWrapper>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default DispatchPages;
