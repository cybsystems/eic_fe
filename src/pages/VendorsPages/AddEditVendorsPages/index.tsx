/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import { Grid, Paper, Stack, TextField } from "@mui/material";
import { formatError, showToast } from "@utils/index";

import { validationSchema } from "./schema";
import Breadcrumbs from "@components/atoms/Breadcrumbs";
import { fetchVendorData, saveVendor } from "./helper";
import CenterLoader from "@components/atoms/CenterLoader";

const AddEditVendorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract ID from URL

  const [vendor, setVendor] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading
  const navigate = useNavigate();
  const editVendor = !!id;

  // Fetch initial data if editing a vendor
  useEffect(() => {
    (async () => {
      if (editVendor) {
        setLoading(true);
        const res = await fetchVendorData(id);
        setVendor(res.data);
        setLoading(false);
      }
    })();
  }, [id]);

  const onSubmit = async (values: any) => {
    try {
      if (editVendor) {
        await saveVendor(values, id);
        // Update vendor logic
      } else {
        await saveVendor(values);
        // Create vendor logic
      }
      showToast("success", "Vendor saved successfully");
      navigate("/vendors");
    } catch (error: any) {
      showToast("error", formatError(error));
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<any>({
    initialValues: {
      name: vendor?.name || "",
      phoneNo: vendor?.phoneNo || "",
      emailAddress: vendor?.emailAddress || "",
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Allows Formik to update initial values on permissions change
    onSubmit: onSubmit,
  });

  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Vendors", href: "/vendors" },
        ]}
        title={editVendor ? `Edit Vendor` : "Create Vendor"}
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          {loading ? (
            <CenterLoader />
          ) : (
            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  label="Name"
                  disabled={loading}
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(formik.touched.name && formik.errors.name)}
                  //@ts-ignore
                  helperText={formik.touched.name && formik.errors.name}
                  fullWidth
                  required
                />
                <TextField
                  label="Phone Number"
                  disabled={loading}
                  name="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.phoneNo && formik.errors.phoneNo
                  )}
                  //@ts-ignore

                  helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                  fullWidth
                  required
                />
                <TextField
                  label="Email Address"
                  disabled={loading}
                  name="emailAddress"
                  value={formik.values.emailAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={Boolean(
                    formik.touched.emailAddress && formik.errors.emailAddress
                  )}
                  //@ts-ignore

                  helperText={
                    formik.touched.emailAddress && formik.errors.emailAddress
                  }
                  fullWidth
                  required
                  autoComplete="off"
                />
                <Stack direction="row-reverse" spacing={2}>
                  <Button
                    type="primary"
                    title={`${editVendor ? "Update" : "Create"} Vendor`}
                    onClick={formik.handleSubmit}
                    isLoading={formik.isSubmitting}
                    disabled={loading}
                  />
                  <Button
                    type="secondary"
                    onClick={() => navigate("/vendors")}
                    title="Cancel"
                    disabled={formik.isSubmitting}
                  />
                </Stack>
              </Stack>
            </form>
          )}
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditVendorPage;
