/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "@components/atoms/Button";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Breadcrumbs from "@components/atoms/Breadcrumbs";
import PageGridContainer from "@components/atoms/PageGridContainer";
import { WithLoaderWrapper } from "@components/molecules/WithLoaderWrapper";
import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
} from "@mui/material";
import { showToast } from "@utils/index";
import { loadInitialData, saveItem } from "./helper";
import { itemValidationSchema } from "./schema";

const AddEditStockPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const edit = !!id;

  useEffect(() => {
    (async () => {
      try {
        const { features, categories } = await loadInitialData();
        setFeatures(features);
        setCategories(categories);
      } catch (error: any) {
        showToast("error", error?.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = async (values: any) => {
    try {
        await saveItem(values)
      showToast(
        "success",
        "Item Saved Sucessfully"
       );
      navigate("/stocks");
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || error?.message);
    }
  };
  // Formik setup
  const formik = useFormik({
    initialValues: {
      item: "",
      categoryId: "",
      featureId: "",
    },
    validationSchema: itemValidationSchema,
    onSubmit: onSubmit,
    enableReinitialize: true,
  });

  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Stocks", href: "/stocks" },
        ]}
        title={edit ? formik.values.item : "Create Item"}
      />
      <Grid item xs={12}>
        <Paper  sx={{ padding: 4 }}>
          <WithLoaderWrapper loading={loading}>
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                  error={
                    formik.touched.categoryId && Boolean(formik.errors.categoryId)
                  }
                  required
                >
                  <InputLabel required>Category</InputLabel>
                  <Select
                    name="categoryId"
                    value={formik.values.categoryId}
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
                  {formik.touched.categoryId && formik.errors.categoryId ? (
                    <div style={{ color: "red" }}>{formik.errors.categoryId}</div>
                  ) : null}
                </FormControl>
                

                <FormControl
                  fullWidth
                  sx={{ mb: 2 }}
                  error={
                    formik.touched.featureId && Boolean(formik.errors.featureId)
                  }
                  required
                >
                  <InputLabel required>Feature</InputLabel>
                  <Select
                    name="featureId"
                    value={formik.values.featureId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label="Feature"
                  >
                    {features.map(({ id,  feature:name }) => (
                      <MenuItem key={id} value={id}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.featureId && formik.errors.featureId ? (
                    <div style={{ color: "red" }}>{formik.errors.featureId}</div>
                  ) : null}
                </FormControl>
                


                <TextField
                  fullWidth
                  label="Name"
                  name="item"
                  value={formik.values.item}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.item && Boolean(formik.errors.item)}
                  helperText={formik.touched.item && formik.errors.item}
                  sx={{ mb: 2 }}
                  required
                />
                 
                <Stack direction="row-reverse" spacing={2}>
                  <Button
                    type="primary"
                    title={`Create`}
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
          </WithLoaderWrapper>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditStockPage;
