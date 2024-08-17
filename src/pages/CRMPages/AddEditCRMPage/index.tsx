/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@components/atoms/Button";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PageGridContainer from "@components/atoms/PageGridContainer";
import PaperLoader from "@components/atoms/PaperLoader";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { showToast } from "@utils/index";
import { initialDataForContractor, saveContractor } from "./helper";
import { contractorValidationSchema } from "./schema";

const AddEditCRMPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [contractor, setContractor] = useState<ContractorType | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const edit = !!id;

  useEffect(() => {
    (async () => {
      try {
        const { categories: categoriesData, contractor: contractorData } =
          await initialDataForContractor(id);
        setCategories(categoriesData);
        if (contractorData) {
          setContractor({
            ...contractorData,
            category: contractorData.categoryId,
          });
        }
      } catch (error: any) {
        showToast("error", error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = async (values: ContractorType) => {
    try {
      await saveContractor(values,id);
      showToast(
        "success",
        `Contractor ${edit ? "Updated" : "Created"} Successfully`
      );
      navigate("/crm");
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || error?.message);
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: contractor?.name || "",
      phoneNumber: contractor?.phoneNumber || "",
      email: contractor?.email || "",
      category: contractor?.category || "",
    },
    validationSchema: contractorValidationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  if (loading) {
    return (
      <PaperLoader/>
    );
  }
  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <FormControl
                fullWidth
                sx={{ mb: 2 }}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                required
              >
                <InputLabel required>Category</InputLabel>
                <Select
                  name="category"
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Category"
                >
                  {categories.map(({ id, name }) => (
                    <MenuItem key={id} value={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.category && formik.errors.category ? (
                  <div style={{ color: "red" }}>{formik.errors.category}</div>
                ) : null}
              </FormControl>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                sx={{ mb: 2 }}
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{ mb: 2 }}
                required
              />
              <Stack direction="row-reverse" spacing={2}>
                <Button
                  type="primary"
                  title={`${edit ? "Update" : "Create"} Contractor`}
                  onClick={formik.handleSubmit}
                  isLoading={formik.isSubmitting}
                />
                <Button
                  type="secondary"
                  onClick={() => navigate("/crm")}
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

export default AddEditCRMPage;
