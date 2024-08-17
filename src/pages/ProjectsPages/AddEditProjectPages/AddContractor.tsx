/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import { H5 } from "@components/atoms/Typographies";
import AddIcon from "@mui/icons-material/Add";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { getContractors } from "@pages/CRMPages/helper";
import { formatError, showToast } from "@utils/index";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectDetails, saveContractorsToProject } from "./helper";
import { projectContractorSchema } from "./schema";

const AddContractorPage = () => {
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await getProjectDetails(id);
        const contractorsResponse = await getContractors();
        setContractors(contractorsResponse.data);
        setProjectDetails({
          ...res.data,
          units: res.data.units.map((i: any) => ({
            name: i.name,
            contractorUnitId: i.id,
            contractorId: "",
          })),
        });
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
        await saveContractorsToProject(values.units, id);
        showToast("success", "Contractors added successfully");
        navigate("/projects");
      } catch (error) {
        showToast("error", formatError(error));
      }
    }
  };
  // Formik setup with initial values and validation schema
  const initialValues = {
    units: projectDetails?.units?.length
      ? projectDetails?.units
      : [{ name: "", contractorId: "" }],
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
            validationSchema={projectContractorSchema}
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
            }) => {
              return (
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
                                disabled={true}
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
                              <FormControl fullWidth>
                                <InputLabel id={`contractor-select-${index}`}>
                                  Contractor
                                </InputLabel>
                                <Select
                                  labelId={`contractor-select-${index}`}
                                  name={`units[${index}].contractorId`}
                                  value={unit.contractorId}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  error={
                                    touched.units &&
                                    //@ts-ignore
                                    touched.units[index] &&
                                    //@ts-ignore
                                    Boolean(errors.units?.[index]?.contractorId)
                                  }
                                >
                                  {contractors.map((contractor: any) => (
                                    <MenuItem
                                      key={contractor.id}
                                      value={contractor.id}
                                    >
                                      {contractor.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                             
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
              );
            }}
          </Formik>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddContractorPage;
